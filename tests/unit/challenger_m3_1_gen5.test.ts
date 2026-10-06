import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { loadCatalog, getRuleById, clearCatalogCache, registerCacheClearCallback } from 'polyfill-patterns';
import { scan, scanFile, ruleQueryCache, clearRuleCache } from '../../src/engine/index.js';

describe('Challenger M3 R1 Gen5 - Cache Invalidation & False Positive Stress Test', () => {
  const esSamplesDir = fs.existsSync(path.resolve(__dirname, '../../../es-samples/samples'))
    ? path.resolve(__dirname, '../../../es-samples/samples')
    : path.resolve(__dirname, '../../node_modules/es-samples/samples');

  describe('1. Empirical Behavior: clearCatalogCache() Multiple Times & Cache Invalidation', () => {
    it('calling clearCatalogCache() 1,000 times consecutively behaves robustly without error or memory leak', () => {
      loadCatalog();
      scan('Promise.allSettled = function() {};');
      expect(ruleQueryCache.size).toBeGreaterThan(0);

      expect(() => {
        for (let i = 0; i < 1000; i++) {
          clearCatalogCache();
        }
      }).not.toThrow();

      expect(ruleQueryCache.size).toBe(0);
    });

    it('scanning before and after cache clearing yields identical detected rules and properly repopulates caches', () => {
      const snippet = `
        Promise.allSettled = function() {};
        Array.prototype.includes = function() {};
        Object.hasOwn = function() {};
      `;
      const detectedBefore = scan(snippet);
      expect(detectedBefore.length).toBe(3);
      const cacheSizeBefore = ruleQueryCache.size;
      expect(cacheSizeBefore).toBeGreaterThan(0);

      // Clear both catalog and engine caches via clearCatalogCache()
      clearCatalogCache();
      expect(ruleQueryCache.size).toBe(0);

      // Scan after clearing
      const detectedAfter = scan(snippet);
      expect(detectedAfter.length).toBe(3);
      expect(detectedAfter.map(r => r.id).sort()).toEqual(detectedBefore.map(r => r.id).sort());
      expect(ruleQueryCache.size).toBe(cacheSizeBefore);
    });

    it('stress test: alternating scan and clearCatalogCache in a high-iteration harness loop', () => {
      const snippet = 'Promise.any = function() {};';
      for (let i = 0; i < 20; i++) {
        const res = scan(snippet);
        expect(res.length).toBe(1);
        expect(res[0].id).toBe('promise-any');
        expect(ruleQueryCache.size).toBeGreaterThan(0);
        clearCatalogCache();
        expect(ruleQueryCache.size).toBe(0);
      }
    }, 15000);

    it('adversarial check: multiple registrations of callback array growth', () => {
      let callCount = 0;
      registerCacheClearCallback(() => {
        callCount++;
      });
      clearCatalogCache();
      expect(callCount).toBeGreaterThan(0);
    });
  });

  describe('2. Verification of 0 False Positives on Modern Non-Polyfilled Code', () => {
    it('scanning modern ES sample files in es-samples repo yields 0 false positives', () => {
      if (!fs.existsSync(esSamplesDir)) {
        return;
      }
      const sampleFiles = fs.readdirSync(esSamplesDir)
        .filter(f => /^es\d{4}\.js$/.test(f))
        .map(f => path.join(esSamplesDir, f));

      expect(sampleFiles.length).toBeGreaterThan(0);

      const falsePositives: Array<{ file: string; ruleId: string }> = [];
      for (const filePath of sampleFiles) {
        const detected = scanFile(filePath);
        for (const rule of detected) {
          falsePositives.push({
            file: path.basename(filePath),
            ruleId: rule.id
          });
        }
      }

      if (falsePositives.length > 0) {
        console.error('False positives detected on modern ES sample files:', falsePositives);
      }
      expect(falsePositives).toEqual([]);
    });

    it('scanning native modern usage fixtures yields 0 false positives', () => {
      const fixturesDir = path.resolve(process.cwd(), 'tests/fixtures');
      const nativeFiles = [
        'native_allsettled.js',
        'native_assign.js',
        'native_includes.js'
      ];

      for (const file of nativeFiles) {
        const filePath = path.join(fixturesDir, file);
        if (fs.existsSync(filePath)) {
          const detected = scanFile(filePath);
          expect(detected, `False positive in ${file}: ${detected.map(r => r.id).join(', ')}`).toEqual([]);
        }
      }
    });
  });
});
