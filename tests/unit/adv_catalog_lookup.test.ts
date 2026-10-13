import { describe, it, expect } from 'vitest';
import { getRuleByWebFeatureId, getRuleByBcdId, getAllRules, loadCatalog, clearCatalogCache, resolveDynamicBaseline, getDefaultCatalogPath } from 'polyfill-patterns';
import path from 'node:path';

describe('Adversarial Test Suite: R2 Catalog Lookup API Coverage Gaps (Phase 4)', () => {
  it('adv_catalog_lookup_by_web_feature_id: verifies getRuleByWebFeatureId returns exact rule entry or undefined for missing IDs', () => {
    clearCatalogCache();
    const rule = getRuleByWebFeatureId('promise-all-settled');
    expect(rule).toBeDefined();
    expect(rule?.id).toBe('promise-all-settled');
    expect(rule?.webFeatureId).toBe('promise-all-settled');

    const missing = getRuleByWebFeatureId('non-existent-web-feature');
    expect(missing).toBeUndefined();
  });

  it('adv_catalog_lookup_by_bcd_id: verifies getRuleByBcdId returns exact rule entry or undefined for missing BCD IDs', () => {
    clearCatalogCache();
    const rule = getRuleByBcdId('javascript.builtins.Array.at');
    expect(rule).toBeDefined();
    expect(rule?.id).toBe('array-at');
    expect(rule?.bcdId).toBe('javascript.builtins.Array.at');

    const missing = getRuleByBcdId('javascript.builtins.NonExistent.method');
    expect(missing).toBeUndefined();
  });

  it('adv_catalog_get_all_rules: verifies getAllRules returns full catalog array and respects custom catalogPath', () => {
    clearCatalogCache();
    const allRules = getAllRules();
    expect(allRules.length).toBeGreaterThanOrEqual(15);

    const relPath = getDefaultCatalogPath();
    const relRules = getAllRules(relPath);
    expect(relRules.length).toBe(allRules.length);
    expect(relRules).toEqual(allRules);
  });

  it('adv_dynamic_web_features_hydration: dynamically updates baselineStatus and baselineYear from web-features at runtime', () => {
    clearCatalogCache();
    const rules = getAllRules();
    const arrayByCopy = rules.find(r => r.id === 'array-change-by-copy');
    expect(arrayByCopy).toBeDefined();
    expect(arrayByCopy?.baselineStatus).toBe('high');
    expect(arrayByCopy?.baselineYear).toBe(2023);

    // Verify that resolveDynamicBaseline overrides stale static values using web-features
    const staleEntry = {
      ...arrayByCopy!,
      baselineStatus: 'low' as const,
      baselineYear: 1999
    };
    const resolved = resolveDynamicBaseline(staleEntry);
    expect(resolved.baselineStatus).toBe('high');
    expect(resolved.baselineYear).toBe(2023);
  });
});
