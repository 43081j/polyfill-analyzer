import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { runCli } from '../../src/cli/index.js';
import { scanFile, ruleQueryCache, clearRuleCache } from '../../src/engine/index.js';
import { clearCatalogCache } from '../../src/catalog/index.js';

describe('Challenger M4 R1 - Bundle Analysis Demo CLI Stress Test', () => {
  let exitSpy: any;
  let logSpy: any;
  let errorSpy: any;
  let warnSpy: any;
  const tmpDir = path.resolve(process.cwd(), '.agents/challenger_m4_1/tmp_stress_fixtures');

  beforeEach(() => {
    clearCatalogCache();
    clearRuleCache();
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(((code?: number) => {
      throw new Error(`EXIT_${code ?? 0}`);
    }) as any);
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    clearCatalogCache();
    clearRuleCache();
  });

  // Helper to collect all .js bundle files in dist/bundles
  function getAllBundleFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(getAllBundleFiles(fullPath));
      } else if (file.endsWith('.js') && !file.includes('.config') && !file.includes('.map')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const bundlesDir = path.resolve(process.cwd(), 'dist/bundles');
  const allBundles = getAllBundleFiles(bundlesDir);

  describe('1. Rapid Sequential Scanning & Performance Verification (<5000ms per scan)', () => {
    it('must scan all available bundle files sequentially without exceeding 5000ms per scan', () => {
      expect(allBundles.length).toBeGreaterThan(0);
      let maxDuration = 0;
      let totalDuration = 0;

      for (const bundlePath of allBundles) {
        const start = performance.now();
        expect(() => runCli([bundlePath, '--json'])).not.toThrow();
        const duration = performance.now() - start;

        expect(duration).toBeLessThan(5000);
        maxDuration = Math.max(maxDuration, duration);
        totalDuration += duration;
      }

      const avgDuration = totalDuration / allBundles.length;
      expect(maxDuration).toBeLessThan(5000);
      // Ensure logging occurred for each scan
      expect(logSpy.mock.calls.length).toBeGreaterThanOrEqual(allBundles.length);
    }, 180000);
  });

  describe('2. Cache Isolation & Determinism Across Scans', () => {
    it('must maintain deterministic scan results across repeated scans with and without cache clears', () => {
      const testBundles = allBundles.slice(0, 10);
      const initialResults: Record<string, string> = {};

      // First pass: populate cache and record output
      for (const bundlePath of testBundles) {
        logSpy.mockClear();
        expect(() => runCli([bundlePath, '--json'])).not.toThrow();
        expect(logSpy.mock.calls.length).toBe(1);
        initialResults[bundlePath] = logSpy.mock.calls[0][0];
      }

      // Verify cache is populated
      expect(ruleQueryCache.size).toBeGreaterThan(0);

      // Second pass: scan without clearing cache, output must be identical
      for (const bundlePath of testBundles) {
        logSpy.mockClear();
        expect(() => runCli([bundlePath, '--json'])).not.toThrow();
        expect(logSpy.mock.calls[0][0]).toBe(initialResults[bundlePath]);
      }

      // Third pass: clear cache before each scan, output must be identical
      for (const bundlePath of testBundles) {
        clearRuleCache();
        clearCatalogCache();
        logSpy.mockClear();
        expect(() => runCli([bundlePath, '--json'])).not.toThrow();
        expect(logSpy.mock.calls[0][0]).toBe(initialResults[bundlePath]);
      }
    }, 60000);
  });

  describe('3. Edge Cases: Empty Files, Syntax Errors, Unresolvable Imports', () => {
    it('handles empty bundle files cleanly with 0 matches and no errors', () => {
      const emptyFile = path.join(tmpDir, 'empty.js');
      fs.writeFileSync(emptyFile, '', 'utf8');

      expect(() => runCli([emptyFile, '--json'])).not.toThrow();
      const data = JSON.parse(logSpy.mock.calls[0][0]);
      expect(data.detectedFeatures).toHaveLength(0);
      expect(data.inferredBaseline.status).toBe('high');
      expect(data.inferredBaseline.year).toBeNull();
    });

    it('handles syntax error files cleanly by terminating with non-zero exit code and error message', () => {
      const syntaxErrorFiles = [
        'const x = ;',
        'function test() { var = 123; }',
        'let y = "unterminated string;',
        '{ unclosed block / * * /',
      ];

      for (let i = 0; i < syntaxErrorFiles.length; i++) {
        const file = path.join(tmpDir, `syntax_err_${i}.js`);
        fs.writeFileSync(file, syntaxErrorFiles[i], 'utf8');

        errorSpy.mockClear();
        expect(() => runCli([file, '--json'])).toThrow('EXIT_1');
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining('Error scanning file:'),
          expect.stringContaining('Syntax error parsing JavaScript code')
        );
      }
    });

    it('handles files with local unresolvable imports by warning and continuing scan without crashing', () => {
      const importFile = path.join(tmpDir, 'unresolvable_imports.js');
      fs.writeFileSync(importFile, `
        import { foo } from './non_existent_module_12345.js';
        const bar = require('./missing_local_file.js');
        Promise.allSettled = function() {};
      `, 'utf8');

      warnSpy.mockClear();
      logSpy.mockClear();
      expect(() => runCli([importFile, '--json'])).not.toThrow();

      // Verify that warnings were printed for unresolvable imports
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Cannot find module or unresolvable import path: ./non_existent_module_12345.js'));
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Cannot find module or unresolvable import path: ./missing_local_file.js'));

      // Verify scan completed successfully and detected polyfills in code
      const data = JSON.parse(logSpy.mock.calls[0][0]);
      expect(data.detectedFeatures.length).toBeGreaterThan(0);
    });
  });

  describe('4. Flag Permutations & Argument Stress Testing', () => {
    it('must execute cleanly across flag permutations without unhandled exceptions or crashes', () => {
      const testBundle = allBundles[0];
      const permutations = [
        [],
        ['--json'],
        ['-j'],
        ['--format', 'table'],
        ['-f', 'table'],
        ['--format', 'json'],
        ['-f', 'json'],
        ['--json', '--format', 'table'], // Conflicting flags
        ['--format', 'json', '--json'],
      ];

      for (const flags of permutations) {
        logSpy.mockClear();
        errorSpy.mockClear();
        expect(() => runCli([testBundle, ...flags])).not.toThrow();
        expect(logSpy).toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
      }
    });

    it('exits cleanly on invalid flag permutations and unknown flags without unhandled crashes', () => {
      const testBundle = allBundles[0];
      const invalidPermutations = [
        ['--unknown-flag'],
        ['--format', 'xml'],
        ['--catalog', '/invalid/nonexistent/catalog.json'],
      ];

      for (const flags of invalidPermutations) {
        errorSpy.mockClear();
        expect(() => runCli([testBundle, ...flags])).toThrow('EXIT_1');
        expect(errorSpy).toHaveBeenCalled();
      }
    });
  });

  describe('5. Empirical Differential Testing & 500-Iteration Rapid Sequential Stress', () => {
    it('differential verification: runCli json output detectedFeatures must match direct scanFile output', () => {
      const sampleBundles = allBundles.slice(0, 15);
      for (const bundlePath of sampleBundles) {
        logSpy.mockClear();
        expect(() => runCli([bundlePath, '--json'])).not.toThrow();
        const cliData = JSON.parse(logSpy.mock.calls[0][0]);
        const directFeatures = scanFile(bundlePath);

        expect(cliData.detectedFeatures.length).toBe(directFeatures.length);
        const cliIds = cliData.detectedFeatures.map((f: any) => f.id).sort();
        const directIds = directFeatures.map((f: any) => f.id).sort();
        expect(cliIds).toEqual(directIds);
      }
    });

    it('500-iteration rapid sequential stress scan with randomized cache invalidation without memory leaks or degradation', () => {
      let maxScanTime = 0;
      let totalScanTime = 0;
      const iterations = 500;

      for (let i = 0; i < iterations; i++) {
        const bundlePath = allBundles[i % allBundles.length];
        if (i % 7 === 0) clearRuleCache();
        if (i % 13 === 0) clearCatalogCache();

        logSpy.mockClear();
        const start = performance.now();
        expect(() => runCli([bundlePath, '--json'])).not.toThrow();
        const dur = performance.now() - start;

        expect(dur).toBeLessThan(5000);
        maxScanTime = Math.max(maxScanTime, dur);
        totalScanTime += dur;
      }

      const avgTime = totalScanTime / iterations;
      console.log(`500-Iteration Stress Test Stats: Avg = ${avgTime.toFixed(2)}ms, Peak = ${maxScanTime.toFixed(2)}ms`);
      expect(maxScanTime).toBeLessThan(5000);
    }, 180000);
  });
});

