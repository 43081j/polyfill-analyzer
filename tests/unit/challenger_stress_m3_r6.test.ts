import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { clearCatalogCache, registerCacheClearCallback, unregisterCacheClearCallback } from 'polyfill-patterns';

describe('Challenger Stress Test M3 R6: Cache Callback Deduplication & Exception Resilience', () => {
  let originalConsoleError: typeof console.error;

  beforeEach(() => {
    originalConsoleError = console.error;
    // Clean up any remaining callbacks before each test by clearing and unregistering
    clearCatalogCache();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('must deduplicate 10,000 registrations of the same callback instance ($O(1)$ Set behavior)', () => {
    let executionCount = 0;
    const cb = () => { executionCount++; };

    const startReg = performance.now();
    for (let i = 0; i < 10000; i++) {
      registerCacheClearCallback(cb);
    }
    const regDuration = performance.now() - startReg;

    expect(regDuration).toBeLessThan(500); // 10,000 set additions should be very fast

    const startClear = performance.now();
    clearCatalogCache();
    const clearDuration = performance.now() - startClear;

    expect(clearDuration).toBeLessThan(50);
    expect(executionCount).toBe(1);

    // Verify unregistration works and subsequent clear does not trigger callback
    expect(unregisterCacheClearCallback(cb)).toBe(true);
    expect(unregisterCacheClearCallback(cb)).toBe(false);

    clearCatalogCache();
    expect(executionCount).toBe(1);
  });

  it('must demonstrate exception resilience when interleaved with 5,000 throwing callbacks and 5,000 normal callbacks', () => {
    let successCount = 0;
    let errorLogCount = 0;

    console.error = () => { errorLogCount++; };

    const normalCallbacks: (() => void)[] = [];
    const throwingCallbacks: (() => void)[] = [];

    for (let i = 0; i < 5000; i++) {
      const normalCb = () => { successCount++; };
      const throwingCb = () => { throw new Error(`Stress error ${i}`); };
      normalCallbacks.push(normalCb);
      throwingCallbacks.push(throwingCb);

      // Interleave registrations
      registerCacheClearCallback(throwingCb);
      registerCacheClearCallback(normalCb);
    }

    const startClear = performance.now();
    expect(() => clearCatalogCache()).not.toThrow();
    const clearDuration = performance.now() - startClear;

    expect(successCount).toBe(5000);
    expect(errorLogCount).toBe(5000);
    expect(clearDuration).toBeLessThan(1000);

    // Cleanup all registered callbacks
    for (let i = 0; i < 5000; i++) {
      unregisterCacheClearCallback(normalCallbacks[i]);
      unregisterCacheClearCallback(throwingCallbacks[i]);
    }
  });

  it('must handle mutation (register/unregister) during clearCatalogCache execution without infinite loops or iterator invalidation', () => {
    let secondCbExecuted = 0;
    const secondCb = () => { secondCbExecuted++; };

    let firstCbExecuted = 0;
    const firstCb = () => {
      firstCbExecuted++;
      // Register a new callback during iteration
      registerCacheClearCallback(secondCb);
      // Unregister self during iteration
      unregisterCacheClearCallback(firstCb);
    };

    registerCacheClearCallback(firstCb);

    clearCatalogCache();
    expect(firstCbExecuted).toBe(1);
    // Because Array.from snapshot is taken before iteration, secondCb is not executed in the first clear
    expect(secondCbExecuted).toBe(0);

    clearCatalogCache();
    // In second clear, firstCb was unregistered, secondCb was registered
    expect(firstCbExecuted).toBe(1);
    expect(secondCbExecuted).toBe(1);

    unregisterCacheClearCallback(secondCb);
  });
});
