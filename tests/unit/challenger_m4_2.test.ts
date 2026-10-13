import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  scanFile,
  computeBaselineStatus,
  inferBaselineYear,
  generateRecommendations,
  clearRuleCache
} from '../../src/engine/index.js';
import { clearCatalogCache } from 'polyfill-patterns';

describe('Challenger M4 R3: Baseline Inference and Modernization Recommendations Stress Test', () => {
  beforeEach(() => {
    clearCatalogCache();
    clearRuleCache();
  });

  afterEach(() => {
    clearCatalogCache();
    clearRuleCache();
  });

  const bundlers = ['esbuild', 'rollup', 'swc', 'webpack'];
  const bundlesDir = path.resolve(process.cwd(), 'dist/bundles');

  it('verifies that all *_modern.js bundles across all bundlers report exactly 0 polyfills, high baseline status, and optimal recommendations', () => {
    let checkedCount = 0;
    for (const bundler of bundlers) {
      const dir = path.join(bundlesDir, bundler);
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir).filter(f => f.endsWith('_modern.js') && !f.startsWith('eslint.config_'));

      for (const file of files) {
        const filePath = path.join(dir, file);
        const detected = scanFile(filePath);
        const status = computeBaselineStatus(detected);
        const year = inferBaselineYear(detected);
        const recs = generateRecommendations(detected);

        expect(detected.length, `Expected 0 polyfills in ${bundler}/${file}`).toBe(0);
        expect(status, `Expected high status in ${bundler}/${file}`).toBe('high');
        expect(year, `Expected null year in ${bundler}/${file}`).toBeNull();
        expect(recs.modernizationSuggestion, `Expected optimal suggestion in ${bundler}/${file}`).toContain('Optimal state: 0 polyfills detected');
        expect(recs.recommendations, `Expected no removal needed in ${bundler}/${file}`).toContain('No polyfill removal needed.');
        checkedCount++;
      }
    }
    expect(checkedCount).toBeGreaterThan(0);
  }, 90000);

  it('verifies that all *_ie11.js bundles across all bundlers report accurate polyfill counts and actionable upgrade advice', () => {
    let checkedCount = 0;
    for (const bundler of bundlers) {
      const dir = path.join(bundlesDir, bundler);
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir).filter(f => f.endsWith('_ie11.js') && !f.startsWith('eslint.config_'));

      for (const file of files) {
        const filePath = path.join(dir, file);
        const detected = scanFile(filePath);
        const status = computeBaselineStatus(detected);
        const year = inferBaselineYear(detected);
        const recs = generateRecommendations(detected);

        expect(detected.length, `Expected >0 polyfills in ${bundler}/${file}`).toBeGreaterThan(0);
        expect(recs.recommendations.length, `Expected actionable recommendations in ${bundler}/${file}`).toBeGreaterThan(0);

        if (year !== null && year <= 2015) {
          expect(recs.modernizationSuggestion, `Expected legacy upgrade advice in ${bundler}/${file}`).toContain('Legacy IE11/ES5 polyfills detected');
          expect(recs.recommendations[0], `Expected actionable recommendation in ${bundler}/${file}`).toContain('Upgrade target environment to Baseline 2015');
        } else if (status === 'high') {
          expect(recs.modernizationSuggestion, `Expected obsolete advice in ${bundler}/${file}`).toContain('Obsolete polyfills detected');
          expect(recs.recommendations[0]).toContain('Remove obsolete polyfills');
        } else {
          expect(recs.modernizationSuggestion).toContain('Modern or experimental polyfills detected');
          expect(recs.recommendations[0]).toContain('Review polyfills for low or unbaselined features');
        }
        checkedCount++;
      }
    }
    expect(checkedCount).toBeGreaterThan(0);
  }, 90000);

  it('stress tests all bundles in dist/bundles/ for consistency and invariant checking', () => {
    const allDirs = fs.readdirSync(bundlesDir);
    let totalChecked = 0;

    for (const subDir of allDirs) {
      const fullDir = path.join(bundlesDir, subDir);
      if (!fs.statSync(fullDir).isDirectory()) continue;

      const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.js') && !f.endsWith('.map'));
      for (const file of files) {
        const filePath = path.join(fullDir, file);
        const detected = scanFile(filePath);
        const status = computeBaselineStatus(detected);
        const year = inferBaselineYear(detected);
        const recs = generateRecommendations(detected);

        if (detected.length === 0) {
          expect(status).toBe('high');
          expect(year).toBeNull();
          expect(recs.modernizationSuggestion).toContain('Optimal state');
        } else {
          expect(recs.recommendations.length).toBeGreaterThan(0);
          if (year !== null && year <= 2015) {
            expect(recs.modernizationSuggestion).toContain('Legacy IE11/ES5 polyfills detected');
          }
        }
        totalChecked++;
      }
    }
    expect(totalChecked).toBeGreaterThan(0);
  }, 90000);
});
