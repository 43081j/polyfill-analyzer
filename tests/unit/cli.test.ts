import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { runCli } from '../../src/cli/index.js';
import { clearRuleCache } from '../../src/engine/index.js';
import { clearCatalogCache } from '../../src/catalog/index.js';

describe('CLI Unit Tests', () => {
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
  const modernBundlePath = path.resolve(process.cwd(), 'dist/bundles/esbuild/es2020_modern.js');

  it('executes successfully against valid bundle with default arguments and outputs table format', () => {
    expect(() => runCli([validBundlePath])).not.toThrow();
    expect(logSpy).toHaveBeenCalled();
    const logOutput = logSpy.mock.calls.map(c => c.join(' ')).join('\n');
    expect(logOutput).toContain('Polyfill Analyzer Report');
    expect(logOutput).toContain('Polyfills Found:');
  });

  it('outputs valid JSON schema when --json flag is provided', () => {
    expect(() => runCli([validBundlePath, '--json'])).not.toThrow();
    expect(logSpy).toHaveBeenCalled();
    const jsonStr = logSpy.mock.calls[0][0];
    const data = JSON.parse(jsonStr);
    expect(data).toHaveProperty('bundlePath');
    expect(data).toHaveProperty('detectedFeatures');
    expect(data).toHaveProperty('detectedPolyfills');
    expect(data).toHaveProperty('inferredBaseline');
    expect(data.inferredBaseline).toHaveProperty('status');
    expect(data.inferredBaseline).toHaveProperty('year');
    expect(data.inferredBaseline).toHaveProperty('suggestion');
  });

  it('outputs table report when --format table is provided', () => {
    expect(() => runCli([validBundlePath, '--format', 'table'])).not.toThrow();
    const logOutput = logSpy.mock.calls.map(c => c.join(' ')).join('\n');
    expect(logOutput).toContain('=== Polyfill Analyzer Report ===');
  });

  it('handles conflicting flags (--json and --format table) deterministically without crashing', () => {
    expect(() => runCli([validBundlePath, '--json', '--format', 'table'])).not.toThrow();
    expect(logSpy).toHaveBeenCalled();
    const jsonStr = logSpy.mock.calls[0][0];
    expect(() => JSON.parse(jsonStr)).not.toThrow();
  });

  it('reports 0 matches on empty bundle file', () => {
    const tempDir = path.resolve(process.cwd(), '.agents/temp_test_fixtures');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    const emptyFile = path.join(tempDir, 'empty_test.js');
    fs.writeFileSync(emptyFile, '', 'utf8');

    expect(() => runCli([emptyFile, '--json'])).not.toThrow();
    const data = JSON.parse(logSpy.mock.calls[0][0]);
    expect(data.detectedFeatures).toHaveLength(0);
    expect(data.inferredBaseline.status).toBe('high');
    expect(data.inferredBaseline.year).toBeNull();
  });

  it('exits non-zero when target file does not exist', () => {
    expect(() => runCli(['non_existent_file_123.js', '--json'])).toThrow('EXIT_1');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('File not found'));
  });

  it('exits non-zero when target path is a directory', () => {
    expect(() => runCli(['dist', '--json'])).toThrow('EXIT_1');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Expected file path, found directory'));
  });

  it('exits non-zero and prints usage when invoked with no arguments', () => {
    expect(() => runCli([])).toThrow('EXIT_1');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Usage: polyfill-analyzer'));
  });

  it('exits non-zero when an unknown argument flag is passed', () => {
    expect(() => runCli([validBundlePath, '--unknown-flag'])).toThrow('EXIT_1');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Fatal error:'), expect.any(String));
  });

  it('exits non-zero when malformed catalog option is provided', () => {
    expect(() => runCli([validBundlePath, '--catalog=/invalid/path/rules.json'])).toThrow('EXIT_1');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Error in catalog validation'), expect.any(String));
  });

  it('exits non-zero when unsupported format value is provided', () => {
    expect(() => runCli([validBundlePath, '--format', 'xml'])).toThrow('EXIT_1');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Unsupported format value'));
  });
});
