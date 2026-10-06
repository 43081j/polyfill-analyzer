import { describe, it, expect } from 'vitest';
import { RuleEntrySchema } from 'polyfill-patterns';

describe('RuleSchema Bundlers Attribution Validation', () => {
  const validBaseRule = {
    id: 'test-rule',
    name: 'Test Rule',
    astGrepRulePath: 'src/catalog/rules/test.yaml',
    webFeatureId: 'test-feature',
    bcdId: 'javascript.builtins.Test',
    baselineStatus: 'high' as const,
    baselineYear: 2020,
    modernSuggestion: 'Use native feature',
    bundlers: ['webpack', 'rollup', 'esbuild', 'swc']
  };

  it('valid array pass: accepts valid bundlers array with known enum values', () => {
    const res = RuleEntrySchema.safeParse(validBaseRule);
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.bundlers).toEqual(['webpack', 'rollup', 'esbuild', 'swc']);
    }
  });

  it('missing property fail: rejects rule entry when bundlers property is omitted', () => {
    const { bundlers, ...missingBundlersRule } = validBaseRule;
    const res = RuleEntrySchema.safeParse(missingBundlersRule);
    expect(res.success).toBe(false);
  });

  it('non-array fail: rejects rule entry when bundlers is not an array', () => {
    const res = RuleEntrySchema.safeParse({
      ...validBaseRule,
      bundlers: 'webpack'
    });
    expect(res.success).toBe(false);
  });

  it('empty array fail: rejects rule entry when bundlers array is empty', () => {
    const res = RuleEntrySchema.safeParse({
      ...validBaseRule,
      bundlers: []
    });
    expect(res.success).toBe(false);
  });

  it('invalid element fail: rejects rule entry when bundlers array contains unrecognized strings or non-strings', () => {
    const resString = RuleEntrySchema.safeParse({
      ...validBaseRule,
      bundlers: ['webpack', 'vite', 'parcel']
    });
    expect(resString.success).toBe(false);

    const resNumber = RuleEntrySchema.safeParse({
      ...validBaseRule,
      bundlers: ['webpack', 123]
    });
    expect(resNumber.success).toBe(false);
  });
});
