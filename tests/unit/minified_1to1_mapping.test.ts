import { describe, test, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { WebpackAdapter } from '../../src/bundlers/webpack-adapter.js';
import { scanFile, computeBaselineStatus, inferBaselineYear, generateRecommendations, formatTableReport } from '../../src/engine/index.js';

describe('Minified & Mangled Production Bundle 1:1 Source Mapping Verification', () => {
  const demoDir = path.resolve(__dirname, '../../dist/demo_1to1');
  const srcFile = path.join(demoDir, 'CartService.js');
  const minBundleFile = path.join(demoDir, 'cart-service.min.js');

  const sourceCode = `/**
 * Production E-Commerce Cart Service
 */
export class CartService {
  // 1. Public & Private Class Fields (ES2022)
  currency = 'USD';
  #items = [];
  #discountSecret = 'PROMO_2026';

  constructor(initialItems = []) {
    this.#items = [...initialItems];
  }

  // 2. Array.prototype.at() (ES2022)
  getLatestItem() {
    return this.#items.at(-1);
  }

  // 3. Array.prototype.includes() (ES2016)
  hasItem(sku) {
    const skus = this.#items.map((item) => item.sku);
    return skus.includes(sku);
  }

  // 4. Object.hasOwn() (ES2022)
  hasMetadata(item, key) {
    return Object.hasOwn(item, key);
  }

  // 5. String.prototype.replaceAll() (ES2021)
  formatCouponCode(rawCode) {
    return rawCode.replaceAll('-', '_').concat(this.#discountSecret);
  }
}
`;

  test('Compiles source into a true inlined, mangled production bundle and maps polyfills 1:1 back to source lines', async () => {
    fs.mkdirSync(demoDir, { recursive: true });
    fs.writeFileSync(srcFile, sourceCode, 'utf8');

    const adapter = new WebpackAdapter();
    await adapter.bundle(srcFile, minBundleFile, 'ie11', {
      inlinePolyfills: true,
      minify: true,
      sourcemap: true,
    });

    expect(fs.existsSync(minBundleFile)).toBe(true);
    expect(fs.existsSync(`${minBundleFile}.map`)).toBe(true);

    const minifiedCode = fs.readFileSync(minBundleFile, 'utf8');

    // Verify true production bundle characteristics:
    // 1. No literal require("core-js/...") module specifier strings
    expect(minifiedCode.includes('core-js/modules')).toBe(false);
    // 2. Helper function names (_classPrivateFieldGet, _defineProperty) are mangled
    expect(minifiedCode.includes('_classPrivateFieldGet')).toBe(false);
    expect(minifiedCode.includes('_defineProperty')).toBe(false);

    // Run upgraded AST-grep + SourceMap 1:1 detector
    const detected = scanFile(minBundleFile);
    const detectedIds = detected.map((d) => d.id);

    expect(detectedIds).toContain('array-at');
    expect(detectedIds).toContain('array-includes');
    expect(detectedIds).toContain('object-has-own');
    expect(detectedIds).toContain('string-replace-all');
    expect(detectedIds).toContain('class-fields');

    // Verify 1:1 source mappings
    const atEntry = detected.find((d) => d.id === 'array-at')!;
    expect(atEntry.mapping).toBeDefined();
    expect(atEntry.mapping!.minifiedPolyfill.snippet).toContain('target:"Array"');
    expect(atEntry.mapping!.precedingSource.some((s) => s.sourceSnippet.includes('.at(-1)'))).toBe(true);

    const hasOwnEntry = detected.find((d) => d.id === 'object-has-own')!;
    expect(hasOwnEntry.mapping).toBeDefined();
    expect(hasOwnEntry.mapping!.minifiedPolyfill.snippet).toContain('target:"Object"');
    expect(hasOwnEntry.mapping!.precedingSource.some((s) => s.sourceSnippet.includes('Object.hasOwn(item, key)'))).toBe(true);

    const classFieldsEntry = detected.find((d) => d.id === 'class-fields')!;
    expect(classFieldsEntry.mapping).toBeDefined();
    expect(classFieldsEntry.mapping!.precedingSource.length).toBeGreaterThan(0);

    // Print full report for inspection
    const status = computeBaselineStatus(detected);
    const year = inferBaselineYear(detected);
    const recs = generateRecommendations(detected);
    const report = formatTableReport(minBundleFile, detected, status, year, recs.modernizationSuggestion, recs.recommendations);
    console.log(report);
  }, 30000);
});
