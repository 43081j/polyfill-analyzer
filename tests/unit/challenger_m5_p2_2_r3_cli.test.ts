import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { runCli } from '../../src/cli/index.js';
import { clearRuleCache } from '../../src/engine/index.js';
import { clearCatalogCache } from 'polyfill-patterns';

describe('Adversarial Test Suite - Challenger M5 P2 (R3 CLI & E2E Coverage Hardening)', () => {
  let exitSpy: any;
  let logSpy: any;
  let errorSpy: any;
  let warnSpy: any;

  beforeEach(() => {
    clearCatalogCache();
    clearRuleCache();
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(((code?: number) => {
      throw new Error(`EXIT_${code ?? 0}`);
    }) as any);
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    clearCatalogCache();
    clearRuleCache();
  });

  const validBundlePath = path.resolve(process.cwd(), 'dist/bundles/rollup/es2015_ie11.js');
  const tempDir = path.resolve(process.cwd(), '.agents/challenger_m5_p2_2/temp_test_fixtures');

  beforeEach(() => {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
  });

  describe('1. CLI Short Flags Coverage (-j, -f, -c, -h)', () => {
    it('adv_cli_short_flag_j: executes with -j short flag and produces valid JSON output', () => {
      expect(() => runCli([validBundlePath, '-j'])).not.toThrow();
      expect(logSpy).toHaveBeenCalled();
      const jsonStr = logSpy.mock.calls[0][0];
      const data = JSON.parse(jsonStr);
      expect(data).toHaveProperty('detectedFeatures');
      expect(data).toHaveProperty('inferredBaseline');
    });

    it('adv_cli_short_flag_f_table: executes with -f table short flag and produces tabular summary', () => {
      expect(() => runCli([validBundlePath, '-f', 'table'])).not.toThrow();
      expect(logSpy).toHaveBeenCalled();
      const logOutput = logSpy.mock.calls.map((c: any) => c.join(' ')).join('\n');
      expect(logOutput).toContain('=== Polyfill Analyzer Report ===');
    });

    it('adv_cli_short_flag_f_json: executes with -f json short flag and produces valid JSON output', () => {
      expect(() => runCli([validBundlePath, '-f', 'json'])).not.toThrow();
      expect(logSpy).toHaveBeenCalled();
      const jsonStr = logSpy.mock.calls[0][0];
      const data = JSON.parse(jsonStr);
      expect(data).toHaveProperty('detectedFeatures');
    });

    it('adv_cli_short_flag_c: executes with -c short flag pointing to valid catalog', () => {
      const catalogPath = path.resolve(process.cwd(), 'src/catalog/rules.json');
      expect(() => runCli([validBundlePath, '-c', catalogPath, '-j'])).not.toThrow();
      const data = JSON.parse(logSpy.mock.calls[0][0]);
      expect(data).toHaveProperty('detectedFeatures');
    });

    it('adv_cli_help_flags: verifies --help and -h behavior with and without positional file arguments', () => {
      // With no positionals, --help logs usage and exits with 1
      expect(() => runCli(['--help'])).toThrow('EXIT_1');
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Usage: polyfill-analyzer'));

      logSpy.mockClear();
      expect(() => runCli(['-h'])).toThrow('EXIT_1');
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Usage: polyfill-analyzer'));

      logSpy.mockClear();
      // With positional file, --help returns cleanly without calling process.exit
      expect(() => runCli([validBundlePath, '--help'])).not.toThrow();
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Usage: polyfill-analyzer'));
    });
  });

  describe('2. Catalog Corner Cases & Error Branches', () => {
    it('adv_cli_empty_catalog_rules: exits non-zero and warns when catalog has 0 rules', () => {
      const emptyCatPath = path.join(tempDir, 'empty_catalog.json');
      fs.writeFileSync(emptyCatPath, JSON.stringify({ rules: [] }), 'utf8');

      expect(() => runCli([validBundlePath, '--catalog', emptyCatPath])).toThrow('EXIT_1');
      expect(warnSpy).toHaveBeenCalledWith('Warning: catalog has 0 rules');
      expect(errorSpy).toHaveBeenCalledWith('Error: Empty catalog rule definition');
    });

    it('adv_cli_missing_yaml_rule_path: handles catalog with rule referencing non-existent YAML file on disk without crashing', () => {
      const missingYamlCatPath = path.join(tempDir, 'missing_yaml_catalog.json');
      fs.writeFileSync(missingYamlCatPath, JSON.stringify({
        rules: [
          {
            id: "missing-rule",
            name: "Missing Rule",
            astGrepRulePath: "src/catalog/rules/non_existent_rule_file_12345.yml",
            webFeatureId: "missing-feature",
            bcdId: "javascript.builtins.Missing",
            baselineStatus: "low",
            baselineYear: 2024,
            modernSuggestion: "None",
            bundlers: ["webpack", "rollup", "esbuild", "swc"]
          }
        ]
      }), 'utf8');

      expect(() => runCli([validBundlePath, '-c', missingYamlCatPath, '-j'])).not.toThrow();
      const data = JSON.parse(logSpy.mock.calls[0][0]);
      expect(data.detectedFeatures).toHaveLength(0);
    });
  });

  describe('3. Scan File Error Handling & Syntax Corruption', () => {
    it('adv_cli_scan_syntax_error: exits non-zero and logs error when scanned JavaScript code has syntax error', () => {
      const badSyntaxFile = path.join(tempDir, 'bad_syntax.js');
      fs.writeFileSync(badSyntaxFile, 'function invalidSyntax( { console.log("missing paren");', 'utf8');

      expect(() => runCli([badSyntaxFile, '-j'])).toThrow('EXIT_1');
      expect(errorSpy).toHaveBeenCalledWith('Error scanning file:', expect.stringContaining('Syntax error'));
    });
  });

  describe('4. Formatting & Inference Edge Cases in Table Report', () => {
    it('adv_table_format_unbaselined_null_year: correctly formats table report when baselineYear is null (unbaselined/false)', () => {
      const unbaselinedFile = path.join(tempDir, 'unbaselined_shim.js');
      fs.writeFileSync(unbaselinedFile, 'var _custom_unbaselined_shim = true;', 'utf8');

      // Create a mock catalog with a rule whose baselineYear is null
      const nullYearCatPath = path.join(tempDir, 'null_year_catalog.json');
      const nullYearRuleYaml = path.join(tempDir, 'null_year_rule.yml');
      fs.writeFileSync(nullYearRuleYaml, 'id: test-null-year\nrule:\n  pattern: var _custom_unbaselined_shim = true;\n', 'utf8');
      fs.writeFileSync(nullYearCatPath, JSON.stringify({
        rules: [
          {
            id: "test-null-year",
            name: "Test Null Year",
            astGrepRulePath: path.relative(process.cwd(), nullYearRuleYaml),
            webFeatureId: "test-null",
            bcdId: "javascript.builtins.Test",
            baselineStatus: "false",
            baselineYear: null,
            modernSuggestion: "Remove unbaselined shim",
            bundlers: ["webpack", "rollup", "esbuild", "swc"]
          }
        ]
      }), 'utf8');

      expect(() => runCli([unbaselinedFile, '-c', nullYearCatPath, '-f', 'table'])).not.toThrow();
      const logOutput = logSpy.mock.calls.map((c: any) => c.join(' ')).join('\n');
      expect(logOutput).toContain('Baseline Year:    N/A');
      expect(logOutput).toContain('FALSE');
      expect(logOutput).toContain('-'); // Table row cell for null year formatted as '-'
    });

    it('adv_inference_low_baseline_recommendations: verifies recommendation generation for low baseline status polyfills', () => {
      const lowFile = path.join(tempDir, 'low_shim.js');
      fs.writeFileSync(lowFile, 'var _low_shim = true;', 'utf8');

      const lowCatPath = path.join(tempDir, 'low_catalog.json');
      const lowRuleYaml = path.join(tempDir, 'low_rule.yml');
      fs.writeFileSync(lowRuleYaml, 'id: test-low\nrule:\n  pattern: var _low_shim = true;\n', 'utf8');
      fs.writeFileSync(lowCatPath, JSON.stringify({
        rules: [
          {
            id: "test-low",
            name: "Test Low",
            astGrepRulePath: path.relative(process.cwd(), lowRuleYaml),
            webFeatureId: "test-low",
            bcdId: "javascript.builtins.TestLow",
            baselineStatus: "low",
            baselineYear: 2024,
            modernSuggestion: "Retain shim for now",
            bundlers: ["webpack", "rollup", "esbuild", "swc"]
          }
        ]
      }), 'utf8');

      expect(() => runCli([lowFile, '-c', lowCatPath, '-j'])).not.toThrow();
      const data = JSON.parse(logSpy.mock.calls[0][0]);
      expect(data.inferredBaseline.status).toBe('low');
      expect(data.inferredBaseline.suggestion).toContain('Modern or experimental polyfills detected');
      expect(data.inferredBaseline.recommendations[0]).toContain('Review polyfills for low or unbaselined features.');
    });
  });

  describe('5. Cross-Module Pairwise Flag Interactions', () => {
    it('adv_pairwise_short_flags_conflicts: handles short flag format conflict (-j -f table) deterministically', () => {
      expect(() => runCli([validBundlePath, '-j', '-f', 'table'])).not.toThrow();
      expect(logSpy).toHaveBeenCalled();
      const jsonStr = logSpy.mock.calls[0][0];
      expect(() => JSON.parse(jsonStr)).not.toThrow();
    });

    it('adv_pairwise_short_c_and_f: combines -c catalog and -f table cleanly', () => {
      const catalogPath = path.resolve(process.cwd(), 'src/catalog/rules.json');
      expect(() => runCli([validBundlePath, '-c', catalogPath, '-f', 'table'])).not.toThrow();
      const logOutput = logSpy.mock.calls.map((c: any) => c.join(' ')).join('\n');
      expect(logOutput).toContain('=== Polyfill Analyzer Report ===');
    });
  });
});
