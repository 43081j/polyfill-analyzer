import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { RollupAdapter, EsbuildAdapter } from '../../src/bundlers/index.js';
import { loadCatalog, getRuleById, clearCatalogCache, registerCacheClearCallback, unregisterCacheClearCallback } from '../../src/catalog/index.js';
import { scan, ruleQueryCache, clearRuleCache } from '../../src/engine/index.js';

describe('Challenger M3 R1 Gen7 - Empirical Concurrency & Resilience Stress Tests', () => {
  const tmpDir = path.resolve(process.cwd(), '.agents/teamwork_preview_challenger_m3_1_gen7/tmp_stress');

  describe('1. Bundling Adapters (Rollup & Esbuild) Concurrency & Resilience', () => {
    it('must handle high concurrency across multiple targets and input files without race conditions or corruption', async () => {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }

      // Create sample input files
      const inputFiles: string[] = [];
      for (let i = 0; i < 5; i++) {
        const file = path.join(tmpDir, `input_${i}.js`);
        fs.writeFileSync(file, `
          export const val_${i} = ${i} * 10;
          export async function fetchVal() {
            const res = await Promise.resolve(val_${i});
            return res;
          }
        `, 'utf8');
        inputFiles.push(file);
      }

      const rollupAdapter = new RollupAdapter();
      const esbuildAdapter = new EsbuildAdapter();
      const targets = ['modern', 'ie11', 'chrome50', 'es5'] as const;

      const tasks: Promise<void>[] = [];
      const outputFiles: { file: string; target: string; bundler: string }[] = [];

      // Launch 40 concurrent bundle tasks
      for (let i = 0; i < 40; i++) {
        const adapter = i % 2 === 0 ? rollupAdapter : esbuildAdapter;
        const target = targets[i % targets.length];
        const input = inputFiles[i % inputFiles.length];
        const output = path.join(tmpDir, `out_${adapter.name}_${target}_${i}.js`);
        outputFiles.push({ file: output, target, bundler: adapter.name });
        tasks.push(adapter.bundle(input, output, target, { sourcemap: false }));
      }

      // Wait for all concurrent bundles to finish
      await expect(Promise.all(tasks)).resolves.toBeDefined();

      // Verify all files exist, have non-zero size, and contain expected artifacts
      for (const { file, target, bundler } of outputFiles) {
        expect(fs.existsSync(file), `Output file missing: ${file}`).toBe(true);
        const content = fs.readFileSync(file, 'utf8');
        expect(content.length).toBeGreaterThan(0);
        if (target !== 'modern') {
          expect(content).toContain('core-js');
        }
      }
    }, 60000);

    it('must resiliently handle degenerate edge cases (empty file, only comments) without crashing process under concurrency', async () => {
      const emptyFile = path.join(tmpDir, 'empty.js');
      const commentFile = path.join(tmpDir, 'comment.js');
      fs.writeFileSync(emptyFile, '', 'utf8');
      fs.writeFileSync(commentFile, '// Just a comment\n/* another comment */', 'utf8');

      const rollupAdapter = new RollupAdapter();
      const esbuildAdapter = new EsbuildAdapter();

      const tasks = [
        rollupAdapter.bundle(emptyFile, path.join(tmpDir, 'out_empty_rollup.js'), 'modern'),
        esbuildAdapter.bundle(emptyFile, path.join(tmpDir, 'out_empty_esbuild.js'), 'modern'),
        rollupAdapter.bundle(commentFile, path.join(tmpDir, 'out_comment_rollup.js'), 'ie11'),
        esbuildAdapter.bundle(commentFile, path.join(tmpDir, 'out_comment_esbuild.js'), 'ie11'),
      ];

      await expect(Promise.all(tasks)).resolves.toBeDefined();
    }, 15000);
  });

  describe('2. Catalog & Engine Cache Invalidation Under Concurrency', () => {
    it('must maintain cache consistency and avoid race conditions during concurrent scans and cache clears', async () => {
      const snippets = [
        'Promise.allSettled = function() {};',
        'Array.prototype.includes = function() {};',
        'Object.hasOwn = function() {};',
        'String.prototype.replaceAll = function() {};'
      ];

      let errorCount = 0;
      const tasks: Promise<void>[] = [];

      // Launch 50 scanner tasks and 50 cache breaker tasks running concurrently
      for (let i = 0; i < 50; i++) {
        tasks.push(new Promise<void>((resolve) => {
          setTimeout(() => {
            try {
              const snippet = snippets[i % snippets.length];
              const res = scan(snippet);
              if (!Array.isArray(res)) errorCount++;
            } catch (e) {
              errorCount++;
            } finally {
              resolve();
            }
          }, Math.random() * 20);
        }));

        tasks.push(new Promise<void>((resolve) => {
          setTimeout(() => {
            try {
              if (i % 3 === 0) clearCatalogCache();
              else if (i % 3 === 1) clearRuleCache();
              else loadCatalog();
            } catch (e) {
              errorCount++;
            } finally {
              resolve();
            }
          }, Math.random() * 20);
        }));
      }

      await Promise.all(tasks);
      expect(errorCount).toBe(0);

      // Verify post-stress state works cleanly
      clearCatalogCache();
      const finalScan = scan('Promise.allSettled = function() {};');
      expect(finalScan.length).toBeGreaterThanOrEqual(1);
      expect(finalScan[0].id).toBe('promise-all-settled');
    }, 15000);

    it('must safely handle callback set mutation (registering/unregistering inside a clear callback)', () => {
      let executed = false;
      const mutatingCallback = () => {
        executed = true;
        const tempCb = () => {};
        registerCacheClearCallback(tempCb);
        unregisterCacheClearCallback(mutatingCallback);
        unregisterCacheClearCallback(tempCb);
      };

      registerCacheClearCallback(mutatingCallback);
      expect(() => clearCatalogCache()).not.toThrow();
      expect(executed).toBe(true);
    });
  });
});
