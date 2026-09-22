import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  computeBaselineStatus,
  inferBaselineYear,
  generateRecommendations,
  formatTableReport,
  clearRuleCache,
  RuleEntry
} from '../../src/engine/index.js';
import { clearCatalogCache } from '../../src/catalog/index.js';

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
});
