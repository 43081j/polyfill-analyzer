#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import {
  scanFile,
  parseYamlRule,
  computeBaselineStatus,
  inferBaselineYear,
  generateRecommendations,
  formatTableReport,
  scanWebsiteUrl,
  formatWebsiteMarkdownReport,
  analyzeBundles,
} from '../engine/index.js';
import { loadCatalog } from '../catalog/index.js';

export const version = '0.1.0';

function printHelp(): void {
  console.log(`Polyfill Analyzer CLI v${version}
Usage: polyfill-analyzer <file> [options]
  polyfill-analyzer <https://url> [options]       Scan a live website URL or remote JS bundle
  polyfill-analyzer url <https://url> [options]   Scan a live website URL (explicit subcommand)

Options:
  -f, --format <table|json|markdown>   Output format (default: table for file, markdown for URL)
  -j, --json                           Output raw JSON report
  -c, --catalog <path>                 Custom catalog rules JSON path
  -m, --max-bundles <number>           Maximum script bundles to scan on a website URL (default: 20)
  -h, --help                           Show this help message`);
}

export function runCli(argv = process.argv.slice(2)): void {
  try {
    const { values, positionals } = parseArgs({
      args: argv,
      options: {
        json: { type: 'boolean', short: 'j' },
        catalog: { type: 'string', short: 'c' },
        format: { type: 'string', short: 'f' },
        'max-bundles': { type: 'string', short: 'm' },
        help: { type: 'boolean', short: 'h' },
      },
      allowPositionals: true,
      strict: true,
    });

    if (values.help || positionals.length === 0) {
      if (positionals.length === 0 && argv.length > 0 && !values.help) {
        console.error('Error: No input file specified.');
        process.exit(1);
      }
      printHelp();
      if (positionals.length === 0) process.exit(1);
      return;
    }

    if (
      values.format &&
      values.format !== 'json' &&
      values.format !== 'table' &&
      values.format !== 'markdown'
    ) {
      console.error(`Error: Unsupported format value "${values.format}"`);
      process.exit(1);
    }

    const firstPos = positionals[0];

    // 2. Subcommand: url <https://...> OR direct http(s):// URL
    if (firstPos === 'url' || firstPos.startsWith('http://') || firstPos.startsWith('https://')) {
      const targetUrl = firstPos === 'url' ? positionals[1] : firstPos;
      if (!targetUrl) {
        console.error('Error: Please provide a target URL (e.g. polyfill-analyzer url https://www.example.com)');
        process.exit(1);
      }
      const maxBundles = values['max-bundles'] ? parseInt(values['max-bundles'], 10) : 20;
      scanWebsiteUrl(targetUrl, { maxBundles })
        .then((report) => {
          if (values.json || values.format === 'json') {
            console.log(JSON.stringify(report, null, 2));
          } else {
            console.log(formatWebsiteMarkdownReport(report));
          }
        })
        .catch((err: any) => {
          console.error('Error scanning URL:', err.message);
          process.exit(1);
        });
      return;
    }

    // 3. Standard File Path Scanning
    const filePath = firstPos;
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found: ${filePath}`);
      process.exit(1);
    }
    if (fs.statSync(filePath).isDirectory()) {
      console.error(`Error: Expected file path, found directory: ${filePath}`);
      process.exit(1);
    }

    const catalogPath = typeof values.catalog === 'string' ? values.catalog : undefined;

    if (catalogPath) {
      try {
        const cat = loadCatalog(catalogPath);
        if (!cat.rules || cat.rules.length === 0) {
          console.warn('Warning: catalog has 0 rules');
          console.error('Error: Empty catalog rule definition');
          process.exit(1);
        }
        for (const r of cat.rules) {
          const rPath = path.resolve(process.cwd(), r.astGrepRulePath);
          if (fs.existsSync(rPath)) {
            const content = fs.readFileSync(rPath, 'utf8');
            parseYamlRule(content);
          }
        }
      } catch (err: any) {
        console.error('Error in catalog validation / YAML syntax parse error:', err.message);
        process.exit(1);
      }
    }

    let detected: any[] = [];
    try {
      detected = scanFile(filePath, catalogPath);
    } catch (err: any) {
      console.error('Error scanning file:', err.message);
      process.exit(1);
    }

    const sorted = detected.slice().sort((a, b) => a.id.localeCompare(b.id));
    const status = computeBaselineStatus(sorted);
    const year = inferBaselineYear(sorted);
    const { modernizationSuggestion, recommendations } = generateRecommendations(sorted);

    if (values.json || values.format === 'json') {
      const output = {
        bundlePath: filePath,
        file: filePath,
        target: filePath,
        detectedFeatures: sorted,
        detectedPolyfills: sorted,
        inferredBaseline: {
          status,
          year,
          suggestion: modernizationSuggestion,
          recommendations,
        },
        modernizationSuggestion,
        recommendations,
        baselineStatus: status,
        baselineYear: year,
      };
      console.log(JSON.stringify(output, null, 2));
    } else if (values.format === 'markdown') {
      const code = fs.readFileSync(filePath, 'utf8');
      const report = analyzeBundles(filePath, 1, [
        { url: filePath, fileName: path.basename(filePath), code },
      ]);
      console.log(formatWebsiteMarkdownReport(report));
    } else {
      console.log(formatTableReport(filePath, sorted, status, year, modernizationSuggestion, recommendations));
    }
  } catch (err: any) {
    console.error('Fatal error:', err.message);
    process.exit(1);
  }
}

if (
  process.argv[1] &&
  (process.argv[1].endsWith('cli/index.js') ||
    process.argv[1].endsWith('polyfill-analyzer') ||
    process.argv[1].endsWith('polyfill-detector'))
) {
  runCli();
}
