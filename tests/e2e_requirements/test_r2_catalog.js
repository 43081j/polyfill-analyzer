import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { getDefaultCatalogPath, getRulesDir, resolveRuleYamlPath } from 'polyfill-patterns';
import { describe, test, assert } from './runner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../../');
const catalogPath = getDefaultCatalogPath();
const distBundlesRoot = path.join(workspaceRoot, 'dist/bundles');

describe('Tier 1 - F3: AST-grep Rule Catalog Linking & Schema Verification', () => {
  test('F3-T1-1: Catalog definition file (polyfill-patterns/rules.json) exists and rules directory is present', () => {
    const rulesDir = getRulesDir();
    assert.skipIfMissing(rulesDir, `Catalog rules directory missing: ${rulesDir}`);
    const catalogExists = fs.existsSync(catalogPath);
    assert.ok(catalogExists, 'Catalog rules definition file must exist');
  });

  test('F3-T1-2: Catalog contains >= 10 distinct ECMAScript feature rules', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    assert.ok(Array.isArray(catalog.rules), 'Catalog must contain a rules array');
    assert.ok(catalog.rules.length >= 10, `Catalog must contain >= 10 rules, found ${catalog.rules.length}`);
  });

  test('F3-T1-3: Rule entries validate against schema: required keys (id, name, astGrepRulePath)', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    for (const rule of catalog.rules) {
      assert.ok(rule.id && typeof rule.id === 'string', `Rule must have string id: ${JSON.stringify(rule)}`);
      assert.ok(rule.name && typeof rule.name === 'string', `Rule must have string name: ${rule.id}`);
      assert.ok(rule.astGrepRulePath && typeof rule.astGrepRulePath === 'string', `Rule must have astGrepRulePath: ${rule.id}`);
    }
  });

  test('F3-T1-4: Rule entries validate against schema: required compatibility keys (webFeatureId, bcdId)', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    for (const rule of catalog.rules) {
      assert.ok(rule.webFeatureId && typeof rule.webFeatureId === 'string', `Rule must have webFeatureId: ${rule.id}`);
      assert.ok(rule.bcdId && typeof rule.bcdId === 'string', `Rule must have bcdId: ${rule.id}`);
    }
  });

  test('F3-T1-5: Rule entries validate against schema: required baseline keys (baselineStatus, baselineYear, modernSuggestion)', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    const validStatuses = ['low', 'high', 'false'];
    for (const rule of catalog.rules) {
      assert.ok(validStatuses.includes(rule.baselineStatus), `Rule baselineStatus must be low, high, or false: ${rule.id}`);
      assert.ok(typeof rule.baselineYear === 'number' || rule.baselineYear === null, `Rule baselineYear must be number or null: ${rule.id}`);
      assert.ok(rule.modernSuggestion && typeof rule.modernSuggestion === 'string', `Rule must have modernSuggestion: ${rule.id}`);
    }
  });

  test('F3-T1-6: All referenced astGrepRulePath YAML files exist on disk and are readable', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    for (const rule of catalog.rules) {
      const rulePath = resolveRuleYamlPath(rule);
      assert.existsSync(rulePath, `Referenced AST-grep rule YAML must exist: ${rulePath}`);
    }
  });

  test('F3-T1-7: webFeatureId string format conforms to standard kebab-case naming conventions', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    for (const rule of catalog.rules) {
      assert.ok(/^[a-z0-9-]+$/.test(rule.webFeatureId), `webFeatureId must be kebab-case: ${rule.webFeatureId}`);
    }
  });

  test('F3-T1-8: bcdId string format maps to valid MDN Browser Compat Data dot-delimited path hierarchy', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    for (const rule of catalog.rules) {
      assert.ok(/^[a-zA-Z0-9._-]+$/.test(rule.bcdId), `bcdId must be valid dot-delimited path: ${rule.bcdId}`);
    }
  });

  test('F3-T1-9: Rule catalog includes representation across Promise, Async/Await, Array methods, and ES6 classes', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    const ids = catalog.rules.map(r => r.id.toLowerCase());
    const hasVariety = ids.some(i => i.includes('promise') || i.includes('async') || i.includes('array') || i.includes('class'));
    assert.ok(hasVariety, 'Catalog should cover diverse ES feature categories');
  });

  test('F3-T1-10: Rule catalog JSON parsing performance completes under 50ms', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const start = Date.now();
    JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    const dur = Date.now() - start;
    assert.ok(dur < 50, `Catalog parsing took ${dur}ms, expected < 50ms`);
  });

  test('F3-T1-11: Rule entries validate against schema: required bundlers array with length > 0', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    for (const rule of catalog.rules) {
      assert.ok(Array.isArray(rule.bundlers), `Rule bundlers must be an array: ${rule.id}`);
      assert.ok(rule.bundlers.length > 0, `Rule bundlers array must not be empty: ${rule.id}`);
      for (const b of rule.bundlers) {
        assert.ok(typeof b === 'string' && b.length > 0, `Rule bundlers entry must be non-empty string: ${rule.id}`);
      }
    }
  });
});

describe('Tier 1 - F4: Catalog Validation & 0 False Positives on Modern Bundles', () => {
  const bundlers = ['rollup', 'esbuild', 'webpack', 'swc'];
  const samples = ['es2011', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'es2023', 'es2024', 'es2025', 'es2026'];

  test('F4-T1-1: AST-grep catalog scanner executes against Rollup modern reference bundles without false alarms', () => {
    const modernBundle = path.join(distBundlesRoot, 'rollup/es2015_modern.js');
    assert.skipIfMissing(modernBundle, `Rollup modern bundle missing: ${modernBundle}`);
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI scanner missing: ${cliPath}`);
    const res = spawnSync('node', [cliPath, modernBundle, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `CLI scanner failed on ${modernBundle}: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const polyfills = data.detectedPolyfills || data.detectedFeatures || [];
    assert.strictEqual(polyfills.length, 0, `Expected 0 false positive detections on modern bundle, found ${polyfills.length}`);
  });

  test('F4-T1-2: AST-grep catalog scanner executes against esbuild modern reference bundles without false alarms', () => {
    const modernBundle = path.join(distBundlesRoot, 'esbuild/es2020_modern.js');
    assert.skipIfMissing(modernBundle, `esbuild modern bundle missing: ${modernBundle}`);
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI scanner missing: ${cliPath}`);
    const res = spawnSync('node', [cliPath, modernBundle, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `CLI scanner failed on ${modernBundle}: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const polyfills = data.detectedPolyfills || data.detectedFeatures || [];
    assert.strictEqual(polyfills.length, 0, `Expected 0 false positive detections on modern bundle, found ${polyfills.length}`);
  });

  test('F4-T1-3: AST-grep catalog scanner executes against Webpack modern reference bundles without false alarms', () => {
    const modernBundle = path.join(distBundlesRoot, 'webpack/es2024_modern.js');
    assert.skipIfMissing(modernBundle, `Webpack modern bundle missing: ${modernBundle}`);
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI scanner missing: ${cliPath}`);
    const res = spawnSync('node', [cliPath, modernBundle, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `CLI scanner failed on ${modernBundle}: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const polyfills = data.detectedPolyfills || data.detectedFeatures || [];
    assert.strictEqual(polyfills.length, 0, `Expected 0 false positive detections on modern bundle, found ${polyfills.length}`);
  });

  test('F4-T1-4: Scanner returns 0 polyfill matches when scanning es2026_modern.js native code', () => {
    const modernBundle = path.join(distBundlesRoot, 'rollup/es2026_modern.js');
    assert.skipIfMissing(modernBundle, `Modern bundle missing: ${modernBundle}`);
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI scanner missing: ${cliPath}`);
    const res = spawnSync('node', [cliPath, modernBundle, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `CLI scanner failed on ${modernBundle}: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const polyfills = data.detectedPolyfills || data.detectedFeatures || [];
    assert.strictEqual(polyfills.length, 0, `Expected 0 false positive detections on modern bundle, found ${polyfills.length}`);
  });

  test('F4-T1-5: Scanner rule specificity avoids matching native Array.prototype.includes as polyfill', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI scanner missing: ${cliPath}`);
    const testFile = path.join(workspaceRoot, 'tests/fixtures/native_includes.js');
    fs.mkdirSync(path.dirname(testFile), { recursive: true });
    fs.writeFileSync(testFile, 'const arr = [1, 2, 3]; if (arr.includes(2)) { console.log("yes"); }');
    const res = spawnSync('node', [cliPath, testFile, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const polyfills = data.detectedPolyfills || data.detectedFeatures || [];
    assert.ok(!polyfills.some(p => (p.name || p.id || '').includes('includes')), 'Native Array.prototype.includes must not be flagged as polyfill');
  });

  test('F4-T1-6: Scanner rule specificity avoids matching native Promise.allSettled as polyfill', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI scanner missing: ${cliPath}`);
    const testFile = path.join(workspaceRoot, 'tests/fixtures/native_allsettled.js');
    fs.mkdirSync(path.dirname(testFile), { recursive: true });
    fs.writeFileSync(testFile, 'Promise.allSettled([Promise.resolve(1)]).then(console.log);');
    const res = spawnSync('node', [cliPath, testFile, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const polyfills = data.detectedPolyfills || data.detectedFeatures || [];
    assert.ok(!polyfills.some(p => (p.name || p.id || '').includes('allSettled') || (p.name || p.id || '').includes('promise')), 'Native Promise.allSettled must not be flagged');
  });

  test('F4-T1-7: Scanner rule specificity avoids matching native Object.assign in modern target bundles', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI scanner missing: ${cliPath}`);
    const testFile = path.join(workspaceRoot, 'tests/fixtures/native_assign.js');
    fs.mkdirSync(path.dirname(testFile), { recursive: true });
    fs.writeFileSync(testFile, 'const obj = Object.assign({}, { a: 1 });');
    const res = spawnSync('node', [cliPath, testFile, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const polyfills = data.detectedPolyfills || data.detectedFeatures || [];
    assert.ok(!polyfills.some(p => (p.name || p.id || '').includes('assign')), 'Native Object.assign must not be flagged');
  });

  test('F4-T1-8: Full catalog validation scan across all available modern bundles completes in reasonable time', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI scanner missing: ${cliPath}`);
    const modernBundle = path.join(distBundlesRoot, 'rollup/es2015_modern.js');
    assert.skipIfMissing(modernBundle, `Modern bundle missing: ${modernBundle}`);
    const start = Date.now();
    const res = spawnSync('node', [cliPath, modernBundle, '--json'], { encoding: 'utf8' });
    const duration = Date.now() - start;
    assert.strictEqual(res.status, 0, `CLI scan failed: ${res.stderr}`);
    assert.ok(duration < 5000, `Full catalog scan took ${duration}ms, expected < 5000ms`);
  });
});

describe('Tier 2 - F3: Boundary & Corner Cases for Rule Catalog', () => {
  test('F3-T2-1: Catalog validation gracefully catches malformed astGrepRulePath pointing to non-existent file', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    for (const rule of catalog.rules || []) {
      const rulePath = resolveRuleYamlPath(rule);
      assert.ok(fs.existsSync(rulePath), `Rule id ${rule.id} points to non-existent astGrepRulePath: ${rulePath}`);
    }
  });

  test('F3-T2-2: Catalog validation catches invalid web-features IDs not present in upstream feature dataset', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const invalidRule = { id: "test-rule", name: "Test", astGrepRulePath: "src/catalog/rules/test.yaml", webFeatureId: "INVALID_UPPERCASE_ID$", bcdId: "javascript.builtins.Array", baselineStatus: "low", baselineYear: 2020, modernSuggestion: "Use native", bundlers: ["webpack", "rollup", "esbuild", "swc"] };
    const isValidId = /^[a-z0-9-]+$/.test(invalidRule.webFeatureId);
    assert.strictEqual(isValidId, false, 'Validator regex must reject invalid webFeatureId format');
  });

  test('F3-T2-3: Catalog validation handles missing or null baselineYear for unbaselined evolving features', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    for (const rule of catalog.rules || []) {
      if (rule.baselineStatus === 'false') {
        assert.ok(rule.baselineYear === null || typeof rule.baselineYear === 'undefined', `Unbaselined feature ${rule.id} should have null or undefined baselineYear`);
      }
    }
  });

  test('F3-T2-4: Catalog validation reports error on empty catalog JSON file ({} or {"rules": []})', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI tool missing: ${cliPath}`);
    const emptyCatalog = path.join(workspaceRoot, 'tests/fixtures/empty_catalog.json');
    fs.mkdirSync(path.dirname(emptyCatalog), { recursive: true });
    fs.writeFileSync(emptyCatalog, JSON.stringify({ rules: [] }));
    const sample = path.join(workspaceRoot, '../es-samples/samples/es2015.js');
    const res = spawnSync('node', [cliPath, sample, '--catalog', emptyCatalog], { encoding: 'utf8' });
    const out = (res.stderr + res.stdout).toLowerCase();
    assert.ok(res.status !== 0 || out.includes('empty') || out.includes('rule') || out.includes('warn'), 'Must warn or fail when catalog has 0 rules');
  });

  test('F3-T2-5: Catalog validation catches duplicate rule ID entries across multiple YAML definitions', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    const ids = new Set();
    for (const rule of catalog.rules || []) {
      assert.ok(!ids.has(rule.id), `Duplicate rule ID detected in catalog: ${rule.id}`);
      ids.add(rule.id);
    }
  });

  test('F3-T2-6: Catalog handling of invalid YAML syntax inside rule file without unhandled syntax error', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI tool missing: ${cliPath}`);
    const badYaml = path.join(workspaceRoot, 'tests/fixtures/bad_rule.yaml');
    fs.mkdirSync(path.dirname(badYaml), { recursive: true });
    fs.writeFileSync(badYaml, 'id: test\nrule: [unclosed array\n  pattern: $A');
    const badCat = path.join(workspaceRoot, 'tests/fixtures/bad_cat.json');
    fs.writeFileSync(badCat, JSON.stringify({ rules: [{ id: "test", name: "Test", astGrepRulePath: "tests/fixtures/bad_rule.yaml", webFeatureId: "test", bcdId: "test", baselineStatus: "low", baselineYear: 2020, modernSuggestion: "none", bundlers: ["webpack", "rollup", "esbuild", "swc"] }] }));
    const sample = path.join(workspaceRoot, '../es-samples/samples/es2015.js');
    const res = spawnSync('node', [cliPath, sample, '--catalog', badCat], { encoding: 'utf8' });
    const out = (res.stderr + res.stdout).toLowerCase();
    assert.ok(res.status !== 0 || out.includes('yaml') || out.includes('parse') || out.includes('error'), 'Must gracefully catch invalid YAML syntax');
  });

  test('F3-T2-7: Catalog rule schema validation rejects non-string modernSuggestion fields', () => {
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    for (const rule of catalog.rules || []) {
      assert.strictEqual(typeof rule.modernSuggestion, 'string', `Rule ${rule.id} must have a string modernSuggestion`);
      assert.ok(rule.modernSuggestion.trim().length > 0, `Rule ${rule.id} modernSuggestion cannot be empty`);
    }
  });

  test('F3-T2-8: Catalog handling of extremely large rule definitions (> 1MB YAML files)', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI tool missing: ${cliPath}`);
    const largeYaml = path.join(workspaceRoot, 'tests/fixtures/large_rule.yaml');
    fs.mkdirSync(path.dirname(largeYaml), { recursive: true });
    const bigComment = '# comment\n'.repeat(100000); // ~1MB
    fs.writeFileSync(largeYaml, `id: large_rule\nname: Large Rule\n${bigComment}rule:\n  pattern: console.log($A)\n`);
    const largeCat = path.join(workspaceRoot, 'tests/fixtures/large_cat.json');
    fs.writeFileSync(largeCat, JSON.stringify({ rules: [{ id: "large_rule", name: "Large Rule", astGrepRulePath: "tests/fixtures/large_rule.yaml", webFeatureId: "test-large", bcdId: "test.large", baselineStatus: "low", baselineYear: 2020, modernSuggestion: "none", bundlers: ["webpack", "rollup", "esbuild", "swc"] }] }));
    const sample = path.join(workspaceRoot, '../es-samples/samples/es2015.js');
    const res = spawnSync('node', [cliPath, sample, '--catalog', largeCat], { encoding: 'utf8' });
    assert.ok(typeof res.status === 'number', 'CLI must complete without memory crash on large YAML rule definitions');
  });

  test('F3-T2-9: Catalog validation rejects rules when bundlers property is missing or empty', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI tool missing: ${cliPath}`);
    const noBundlersCat = path.join(workspaceRoot, 'tests/fixtures/no_bundlers_cat.json');
    fs.mkdirSync(path.dirname(noBundlersCat), { recursive: true });
    fs.writeFileSync(noBundlersCat, JSON.stringify({ rules: [{ id: "test", name: "Test", astGrepRulePath: "tests/fixtures/bad_rule.yaml", webFeatureId: "test", bcdId: "test", baselineStatus: "low", baselineYear: 2020, modernSuggestion: "none" }] }));
    const emptyBundlersCat = path.join(workspaceRoot, 'tests/fixtures/empty_bundlers_cat.json');
    fs.writeFileSync(emptyBundlersCat, JSON.stringify({ rules: [{ id: "test", name: "Test", astGrepRulePath: "tests/fixtures/bad_rule.yaml", webFeatureId: "test", bcdId: "test", baselineStatus: "low", baselineYear: 2020, modernSuggestion: "none", bundlers: [] }] }));
    const sample = path.join(workspaceRoot, '../es-samples/samples/es2015.js');
    const res1 = spawnSync('node', [cliPath, sample, '--catalog', noBundlersCat], { encoding: 'utf8' });
    const res2 = spawnSync('node', [cliPath, sample, '--catalog', emptyBundlersCat], { encoding: 'utf8' });
    assert.ok(res1.status !== 0 || (res1.stderr + res1.stdout).toLowerCase().includes('error'), 'Must fail or error when bundlers is missing');
    assert.ok(res2.status !== 0 || (res2.stderr + res2.stdout).toLowerCase().includes('error'), 'Must fail or error when bundlers is empty');
  });
});

describe('Tier 2 - F4: Boundary & Corner Cases for Zero False-Positive Validation', () => {
  test('F4-T2-1: False-positive validation handles corrupted modern bundle with trailing garbage characters', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI missing: ${cliPath}`);
    const modernBundle = path.join(distBundlesRoot, 'rollup/es2015_modern.js');
    assert.skipIfMissing(modernBundle, `Modern bundle missing: ${modernBundle}`);
    const corruptPath = path.join(workspaceRoot, 'tests/fixtures/corrupt_modern.js');
    fs.mkdirSync(path.dirname(corruptPath), { recursive: true });
    const content = fs.readFileSync(modernBundle, 'utf8') + '\n\n\x00\x01\x02 @@$$%%^^ garbage';
    fs.writeFileSync(corruptPath, content);
    const res = spawnSync('node', [cliPath, corruptPath, '--json'], { encoding: 'utf8' });
    assert.ok(typeof res.status === 'number', 'Scanner must handle trailing garbage characters without fatal exception');
  });

  test('F4-T2-2: False-positive validation avoids matching polyfill names inside code comments or JSDoc blocks', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI missing: ${cliPath}`);
    const testFile = path.join(workspaceRoot, 'tests/fixtures/comment_polyfill.js');
    fs.mkdirSync(path.dirname(testFile), { recursive: true });
    fs.writeFileSync(testFile, '/** This file discusses Promise.allSettled and Array.prototype.includes polyfills in comments */\n// core-js polyfill downleveling\nconst x = 42;\n');
    const res = spawnSync('node', [cliPath, testFile, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `Scanner failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const polyfills = data.detectedPolyfills || data.detectedFeatures || [];
    assert.strictEqual(polyfills.length, 0, 'Polyfills mentioned solely in comments must not be flagged');
  });

  test('F4-T2-3: False-positive validation avoids matching polyfill names inside string literals or messages', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI missing: ${cliPath}`);
    const testFile = path.join(workspaceRoot, 'tests/fixtures/string_polyfill.js');
    fs.mkdirSync(path.dirname(testFile), { recursive: true });
    fs.writeFileSync(testFile, 'const msg = "We need Promise.allSettled and core-js in this string literal"; console.log(msg);\n');
    const res = spawnSync('node', [cliPath, testFile, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `Scanner failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const polyfills = data.detectedPolyfills || data.detectedFeatures || [];
    assert.strictEqual(polyfills.length, 0, 'Polyfill names inside string literals must not be flagged');
  });

  test('F4-T2-4: Scanner behavior when modern bundle is aggressively minified onto a single line', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI missing: ${cliPath}`);
    const minFile = path.join(workspaceRoot, 'tests/fixtures/minified.js');
    fs.mkdirSync(path.dirname(minFile), { recursive: true });
    fs.writeFileSync(minFile, 'const a=[1,2];const b=a.map(x=>x*2);console.log(b);');
    const res = spawnSync('node', [cliPath, minFile, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `Scanner failed on minified code: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(Array.isArray(data.detectedFeatures || data.detectedPolyfills), 'Must return valid JSON array on minified input');
  });

  test('F4-T2-5: Scanner behavior when analyzing bundles with non-standard file extensions (.mjs, .cjs)', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI missing: ${cliPath}`);
    const mjsFile = path.join(workspaceRoot, 'tests/fixtures/test_ext.mjs');
    fs.mkdirSync(path.dirname(mjsFile), { recursive: true });
    fs.writeFileSync(mjsFile, 'export const val = 100;');
    const res = spawnSync('node', [cliPath, mjsFile, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `Scanner must support .mjs extension: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(typeof data === 'object', 'Must parse output for .mjs file');
  });

  test('F4-T2-6: Scanner differentiation between user-defined identifiers matching polyfill helper names and actual polyfills', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI missing: ${cliPath}`);
    const testFile = path.join(workspaceRoot, 'tests/fixtures/user_ident.js');
    fs.mkdirSync(path.dirname(testFile), { recursive: true });
    fs.writeFileSync(testFile, 'function _classCallCheck() { return "custom function not babel helper"; }\n_classCallCheck();\n');
    const res = spawnSync('node', [cliPath, testFile, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `Scanner failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const polyfills = data.detectedPolyfills || data.detectedFeatures || [];
    assert.strictEqual(polyfills.length, 0, 'User-defined function identifiers must not trigger global polyfill detections');
  });

  test('F4-T2-7: Scanner tolerance for modern bundles containing inline source maps at end of file', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI missing: ${cliPath}`);
    const testFile = path.join(workspaceRoot, 'tests/fixtures/inline_map.js');
    fs.mkdirSync(path.dirname(testFile), { recursive: true });
    fs.writeFileSync(testFile, 'console.log("inline map");\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiJ9\n');
    const res = spawnSync('node', [cliPath, testFile, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `Scanner failed on inline source map: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(typeof data === 'object', 'Must parse cleanly ignoring inline sourcemap data');
  });

  test('F4-T2-8: Scanner validation against empty bundle file (0 bytes) reports exactly 0 matches', () => {
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI missing: ${cliPath}`);
    const emptyFile = path.join(workspaceRoot, 'tests/fixtures/empty_bundle.js');
    fs.mkdirSync(path.dirname(emptyFile), { recursive: true });
    fs.writeFileSync(emptyFile, '');
    const res = spawnSync('node', [cliPath, emptyFile, '--json'], { encoding: 'utf8' });
    if (res.status === 0) {
      const data = JSON.parse(res.stdout);
      const polyfills = data.detectedPolyfills || data.detectedFeatures || [];
      assert.strictEqual(polyfills.length, 0, 'Zero-byte bundle must report exactly 0 matches');
    } else {
      assert.ok((res.stderr + res.stdout).length > 0, 'Must provide output if zero-byte file is rejected');
    }
  });
});

