import { describe, it, expect } from 'vitest';
import { registerCacheClearCallback, clearCatalogCache } from '../../src/catalog/index.js';
import { scan, ruleQueryCache, clearRuleCache } from '../../src/engine/index.js';

describe('Adversarial Cache Invalidation - Non-throwing tests', () => {
  it('adv_duplicate_registration: registering identical callbacks multiple times should not cause unbounded duplicate executions without deduplication or unregistering', () => {
    let invocationCount = 0;
    const cb = () => { invocationCount++; };

    registerCacheClearCallback(cb);
    registerCacheClearCallback(cb);
    registerCacheClearCallback(cb);

    clearCatalogCache();
    // If deduplication were implemented, invocationCount would be 1. Currently it invokes 3 times (and grows unbounded each time register is called).
    expect(invocationCount).toBe(1);
  });

  it('adv_cross_module_multiple_rules: clearCatalogCache should purge ruleQueryCache after caching multiple distinct rules', () => {
    scan('Promise.allSettled = function() {};');
    scan('Array.prototype.at = function() {};');
    scan('Object.hasOwn(obj, prop);');

    expect(ruleQueryCache.size).toBeGreaterThanOrEqual(2);

    clearCatalogCache();
    expect(ruleQueryCache.size).toBe(0);
  });
});
