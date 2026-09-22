import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { loadCatalog, getRuleById, clearCatalogCache, registerCacheClearCallback, unregisterCacheClearCallback } from '../../src/catalog/index.js';
import { scan, scanFile, parseYamlRule, ruleQueryCache, clearRuleCache } from '../../src/engine/index.js';

describe('Performance Benchmarks & Caching Verification', () => {
  const workspaceDir = path.resolve(process.cwd(), '.agents/teamwork_preview_worker_m3_1_gen2');

  describe('1. Catalog Performance & Caching', () => {
    it('must complete cold catalog loading and lookup in < 200ms', () => {
      const start = performance.now();
      const rule = getRuleById('promise-all-settled');
      const duration = performance.now() - start;
      expect(rule).toBeDefined();
      expect(rule?.id).toBe('promise-all-settled');
      expect(duration).toBeLessThan(200);
    });

    it('must complete 100 warm catalog lookups in < 100ms', () => {
      loadCatalog();
      const start = performance.now();
      for (let i = 0; i < 100; i++) {
        getRuleById('promise-all-settled');
      }
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(100);
    });

    it('must complete 50 lookups using relative path string in < 50ms (path normalization cache hit)', () => {
      loadCatalog();
      const relPath = 'src/catalog/rules.json';
      const start = performance.now();
      for (let i = 0; i < 50; i++) {
        getRuleById('promise-all-settled', relPath);
      }
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(50);
    });

    it('verifies that clearCatalogCache() clears catalogCache and forces a fresh disk read on subsequent lookups', () => {
      const catalog1 = loadCatalog();
      const catalog2 = loadCatalog();
      expect(catalog1).toBe(catalog2);

      clearCatalogCache();
      const catalog3 = loadCatalog();
      expect(catalog3).not.toBe(catalog1);
      expect(catalog3.rules).toEqual(catalog1.rules);
    });

    it('verifies callback deduplication (registering the same callback twice only executes it once)', () => {
      let count = 0;
      const cb = () => { count++; };
      registerCacheClearCallback(cb);
      registerCacheClearCallback(cb);
      clearCatalogCache();
      expect(count).toBe(1);
      unregisterCacheClearCallback(cb);
    });

    it('verifies callback unregistration via unregisterCacheClearCallback', () => {
      let count = 0;
      const cb = () => { count++; };
      registerCacheClearCallback(cb);
      const unregistered = unregisterCacheClearCallback(cb);
      expect(unregistered).toBe(true);
      clearCatalogCache();
      expect(count).toBe(0);
    });

    it('verifies exception isolation in clearCatalogCache callbacks', () => {
      let count = 0;
      const throwingCb = () => { throw new Error('Test callback exception'); };
      const validCb = () => { count++; };
      registerCacheClearCallback(throwingCb);
      registerCacheClearCallback(validCb);

      const originalError = console.error;
      let loggedError: any = null;
      console.error = (...args: any[]) => { loggedError = args; };

      try {
        expect(() => clearCatalogCache()).not.toThrow();
        expect(count).toBe(1);
        expect(loggedError).not.toBeNull();
      } finally {
        console.error = originalError;
        unregisterCacheClearCallback(throwingCb);
        unregisterCacheClearCallback(validCb);
      }
    });
  });

  describe('2. Engine scan() In-Memory Caching', () => {
    it('must complete 50 sequential scan() invocations in < 5000ms total', () => {
      const snippet = 'Promise.allSettled = function() {};';
      // Warm up initial read
      scan(snippet);
      const start = performance.now();
      for (let i = 0; i < 50; i++) {
        scan(snippet);
      }
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(5000);
    });

    it('verifies that clearRuleCache() purges ruleQueryCache', () => {
      const snippet = 'Promise.allSettled = function() {};';
      scan(snippet);
      expect(ruleQueryCache.size).toBeGreaterThan(0);

      clearRuleCache();
      expect(ruleQueryCache.size).toBe(0);
    });

    it('verifies that clearCatalogCache() also purges engine ruleQueryCache', () => {
      const snippet = 'Promise.allSettled = function() {};';
      scan(snippet);
      expect(ruleQueryCache.size).toBeGreaterThan(0);

      clearCatalogCache();
      expect(ruleQueryCache.size).toBe(0);
    });
  });

  describe('3. Robust YAML Parsing and Import Resolution', () => {
    it('parseYamlRule handles YAML strings with comments and unmatched brackets', () => {
      const yamlWithComment = `
# This rule checks array indexing [ without matching bracket
- pattern: 'foo()'
`;
      const res = parseYamlRule(yamlWithComment);
      expect(res.rule).toBeDefined();
    });

    it('scanFile ignores imports inside comments and handles extensionless imports via warning/probing', () => {
      if (!fs.existsSync(workspaceDir)) {
        fs.mkdirSync(workspaceDir, { recursive: true });
      }
      const targetJs = path.join(workspaceDir, 'helper.js');
      fs.writeFileSync(targetJs, 'export const x = 1;', 'utf8');

      const testFilePath = path.join(workspaceDir, 'extensionless_import.js');
      fs.writeFileSync(testFilePath, `
        // import './non_existent_file.js';
        import { x } from './helper';
        console.log(x);
      `, 'utf8');

      expect(() => scanFile(testFilePath)).not.toThrow();
    });
  });
});
