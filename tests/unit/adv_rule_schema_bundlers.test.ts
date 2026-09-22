import { describe, it, expect } from 'vitest';
import { RuleEntrySchema, loadCatalog, clearCatalogCache } from '../../src/catalog/index.js';
import { generateRecommendations, formatTableReport } from '../../src/engine/index.js';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

describe('Adversarial RuleSchema Bundlers Attribution Audit (adv_rule_schema_bundlers)', () => {
  const validBaseRule = {
    id: 'adv-test-rule',
    name: 'Adv Test Rule',
    astGrepRulePath: 'src/catalog/rules/test.yaml',
    webFeatureId: 'adv-feature',
    bcdId: 'javascript.builtins.Adv',
    baselineStatus: 'high' as const,
    baselineYear: 2020,
    modernSuggestion: 'Use native feature',
    bundlers: ['webpack', 'rollup', 'esbuild', 'swc'] as const
  };

  describe('Zod Schema Edge Case Validation', () => {
    it('rejects explicit null as bundlers property', () => {
      const res = RuleEntrySchema.safeParse({
        ...validBaseRule,
        bundlers: null
      });
      expect(res.success).toBe(false);
    });

    it('rejects boolean or object as bundlers property', () => {
      const resBool = RuleEntrySchema.safeParse({
        ...validBaseRule,
        bundlers: true
      });
      expect(resBool.success).toBe(false);

      const resObj = RuleEntrySchema.safeParse({
        ...validBaseRule,
        bundlers: { webpack: true }
      });
      expect(resObj.success).toBe(false);
    });

    it('handles duplicate bundler names in array (currently allowed by Zod array schema without unique constraint)', () => {
      const res = RuleEntrySchema.safeParse({
        ...validBaseRule,
        bundlers: ['webpack', 'webpack', 'rollup']
      });
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.bundlers).toEqual(['webpack', 'webpack', 'rollup']);
      }
    });

    it('rejects mixed valid and invalid enum elements', () => {
      const res = RuleEntrySchema.safeParse({
        ...validBaseRule,
        bundlers: ['webpack', 'vite', 'swc']
      });
      expect(res.success).toBe(false);
    });
  });

  describe('CLI and Catalog Loading with Invalid Bundlers', () => {
    const tmpDir = path.resolve(process.cwd(), 'tests/fixtures/adv_tmp');
    const cliPath = path.resolve(process.cwd(), 'bin/analyze.js');
    const samplePath = path.resolve(process.cwd(), 'es2015.js');

    it('loadCatalog throws validation error when catalog rule has null bundlers', () => {
      fs.mkdirSync(tmpDir, { recursive: true });
      const badCatPath = path.join(tmpDir, 'null_bundlers.json');
      fs.writeFileSync(badCatPath, JSON.stringify({
        rules: [{ ...validBaseRule, bundlers: null }]
      }));
      clearCatalogCache();
      expect(() => loadCatalog(badCatPath)).toThrow();
    });

    it('loadCatalog throws validation error when catalog rule has unknown bundler string', () => {
      fs.mkdirSync(tmpDir, { recursive: true });
      const badCatPath = path.join(tmpDir, 'unknown_bundlers.json');
      fs.writeFileSync(badCatPath, JSON.stringify({
        rules: [{ ...validBaseRule, bundlers: ['webpack', 'parcel'] }]
      }));
      clearCatalogCache();
      expect(() => loadCatalog(badCatPath)).toThrow();
    });

    it('CLI exits with status 1 and error message when using catalog with invalid bundler strings', () => {
      fs.mkdirSync(tmpDir, { recursive: true });
      const badCatPath = path.join(tmpDir, 'cli_unknown_bundlers.json');
      fs.writeFileSync(badCatPath, JSON.stringify({
        rules: [{ ...validBaseRule, bundlers: ['vite', 'turbopack'] }]
      }));
      const res = spawnSync('node', [cliPath, samplePath, '--catalog', badCatPath], { encoding: 'utf8' });
      expect(res.status).not.toBe(0);
      expect((res.stderr + res.stdout).toLowerCase()).toContain('error');
    });
  });

  describe('Inference and Report Formatting for Bundler Subsets', () => {
    it('generateRecommendations formats bundler attribution accurately for single bundler and subset arrays', () => {
      const singleRule = { ...validBaseRule, id: 'rule-single', bundlers: ['esbuild'] as any };
      const subsetRule = { ...validBaseRule, id: 'rule-subset', bundlers: ['webpack', 'rollup'] as any };

      const { recommendations } = generateRecommendations([singleRule, subsetRule]);
      expect(recommendations.some(r => r.includes('Inferred: [esbuild] polyfilled'))).toBe(true);
      expect(recommendations.some(r => r.includes('Inferred: [webpack, rollup] polyfilled'))).toBe(true);
    });

    it('formatTableReport renders exact bundlers brackets in table rows for subset arrays', () => {
      const subsetRule = { ...validBaseRule, id: 'rule-table-test', bundlers: ['rollup', 'swc'] as any };
      const tableReport = formatTableReport('test/file.js', [subsetRule], 'high', 2020, 'Use native');
      expect(tableReport).toContain('[rollup, swc]');
    });
  });
});
