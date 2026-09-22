import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { scan, scanFile, parseYamlRule, formatTableReport, clearRuleCache } from '../../src/engine/index.js';
import { clearCatalogCache, RuleEntry } from '../../src/catalog/index.js';

describe('Adversarial Test Suite: R2 Engine & Inference Edge Cases (Phase 4)', () => {
  let tmpDir: string;

  beforeEach(() => {
    clearCatalogCache();
    clearRuleCache();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'adv-engine-'));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    clearCatalogCache();
    clearRuleCache();
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('adv_parse_yaml_empty_or_invalid: parseYamlRule throws on empty or null YAML syntax', () => {
    expect(() => parseYamlRule('')).toThrow('Invalid YAML syntax or empty pattern list in rule definition');
    expect(() => parseYamlRule('   \n  ')).toThrow('Invalid YAML syntax or empty pattern list in rule definition');
  });

  it('adv_scan_empty_catalog_warns: scan() warns when catalog has 0 rules', () => {
    const emptyCatPath = path.join(tmpDir, 'empty_cat.json');
    fs.writeFileSync(emptyCatPath, JSON.stringify({ rules: [] }), 'utf8');

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const detected = scan('const x = 1;', emptyCatPath);
    expect(detected).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith('Warning: Catalog contains 0 rules or is empty.');
  });

  it('adv_scan_missing_ast_grep_rule_path: scan() gracefully skips catalog rules whose yaml files do not exist', () => {
    const missingRuleCatPath = path.join(tmpDir, 'missing_rule_cat.json');
    const rule: RuleEntry = {
      id: 'ghost-rule',
      name: 'Ghost Rule',
      astGrepRulePath: 'src/catalog/rules/non-existent-ghost-rule.yaml',
      webFeatureId: 'ghost-feature',
      bcdId: 'javascript.builtins.Ghost',
      baselineStatus: 'low',
      baselineYear: 2024,
      modernSuggestion: 'Remove ghost',
      bundlers: ['webpack', 'rollup', 'esbuild', 'swc']
    };
    fs.writeFileSync(missingRuleCatPath, JSON.stringify({ rules: [rule] }), 'utf8');

    const detected = scan('const x = 1;', missingRuleCatPath);
    expect(detected).toEqual([]);
  });

  it('adv_scan_file_not_found_and_directory: scanFile() directly throws on missing files or directories', () => {
    expect(() => scanFile(path.join(tmpDir, 'missing_file.js'))).toThrow('File not found:');
    expect(() => scanFile(tmpDir)).toThrow('Expected file path, found directory:');
  });

  it('adv_format_table_report_false_status_and_null_year: formatTableReport() exercises false status styling and null baselineYear row formatting', () => {
    const ruleFalseNull: RuleEntry = {
      id: 'unbaselined-feature',
      name: 'Unbaselined Feature',
      astGrepRulePath: 'src/catalog/rules/unbaselined.yaml',
      webFeatureId: 'unbaselined-feature',
      bcdId: 'javascript.builtins.Unbaselined',
      baselineStatus: 'false',
      baselineYear: null,
      modernSuggestion: 'Avoid unbaselined feature',
      bundlers: ['webpack', 'rollup', 'esbuild', 'swc']
    };

    const table = formatTableReport(
      'src/sample.js',
      [ruleFalseNull],
      'false',
      null,
      'Avoid unbaselined features',
      ['Recommendation 1']
    );

    expect(table).toContain('FALSE');
    expect(table).toContain('N/A');
    expect(table).toContain('-'); // row null year formatted as '-'
    expect(table).toContain('unbaselined-feature');
  });
});
