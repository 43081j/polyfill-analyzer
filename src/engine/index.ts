import fs from 'node:fs';
import path from 'node:path';
import { parse, Lang } from '@ast-grep/napi';
import YAML from 'yaml';
import { loadCatalog, RuleEntry, registerCacheClearCallback } from '../catalog/index.js';
export type { RuleEntry } from '../catalog/index.js';
export * from './inference.js';
export * from './website-scanner.js';

export const ruleQueryCache = new Map<string, any>();

export function clearRuleCache(): void {
  ruleQueryCache.clear();
}

registerCacheClearCallback(() => {
  clearRuleCache();
});

export function parseYamlRule(content: string): { rule: any } {
  const doc = YAML.parse(content);
  if (!doc) {
    throw new Error('Invalid YAML syntax or empty pattern list in rule definition');
  }
  const rule = doc.rule !== undefined ? doc.rule : doc;
  return { rule };
}

import { SourceMapConsumer, OneToOneMapping } from './sourcemap.js';
export { SourceMapConsumer } from './sourcemap.js';
export type { OneToOneMapping, SourceLocationMapping } from './sourcemap.js';

export interface RuleEntryWithMapping extends RuleEntry {
  mapping?: OneToOneMapping;
}

const FEATURE_CALL_PATTERNS: Record<string, { method?: string; syntaxRegex?: RegExp }> = {
  'array-at': { method: 'at', syntaxRegex: /\.at\s*\(/ },
  'array-includes': { method: 'includes', syntaxRegex: /\.includes\s*\(/ },
  'array-filter': { method: 'filter', syntaxRegex: /\.filter\s*\(/ },
  'array-find-last': { method: 'findLast', syntaxRegex: /\.findLast\s*\(/ },
  'array-flat': { method: 'flat', syntaxRegex: /\.flat(?:Map)?\s*\(/ },
  'object-has-own': { method: 'hasOwn', syntaxRegex: /Object\.hasOwn\s*\(/ },
  'object-assign': { method: 'assign', syntaxRegex: /Object\.assign\s*\(/ },
  'object-entries': { method: 'entries', syntaxRegex: /Object\.entries\s*\(/ },
  'object-values': { method: 'values', syntaxRegex: /Object\.values\s*\(/ },
  'object-from-entries': { method: 'fromEntries', syntaxRegex: /Object\.fromEntries\s*\(/ },
  'promise-all-settled': { method: 'allSettled', syntaxRegex: /Promise\.allSettled\s*\(/ },
  'promise-any': { method: 'any', syntaxRegex: /Promise\.any\s*\(/ },
  'string-replace-all': { method: 'replaceAll', syntaxRegex: /\.replaceAll\s*\(/ },
  'class-fields': { syntaxRegex: /#\w+|^\s*(?:static\s+)?\w+\s*=\s*[^;]+;/ },
  'async-iteration': { syntaxRegex: /for\s+await\s*\(|async\s+function/ },
  'async-generator': { syntaxRegex: /async\s*\*\s*\w+|async\s+function\s*\*/ },
  'nullish-coalescing': { syntaxRegex: /\?\?/ },
  'optional-chaining': { syntaxRegex: /\?\./ },
};

function buildOneToOneMapping(
  entry: RuleEntry,
  matchNode: any,
  rootNode: any,
  sm: SourceMapConsumer | null
): OneToOneMapping {
  const range = matchNode.range();
  const minLine = range.start.line + 1;
  const minCol = range.start.column + 1;
  const byteOffset = range.start.index;
  const rawSnippet = matchNode.text().replace(/\s+/g, ' ').trim();
  const snippet = rawSnippet.length > 140 ? rawSnippet.slice(0, 137) + '...' : rawSnippet;

  let implOrigin: string | undefined = undefined;
  if (sm) {
    const pos = sm.originalPositionFor(range.start.line, range.start.column);
    if (pos) {
      implOrigin = `${pos.sourceFile}:${pos.originalLine}:${pos.originalColumn}`;
    }
  }

  const precedingSource: OneToOneMapping['precedingSource'] = [];
  const seenSourceLines = new Set<string>();

  if (sm) {
    const featureHint = FEATURE_CALL_PATTERNS[entry.id];

    // 1. If the matched AST node is a mangled helper function (e.g. function r(e,t){...} or var r = function...),
    // find where that mangled helper identifier is called in the bundle and map those call sites back to user source!
    let helperFnName: string | undefined = undefined;
    const fnMatch = rawSnippet.match(/^function\s+([A-Za-z0-9_$]+)\s*\(/) ||
                    rawSnippet.match(/^(?:var|let|const)\s+([A-Za-z0-9_$]+)\s*=\s*function/);
    if (fnMatch && fnMatch[1]) {
      helperFnName = fnMatch[1];
    }

    if (helperFnName) {
      const callSites = rootNode.findAll({
        rule: {
          pattern: `${helperFnName}($$$)`,
        },
      });
      for (const callNode of callSites) {
        const cRange = callNode.range();
        const orig = sm.originalPositionFor(cRange.start.line, cRange.start.column);
        if (orig && !orig.sourceFile.includes('node_modules') && orig.sourceLineSnippet) {
          const key = `${orig.sourceFile}:${orig.originalLine}`;
          if (!seenSourceLines.has(key)) {
            seenSourceLines.add(key);
            precedingSource.push({
              sourceFile: orig.sourceFile,
              line: orig.originalLine,
              column: orig.originalColumn,
              sourceSnippet: orig.sourceLineSnippet,
              minifiedUsageSnippet: callNode.text().replace(/\s+/g, ' ').slice(0, 100),
              minifiedUsageLocation: { line: cRange.start.line + 1, column: cRange.start.column + 1 },
            });
          }
        }
      }
    }

    // 2. If it's a built-in method (e.g. .at(), .includes(), Object.hasOwn()), find method call sites in bundle
    // that map to user source code in the sourcemap
    if (featureHint?.method) {
      const methodCalls = rootNode.findAll({
        rule: {
          pattern: `$RECEIVER.${featureHint.method}($$$)`,
        },
      });
      for (const callNode of methodCalls) {
        const cRange = callNode.range();
        const orig = sm.originalPositionFor(cRange.start.line, cRange.start.column);
        if (orig && !orig.sourceFile.includes('node_modules') && orig.sourceLineSnippet) {
          const key = `${orig.sourceFile}:${orig.originalLine}`;
          if (!seenSourceLines.has(key)) {
            seenSourceLines.add(key);
            precedingSource.push({
              sourceFile: orig.sourceFile,
              line: orig.originalLine,
              column: orig.originalColumn,
              sourceSnippet: orig.sourceLineSnippet,
              minifiedUsageSnippet: callNode.text().replace(/\s+/g, ' ').slice(0, 100),
              minifiedUsageLocation: { line: cRange.start.line + 1, column: cRange.start.column + 1 },
            });
          }
        }
      }
    }

    // 3. Scan user source segments in sourcemap for syntax matches (e.g. #privateField, .at(, Object.hasOwn)
    if (precedingSource.length === 0 && featureHint?.syntaxRegex) {
      const userSegments = sm.getUserSourceSegments();
      for (const seg of userSegments) {
        if (featureHint.syntaxRegex.test(seg.sourceLineSnippet)) {
          const key = `${seg.sourceFile}:${seg.originalLine}`;
          if (!seenSourceLines.has(key)) {
            seenSourceLines.add(key);
            precedingSource.push({
              sourceFile: seg.sourceFile,
              line: seg.originalLine,
              column: seg.originalColumn,
              sourceSnippet: seg.sourceLineSnippet,
              minifiedUsageLocation: { line: seg.genLine0 + 1, column: seg.genCol0 + 1 },
            });
          }
        }
      }
    }
  }

  return {
    featureId: entry.id,
    featureName: entry.name,
    minifiedPolyfill: {
      line: minLine,
      column: minCol,
      byteOffset,
      snippet,
      implementationOrigin: implOrigin,
    },
    precedingSource,
  };
}

export function scan(code: string, catalogPath?: string, sm?: SourceMapConsumer | null): RuleEntryWithMapping[] {
  const catalog = loadCatalog(catalogPath);
  if (!catalog.rules || catalog.rules.length === 0) {
    console.warn('Warning: Catalog contains 0 rules or is empty.');
  }
  const root = parse(Lang.JavaScript, code).root();
  const detected: RuleEntryWithMapping[] = [];

  for (const entry of catalog.rules) {
    try {
      let query = ruleQueryCache.get(entry.astGrepRulePath);
      if (!query) {
        const rulePath = path.resolve(process.cwd(), entry.astGrepRulePath);
        if (!fs.existsSync(rulePath)) {
          continue;
        }
        const yamlContent = fs.readFileSync(rulePath, 'utf8');
        query = parseYamlRule(yamlContent);
        ruleQueryCache.set(entry.astGrepRulePath, query);
      }
      const matches = root.findAll(query);
      if (matches && matches.length > 0) {
        const mapping = buildOneToOneMapping(entry, matches[0], root, sm || null);
        detected.push({
          ...entry,
          mapping,
        });
      }
    } catch (err) {
      // Ignore invalid rules during scanning unless debugging
    }
  }
  return detected;
}

export function scanFile(filePath: string, catalogPath?: string): RuleEntryWithMapping[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    throw new Error(`Expected file path, found directory: ${filePath}`);
  }
  const code = fs.readFileSync(filePath, 'utf8');

  // Check for JavaScript syntax errors
  const root = parse(Lang.JavaScript, code).root();
  const errorNodes = root.findAll({ rule: { kind: 'ERROR' } });
  const realErrors = errorNodes.filter(node => {
    let curr: any = node;
    while (curr) {
      const kind = curr.kind();
      if (kind === 'template_string' || kind === 'tagged_template_string' || kind === 'template_substitution') {
        return false;
      }
      curr = curr.parent();
    }
    return true;
  });
  if (realErrors.length > 0) {
    throw new Error('Syntax error parsing JavaScript code');
  }

  // Check for local unresolvable imports, ignoring commented-out imports
  const importNodes = root.findAll({
    rule: {
      any: [
        { kind: 'import_statement' },
        { kind: 'call_expression' }
      ]
    }
  });
  const importRegex = /(?:from|import|require)\s*\(?\s*["'](\.[^"']+)["']/g;
  const extensions = ['', '.js', '.ts', '.mjs', '.cjs', '.jsx', '.tsx', '/index.js', '/index.ts'];

  for (const node of importNodes) {
    const text = node.text();
    let match;
    importRegex.lastIndex = 0;
    while ((match = importRegex.exec(text)) !== null) {
      const relPath = match[1];
      const baseResolved = path.resolve(path.dirname(filePath), relPath);
      let found = false;
      for (const ext of extensions) {
        if (fs.existsSync(baseResolved + ext)) {
          found = true;
          break;
        }
      }
      if (!found) {
        console.warn(`Cannot find module or unresolvable import path: ${relPath}`);
      }
    }
  }

  const sm = SourceMapConsumer.fromBundleFile(filePath);
  return scan(code, catalogPath, sm);
}
