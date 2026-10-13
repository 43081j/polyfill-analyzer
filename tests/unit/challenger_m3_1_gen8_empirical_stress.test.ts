import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { RollupAdapter, EsbuildAdapter } from '../../src/bundlers/index.js';
import { loadCatalog, clearCatalogCache, registerCacheClearCallback, unregisterCacheClearCallback } from 'polyfill-patterns';
import { scan, ruleQueryCache, clearRuleCache } from '../../src/engine/index.js';

describe('Challenger M3 R1 Gen8 - Empirical Stress Test (Removal of Artificial Banners & Shims)', () => {
  const tmpDir = path.resolve(process.cwd(), '.agents/teamwork_preview_challenger_m3_1_gen8/tmp_stress');

  describe('1. Empirical Verification of Artificial Banner/Shim Removal', () => {
    it('must NOT contain artificial banner strings or shim arrays in any bundler output', async () => {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
      const inputFile = path.join(tmpDir, 'test_input.js');
      fs.writeFileSync(inputFile, `
        export const p = Promise.allSettled([Promise.resolve(1)]);
        export const inc = [1, 2, 3].includes(2);
        export const obj = Object.hasOwn({ a: 1 }, 'a');
      `, 'utf8');

      const rollupAdapter = new RollupAdapter();
      const esbuildAdapter = new EsbuildAdapter();
      const targets = ['modern', 'ie11', 'chrome50', 'es5'] as const;

      for (const target of targets) {
        const rollupOut = path.join(tmpDir, `out_rollup_${target}.js`);
        const esbuildOut = path.join(tmpDir, `out_esbuild_${target}.js`);

        await rollupAdapter.bundle(inputFile, rollupOut, target);
        await esbuildAdapter.bundle(inputFile, esbuildOut, target);

        const rollupContent = fs.readFileSync(rollupOut, 'utf8');
        const esbuildContent = fs.readFileSync(esbuildOut, 'utf8');

        // Verify artificial banners and shims are completely absent
        expect(rollupContent).not.toContain('/* polyfill __helpers core-js */');
        expect(esbuildContent).not.toContain('polyfill-shim');

        if (target === 'modern') {
          // Verify 0 false positives / leakage in modern targets
          expect(rollupContent).not.toContain('core-js');
          expect(esbuildContent).not.toContain('core-js');
          const rollupScan = scan(rollupContent);
          const esbuildScan = scan(esbuildContent);
          expect(rollupScan.length).toBe(0);
          expect(esbuildScan.length).toBe(0);
        } else {
          // Verify genuine polyfill references exist for downlevel targets
          expect(rollupContent).toContain('core-js');
          expect(esbuildContent).toContain('core-js');
          const rollupScan = scan(rollupContent);
          const esbuildScan = scan(esbuildContent);
          expect(rollupScan.length).toBeGreaterThan(0);
          expect(esbuildScan.length).toBeGreaterThan(0);
        }
      }
    }, 60000);
  });

  describe('2. Massive Parallel Execution & Concurrency Stress Test', () => {
    it('must maintain 0 false positives, 0 regressions, and 0 race conditions across 100 concurrent bundler and caching engine operations', async () => {
      const inputFiles: string[] = [];
      for (let i = 0; i < 10; i++) {
        const file = path.join(tmpDir, `parallel_input_${i}.js`);
        fs.writeFileSync(file, `
          export const val_${i} = [1, 2].includes(${i});
          export const p_${i} = Promise.allSettled([]);
        `, 'utf8');
        inputFiles.push(file);
      }

      const rollupAdapter = new RollupAdapter();
      const esbuildAdapter = new EsbuildAdapter();
      const targets = ['modern', 'ie11', 'chrome50', 'es5'] as const;

      const tasks: Promise<void>[] = [];
      let errorCount = 0;

      // 60 concurrent bundling tasks
      for (let i = 0; i < 60; i++) {
        const adapter = i % 2 === 0 ? rollupAdapter : esbuildAdapter;
        const target = targets[i % targets.length];
        const input = inputFiles[i % inputFiles.length];
        const output = path.join(tmpDir, `out_concurrent_${adapter.name}_${target}_${i}.js`);

        tasks.push(
          adapter.bundle(input, output, target).then(() => {
            const content = fs.readFileSync(output, 'utf8');
            expect(content).not.toContain('/* polyfill __helpers core-js */');
            expect(content).not.toContain('polyfill-shim');
            if (target === 'modern') {
              expect(content).not.toContain('core-js');
              expect(scan(content).length).toBe(0);
            } else {
              expect(content).toContain('core-js');
              expect(scan(content).length).toBeGreaterThan(0);
            }
          }).catch((e) => {
            console.error('Concurrent bundle error:', e);
            errorCount++;
          })
        );
      }

      // 40 concurrent caching engine scan and invalidation tasks
      const snippets = [
        'Promise.allSettled = function() {};',
        'Array.prototype.includes = function() {};',
        'Object.hasOwn = function() {};',
        'const x = [1, 2].map(x => x * 2);' // modern non-polyfilled
      ];

      for (let i = 0; i < 40; i++) {
        tasks.push(new Promise<void>((resolve) => {
          setTimeout(() => {
            try {
              const snippet = snippets[i % snippets.length];
              const res = scan(snippet);
              if (i % 4 === 3) {
                expect(res.length).toBe(0); // modern non-polyfilled
              } else {
                expect(res.length).toBeGreaterThan(0);
              }
              if (i % 5 === 0) clearCatalogCache();
              if (i % 7 === 0) clearRuleCache();
            } catch (e) {
              console.error('Concurrent scan error:', e);
              errorCount++;
            } finally {
              resolve();
            }
          }, Math.random() * 25);
        }));
      }

      await Promise.all(tasks);
      expect(errorCount).toBe(0);
    }, 60000);
  });
});
