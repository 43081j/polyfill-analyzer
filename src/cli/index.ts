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
  formatWebsiteHtmlReport,
  analyzeBundles,
  evaluateBaselineTarget,
} from '../engine/index.js';
import { loadCatalog } from '../catalog/index.js';
import { startWebServer } from '../web/server.js';

export const version = '0.1.0';

function printHelp(): void {
  console.log(`Polyfill Analyzer CLI v${version}
Usage: polyfill-analyzer <file> [options]
  polyfill-analyzer <https://url> [options]       Scan a live website URL or remote JS bundle
  polyfill-analyzer url <https://url> [options]   Scan a live website URL (explicit subcommand)
  polyfill-analyzer serve [--port 3000]           Start interactive Web UI dashboard & REST API

Options:
  -f, --format <table|json|markdown|html>      Output format (default: table for file, markdown for URL)
  --html                                       Generate a standalone interactive HTML report (same UI as Web dashboard)
  -o, --output <path>                          Write output report to a local file (e.g. report.html, default: polyfill-report.html in html mode)
  -j, --json                                   Output raw JSON report
  -c, --catalog <path>                         Custom catalog rules JSON path
  --target-year <YYYY>                         Set Baseline target year (2015 to current year; warns on features unavailable by YYYY-12-31)
  --widely-available-on-date <YYYY-MM-DD>      Set Baseline Widely available date (warns on features with baseline_low_date > date minus 30 months)
  -p, --port <number>                          Port for 'serve' Web UI (default: 3000)
  -m, --max-bundles <number>                   Maximum script bundles to scan on a website URL (default: 20)
  -h, --help                                   Show this help message`);
}

export function runCli(argv = process.argv.slice(2)): void {
  try {
    const { values, positionals } = parseArgs({
      args: argv,
      options: {
        json: { type: 'boolean', short: 'j' },
        html: { type: 'boolean' },
        output: { type: 'string', short: 'o' },
        catalog: { type: 'string', short: 'c' },
        format: { type: 'string', short: 'f' },
        'target-year': { type: 'string' },
        'widely-available-on-date': { type: 'string' },
        port: { type: 'string', short: 'p' },
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

    const effectiveFormat =
      values.format ||
      (values.html ? 'html' : undefined) ||
      (typeof values.output === 'string' && values.output.endsWith('.html') ? 'html' : undefined);

    if (
      effectiveFormat &&
      effectiveFormat !== 'json' &&
      effectiveFormat !== 'table' &&
      effectiveFormat !== 'markdown' &&
      effectiveFormat !== 'html'
    ) {
      console.error(`Error: Unsupported format value "${effectiveFormat}"`);
      process.exit(1);
    }

    const targetYear =
      typeof values['target-year'] === 'string'
        ? Number.parseInt(values['target-year'], 10)
        : undefined;
    const widelyAvailableOnDate =
      typeof values['widely-available-on-date'] === 'string'
        ? values['widely-available-on-date']
        : undefined;

    // Validate Baseline target flags early
    evaluateBaselineTarget([], { targetYear, widelyAvailableOnDate });

    const firstPos = positionals[0];

    // 1. Subcommand: serve / web
    if (firstPos === 'serve' || firstPos === 'web') {
      const port = values.port ? parseInt(values.port, 10) : 3000;
      startWebServer(port);
      return;
    }

    // 2. Subcommand: scan/url <https://...> OR direct http(s):// URL
    if (
      firstPos === 'scan' ||
      firstPos === 'url' ||
      firstPos.startsWith('http://') ||
      firstPos.startsWith('https://')
    ) {
      const targetUrl =
        firstPos === 'scan' || firstPos === 'url' ? positionals[1] : firstPos;
      if (!targetUrl) {
        console.error('Error: Please provide a target URL (e.g. polyfill-analyzer scan https://www.example.com)');
        process.exit(1);
      }
      const maxBundles = values['max-bundles'] ? parseInt(values['max-bundles'], 10) : 20;
      scanWebsiteUrl(targetUrl, { maxBundles, targetYear, widelyAvailableOnDate })
        .then((report) => {
          if (values.json || effectiveFormat === 'json') {
            const jsonStr = JSON.stringify(report, null, 2);
            if (typeof values.output === 'string') {
              const outPath = path.resolve(process.cwd(), values.output);
              fs.writeFileSync(outPath, jsonStr, 'utf8');
            }
            console.log(jsonStr);
          } else if (effectiveFormat === 'html') {
            const html = formatWebsiteHtmlReport(report);
            const outPath = path.resolve(
              process.cwd(),
              typeof values.output === 'string' ? values.output : 'polyfill-report.html'
            );
            fs.writeFileSync(outPath, html, 'utf8');
            if (typeof values.output === 'string') {
              console.log(`Saved HTML report to ${outPath}`);
            } else {
              console.error(`Saved HTML report to ${outPath}`);
              console.log(html);
            }
          } else {
            const md = formatWebsiteMarkdownReport(report);
            if (typeof values.output === 'string') {
              const outPath = path.resolve(process.cwd(), values.output);
              fs.writeFileSync(outPath, md, 'utf8');
            }
            console.log(md);
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
    const { modernizationSuggestion, recommendations } = generateRecommendations(sorted, {
      targetYear,
      widelyAvailableOnDate,
    });
    const baselineTarget = evaluateBaselineTarget(sorted, {
      targetYear,
      widelyAvailableOnDate,
    });

    if (values.json || effectiveFormat === 'json') {
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
        baselineTarget,
        modernizationSuggestion,
        recommendations,
        baselineStatus: status,
        baselineYear: year,
      };
      const jsonStr = JSON.stringify(output, null, 2);
      if (typeof values.output === 'string') {
        const outPath = path.resolve(process.cwd(), values.output);
        fs.writeFileSync(outPath, jsonStr, 'utf8');
      }
      console.log(jsonStr);
    } else if (effectiveFormat === 'html') {
      const code = fs.readFileSync(filePath, 'utf8');
      const mapPath = `${filePath}.map`;
      const sourceMapJson = fs.existsSync(mapPath) ? fs.readFileSync(mapPath, 'utf8') : undefined;
      const report = analyzeBundles(
        filePath,
        1,
        [{ url: filePath, fileName: path.basename(filePath), code, sourceMapJson }],
        { targetYear, widelyAvailableOnDate }
      );
      const html = formatWebsiteHtmlReport(report);
      const outPath = path.resolve(
        process.cwd(),
        typeof values.output === 'string' ? values.output : 'polyfill-report.html'
      );
      fs.writeFileSync(outPath, html, 'utf8');
      if (typeof values.output === 'string') {
        console.log(`Saved HTML report to ${outPath}`);
      } else {
        console.error(`Saved HTML report to ${outPath}`);
        console.log(html);
      }
    } else if (effectiveFormat === 'markdown') {
      const code = fs.readFileSync(filePath, 'utf8');
      const report = analyzeBundles(
        filePath,
        1,
        [{ url: filePath, fileName: path.basename(filePath), code }],
        { targetYear, widelyAvailableOnDate }
      );
      const md = formatWebsiteMarkdownReport(report);
      if (typeof values.output === 'string') {
        const outPath = path.resolve(process.cwd(), values.output);
        fs.writeFileSync(outPath, md, 'utf8');
      }
      console.log(md);
    } else {
      const tbl = formatTableReport(
        filePath,
        sorted,
        status,
        year,
        modernizationSuggestion,
        recommendations,
        baselineTarget
      );
      if (typeof values.output === 'string') {
        const outPath = path.resolve(process.cwd(), values.output);
        fs.writeFileSync(outPath, tbl, 'utf8');
      }
      console.log(tbl);
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
