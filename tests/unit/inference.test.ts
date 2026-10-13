import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  computeBaselineStatus,
  inferBaselineYear,
  generateRecommendations,
  formatTableReport,
  subtractThirtyMonths,
  evaluateBaselineTarget,
  clearRuleCache,
  RuleEntry
} from '../../src/engine/index.js';
import { clearCatalogCache } from 'polyfill-patterns';

describe('Inference Engine Unit Tests', () => {
  beforeEach(() => {
    clearCatalogCache();
    clearRuleCache();
  });

  afterEach(() => {
    clearCatalogCache();
    clearRuleCache();
  });

  const mockRuleHigh: RuleEntry = {
    id: 'es6-promise',
    name: 'Promise',
    astGrepRulePath: 'src/catalog/rules/promise.yml',
    webFeatureId: 'promise',
    bcdId: 'javascript.builtins.Promise',
    baselineStatus: 'high',
    baselineYear: 2015,
    modernSuggestion: 'Use native Promise',
    bundlers: ['webpack', 'rollup', 'esbuild', 'swc']
  };

  const mockRuleLow: RuleEntry = {
    id: 'es2024-object-groupby',
    name: 'Object.groupBy',
    astGrepRulePath: 'src/catalog/rules/object-groupby.yml',
    webFeatureId: 'object-group-by',
    bcdId: 'javascript.builtins.Object.groupBy',
    baselineStatus: 'low',
    baselineYear: 2024,
    modernSuggestion: 'Use native Object.groupBy',
    bundlers: ['webpack', 'rollup', 'esbuild', 'swc']
  };

  const mockRuleFalse: RuleEntry = {
    id: 'exp-feature',
    name: 'Experimental Feature',
    astGrepRulePath: 'src/catalog/rules/exp.yml',
    webFeatureId: 'exp-feature',
    bcdId: 'javascript.builtins.Exp',
    baselineStatus: 'false',
    baselineYear: null,
    modernSuggestion: 'Remove experimental shim',
    bundlers: ['webpack', 'rollup', 'esbuild', 'swc']
  };

  describe('computeBaselineStatus', () => {
    it('returns high when no rules are detected', () => {
      expect(computeBaselineStatus([])).toBe('high');
    });

    it('returns high when all rules have baselineStatus high', () => {
      expect(computeBaselineStatus([mockRuleHigh])).toBe('high');
    });

    it('returns low when at least one rule has low status and none are false', () => {
      expect(computeBaselineStatus([mockRuleHigh, mockRuleLow])).toBe('low');
    });

    it('returns false when any rule has false status, overriding low and high', () => {
      expect(computeBaselineStatus([mockRuleHigh, mockRuleLow, mockRuleFalse])).toBe('false');
    });
  });

  describe('inferBaselineYear', () => {
    it('returns null when no rules are detected', () => {
      expect(inferBaselineYear([])).toBeNull();
    });

    it('returns minimum baseline year among detected rules with numeric years', () => {
      expect(inferBaselineYear([mockRuleHigh, mockRuleLow])).toBe(2015);
    });

    it('ignores null baseline years and returns null if all are null', () => {
      expect(inferBaselineYear([mockRuleFalse])).toBeNull();
    });

    it('serializes cleanly in JSON without literal string undefined', () => {
      const year = inferBaselineYear([mockRuleFalse]);
      const json = JSON.stringify({ year });
      expect(json).not.toContain('undefined');
      expect(json).toBe('{"year":null}');
    });
  });

  describe('generateRecommendations', () => {
    it('generates optimal state recommendations when 0 polyfills are detected', () => {
      const { modernizationSuggestion, recommendations } = generateRecommendations([]);
      expect(modernizationSuggestion).toContain('Optimal state: 0 polyfills detected');
      expect(recommendations).toContain('No polyfill removal needed.');
    });

    it('generates actionable upgrade advice for legacy ES5/IE11 shims', () => {
      const { modernizationSuggestion, recommendations } = generateRecommendations([mockRuleHigh]);
      expect(modernizationSuggestion).toContain('Legacy IE11/ES5 polyfills detected');
      expect(recommendations[0]).toContain('Upgrade target environment to Baseline 2015');
      expect(recommendations.some(r => r.includes('Use native Promise'))).toBe(true);
    });

    it('generates removal advice for obsolete shims with high status (>2015)', () => {
      const obsoleteRule: RuleEntry = { ...mockRuleHigh, id: 'es2018-async', baselineYear: 2018 };
      const { modernizationSuggestion, recommendations } = generateRecommendations([obsoleteRule]);
      expect(modernizationSuggestion).toContain('Obsolete polyfills detected');
      expect(recommendations[0]).toContain('Remove obsolete polyfills');
    });

    it('generates general advice when low or false status shims exist', () => {
      const { modernizationSuggestion, recommendations } = generateRecommendations([mockRuleLow]);
      expect(modernizationSuggestion).toContain('Modern or experimental polyfills detected');
      expect(recommendations[0]).toContain('Review polyfills for low or unbaselined features.');
    });

    it('deduplicates and sorts suggestions deterministically', () => {
      const res1 = generateRecommendations([mockRuleLow, mockRuleHigh]);
      const res2 = generateRecommendations([mockRuleHigh, mockRuleLow]);
      expect(res1).toEqual(res2);
    });
  });

  describe('formatTableReport', () => {
    it('formats tabular output with headers and status summary', () => {
      const table = formatTableReport('test/path.js', [mockRuleHigh], 'high', 2015, 'Upgrade target', ['Upgrade target environment']);
      expect(table).toContain('=== Polyfill Analyzer Report ===');
      expect(table).toContain('test/path.js');
      expect(table).toContain('HIGH');
      expect(table).toContain('2015');
      expect(table).toContain('es6-promise');
      expect(table).toContain('Use native Promise');
    });

    it('formats clean message when 0 polyfills detected', () => {
      const table = formatTableReport('clean/path.js', [], 'high', null, 'Optimal state');
      expect(table).toContain('No polyfills detected');
    });
  });

  describe('evaluateBaselineTarget & subtractThirtyMonths', () => {
    it('correctly subtracts 30 months from a YYYY-MM-DD date string', () => {
      expect(subtractThirtyMonths('2026-01-04')).toBe('2023-07-04');
      expect(subtractThirtyMonths('2025-08-31')).toBe('2023-02-28');
      expect(subtractThirtyMonths('2024-06-15')).toBe('2021-12-15');
    });

    it('supports --target-year (features available by end of that calendar year)', () => {
      const rule2020 = { ...mockRuleHigh, id: 'promise-any', name: 'Promise.any', baselineYear: 2020, baselineLowDate: '2020-09-16' };
      const rule2024 = { ...mockRuleLow, id: 'promise-with-resolvers', name: 'Promise.withResolvers', baselineYear: 2024, baselineLowDate: '2024-03-05' };

      const eval2022 = evaluateBaselineTarget([rule2020, rule2024], { targetYear: 2022 });
      expect(eval2022.mode).toBe('target-year');
      expect(eval2022.featureCutoffDate).toBe('2022-12-31');
      expect(eval2022.supportedByTargetFeatures.map(r => r.id)).toEqual(['promise-any']);
      expect(eval2022.exceedingTargetFeatures.map(r => r.id)).toEqual(['promise-with-resolvers']);
      expect(eval2022.compatibleBrowsers.length).toBeGreaterThan(0);
      expect(eval2022.warnings.some(w => w.includes('Promise.withResolvers') && w.includes('exceeds --target-year 2022'))).toBe(true);
    });

    it('supports --widely-available-on-date (baseline_low_date <= date minus 30 months)', () => {
      const rule2022 = { ...mockRuleHigh, id: 'array-at', name: 'Array.prototype.at', baselineYear: 2022, baselineLowDate: '2022-03-14' };
      const rule2023 = { ...mockRuleHigh, id: 'array-change-by-copy', name: 'Array.prototype.toSorted', baselineYear: 2023, baselineLowDate: '2023-07-04' };

      // On 2025-01-01, -30 months is 2022-07-01 -> array-at (2022-03-14) is supported, array-change-by-copy (2023-07-04) exceeds
      const evalDate = evaluateBaselineTarget([rule2022, rule2023], { widelyAvailableOnDate: '2025-01-01' });
      expect(evalDate.mode).toBe('widely-available-on-date');
      expect(evalDate.featureCutoffDate).toBe('2022-07-01');
      expect(evalDate.supportedByTargetFeatures.map(r => r.id)).toEqual(['array-at']);
      expect(evalDate.exceedingTargetFeatures.map(r => r.id)).toEqual(['array-change-by-copy']);
      expect(evalDate.warnings.some(w => w.includes('Array.prototype.toSorted') && w.includes('was not yet Widely available on 2025-01-01'))).toBe(true);
    });

    it('rejects specifying both --target-year and --widely-available-on-date simultaneously', () => {
      expect(() =>
        evaluateBaselineTarget([], { targetYear: 2022, widelyAvailableOnDate: '2025-01-01' })
      ).toThrow(/Cannot use --target-year and --widely-available-on-date together/);
    });
  });
});
