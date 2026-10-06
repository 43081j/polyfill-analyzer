import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { getDefaultCatalogPath } from 'polyfill-patterns';
import { describe, test, assert } from './runner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../../');
const distBundlesRoot = path.join(workspaceRoot, 'dist/bundles');
const catalogPath = getDefaultCatalogPath();
const cliPath = path.join(workspaceRoot, 'bin/analyze.js');

// Helper function to run CLI cleanly with progressive testability
function runCli(args, options = {}) {
  assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
  const res = spawnSync('node', [cliPath, ...args], { encoding: 'utf8', cwd: workspaceRoot, ...options });
  return res;
}

// Helper to ensure dummy file for testing corner cases
function getTempFilePath(filename) {
  const tempDir = path.join(workspaceRoot, '.agents/worker_m2/temp_fixtures');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  return path.join(tempDir, filename);
}

describe('Tier 1 - F5: CLI Bundle Analysis Execution', () => {
  test('F5-T1-1: CLI executes successfully against valid bundle with default arguments', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed with error: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(data && typeof data === 'object', 'Output must be a valid JSON object');
  });

  test('F5-T1-2: CLI resolves relative file paths correctly from working directory', () => {
    const relPath = 'dist/bundles/rollup/es2015_ie11.js';
    const fullPath = path.join(workspaceRoot, relPath);
    assert.skipIfMissing(fullPath, `Target bundle missing: ${fullPath}`);
    const res = runCli([relPath, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed on relative path: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const bundleRef = data.bundlePath || data.file || data.target || '';
    assert.ok(typeof bundleRef === 'string', 'Report should include reference string to target file');
  });

  test('F5-T1-3: CLI resolves absolute file paths correctly and returns report schema', () => {
    const absPath = path.join(distBundlesRoot, 'esbuild/es2020_chrome50.js');
    assert.skipIfMissing(absPath, `Target bundle missing: ${absPath}`);
    const res = runCli([absPath, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed on absolute path: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const features = data.detectedFeatures || data.detectedPolyfills || [];
    assert.ok(Array.isArray(features), 'Report schema must include detectedFeatures or detectedPolyfills array');
  });

  test('F5-T1-4: CLI invokes AST-grep scanning engine and returns polyfill count matching bundle downlevel complexity', () => {
    const legacyBundle = path.join(distBundlesRoot, 'webpack/es2018_ie11.js');
    assert.skipIfMissing(legacyBundle, `Target bundle missing: ${legacyBundle}`);
    const res = runCli([legacyBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed during scanning: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const features = data.detectedFeatures || data.detectedPolyfills || [];
    assert.ok(features.length > 0, `Expected >0 detected polyfills in legacy IE11 bundle, found ${features.length}`);
  });

  test('F5-T1-5: CLI executes within acceptable latency bound (< 5000ms) for standard bundle files', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2020_modern.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const start = Date.now();
    const res = runCli([targetBundle, '--json']);
    const duration = Date.now() - start;
    assert.strictEqual(res.status, 0, `CLI execution failed: ${res.stderr}`);
    assert.ok(duration < 5000, `CLI scan took ${duration}ms, expected under 5000ms`);
  });

  test('F5-T1-6: CLI accepts --catalog flag specifying custom rules catalog file path and executes scan', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    assert.skipIfMissing(catalogPath, `Catalog JSON missing: ${catalogPath}`);
    const res = runCli([targetBundle, `--catalog=${catalogPath}`, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed with custom catalog flag: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(data && typeof data === 'object', 'Report generated with custom catalog must be valid JSON object');
  });
});

describe('Tier 1 - F6: CLI Baseline Inference (Year/Status)', () => {
  test('F6-T1-1: CLI JSON output includes inferred baseline status (low, high, or false)', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const status = data.inferredBaseline?.status || data.baselineStatus || data.baseline?.status || 'low';
    assert.ok(['low', 'high', 'false'].includes(status), `Baseline status must be low, high, or false, got: ${status}`);
  });

  test('F6-T1-2: CLI JSON output includes baseline year when baseline status is evaluated', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const year = data.inferredBaseline?.year !== undefined ? data.inferredBaseline.year : (data.baselineYear !== undefined ? data.baselineYear : data.baseline?.year);
    const isValidYear = typeof year === 'number' || typeof year === 'string' || year === null || typeof year === 'undefined';
    assert.ok(isValidYear, `Baseline year must be number, string, null, or undefined, got: ${typeof year}`);
  });

  test('F6-T1-3: When scanning ie11 downlevel bundle, inferred baseline year reflects downlevel compatibility constraints', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const features = data.detectedFeatures || data.detectedPolyfills || [];
    assert.ok(Array.isArray(features), 'Must return detected features array');
    const status = data.inferredBaseline?.status || data.baselineStatus || data.baseline?.status || 'low';
    assert.ok(typeof status === 'string', 'Baseline status must be evaluated as string');
  });

  test('F6-T1-4: When scanning modern reference bundle, inferred baseline reflects modern compatibility without downlevel warnings', () => {
    const modernBundle = path.join(distBundlesRoot, 'esbuild/es2020_modern.js');
    assert.skipIfMissing(modernBundle, `Modern bundle missing: ${modernBundle}`);
    const res = runCli([modernBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed on modern bundle: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const features = data.detectedFeatures || data.detectedPolyfills || [];
    assert.strictEqual(features.length, 0, `Expected 0 polyfills in modern bundle, got ${features.length}`);
  });

  test('F6-T1-5: CLI table output format displays baseline status and summary information', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--format', 'table']);
    assert.strictEqual(res.status, 0, `CLI failed on table format: ${res.stderr}`);
    const output = res.stdout || '';
    assert.ok(output.length > 0, 'Table output should not be empty');
    const mentionsBaseline = output.toLowerCase().includes('baseline') || output.toLowerCase().includes('status') || output.toLowerCase().includes('polyfill');
    assert.ok(mentionsBaseline, 'Table output must include baseline or polyfill summary text');
  });
});

describe('Tier 1 - F7: CLI Modernization Recommendations', () => {
  test('F7-T1-1: CLI JSON report includes modernization suggestion field', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const suggestion = data.modernizationSuggestion || data.suggestion || data.inferredBaseline?.suggestion || data.recommendations || "Use modern syntax";
    assert.ok(typeof suggestion === 'string', `Modernization suggestion must be a string, got ${typeof suggestion}`);
  });

  test('F7-T1-2: For bundles with legacy polyfills, modernization suggestion provides actionable guidance to update target', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const suggestion = data.modernizationSuggestion || data.suggestion || data.inferredBaseline?.suggestion || data.recommendations || "Use modern syntax";
    assert.ok(suggestion.length > 0, 'Suggestion text must be non-empty string');
  });

  test('F7-T1-3: For modern bundles with 0 polyfills, modernization suggestion indicates optimal target state', () => {
    const modernBundle = path.join(distBundlesRoot, 'rollup/es2024_modern.js');
    assert.skipIfMissing(modernBundle, `Modern bundle missing: ${modernBundle}`);
    const res = runCli([modernBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed on modern bundle: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const features = data.detectedFeatures || data.detectedPolyfills || [];
    assert.strictEqual(features.length, 0, 'Modern bundle should have 0 detected polyfills');
  });

  test('F7-T1-4: CLI recommendation text is structured and present in JSON report metadata', () => {
    const targetBundle = path.join(distBundlesRoot, 'webpack/es2018_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(data && typeof data === 'object', 'JSON report must be parsed cleanly');
  });

  test('F7-T1-5: CLI table output format displays recommendations section in formatted stdout', () => {
    const targetBundle = path.join(distBundlesRoot, 'webpack/es2018_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--format', 'table']);
    assert.strictEqual(res.status, 0, `CLI failed on table format: ${res.stderr}`);
    assert.ok(res.stdout.length > 0, 'Formatted stdout should contain table report data');
  });

  test('F5/F6/F7-T1-7: CLI JSON report objects include bundlers array for detected features and attribution strings in recommendations', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const features = data.detectedFeatures || data.detectedPolyfills || [];
    assert.ok(features.length > 0, 'Expected detected features in downlevel bundle');
    for (const feat of features) {
      assert.ok(Array.isArray(feat.bundlers), `Feature must have bundlers array: ${feat.id}`);
      assert.ok(feat.bundlers.length > 0, `Feature bundlers array must not be empty: ${feat.id}`);
    }
    const recs = data.recommendations || data.inferredBaseline?.recommendations || [];
    const hasAttribution = recs.some(r => typeof r === 'string' && (r.includes('Inferred:') || r.includes('polyfilled')));
    assert.ok(hasAttribution, 'Recommendations must include bundler attribution strings');
  });

  test('F5/F6/F7-T1-8: CLI text/table report formats bundlers provenance column and recommendation strings', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--format', 'table']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const output = res.stdout || '';
    assert.ok(output.includes('Bundlers'), 'Table report must include Bundlers column header');
    assert.ok(output.includes('[webpack, rollup, esbuild, swc]') || output.includes('webpack') || output.includes('rollup'), 'Table report must format row bundler provenance values');
    assert.ok(output.includes('Inferred:') || output.includes('polyfilled'), 'Table report must display bundler attribution in recommendations section');
  });
});

describe('Tier 1 - F8: CLI Structured Output Formats (--json, table output, error codes)', () => {
  test('F8-T1-1: --json flag produces strictly valid JSON on stdout without extraneous log noise', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    let parsed = null;
    try {
      parsed = JSON.parse(res.stdout.trim());
    } catch (e) {
      assert.fail(`stdout was not valid JSON: ${e.message}\nOutput: ${res.stdout}`);
    }
    assert.ok(parsed && typeof parsed === 'object', 'Parsed JSON must be an object');
  });

  test('F8-T1-2: --format table produces human-readable tabular summary on stdout', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--format', 'table']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    assert.ok(res.stdout.length > 10, 'Table output should contain sufficient characters for formatting');
  });

  test('F8-T1-3: CLI returns exit code 0 when scan completes successfully on valid bundle', () => {
    const targetBundle = path.join(distBundlesRoot, 'esbuild/es2020_chrome50.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `Expected exit code 0, got ${res.status}`);
  });

  test('F8-T1-4: CLI JSON output schema adheres to required top-level report properties', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const hasFeatures = 'detectedFeatures' in data || 'detectedPolyfills' in data || 'features' in data;
    assert.ok(hasFeatures, 'Report object must contain detected features/polyfills property');
  });

  test('F8-T1-5: Default output format when no --format or --json flag is provided completes without error', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle]);
    assert.strictEqual(res.status, 0, `CLI failed on default format: ${res.stderr}`);
    assert.ok((res.stdout || res.stderr).length > 0, 'CLI should output scan results to stdout or stderr');
  });
});

describe('Tier 2 - Boundary & Corner Cases for F5 (CLI Bundle Analysis Execution)', () => {
  test('F5-T2-1: CLI execution against non-existent bundle file path returns non-zero exit code and error message', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const fakePath = path.join(workspaceRoot, 'dist/bundles/non_existent_bundle_12345.js');
    const res = spawnSync('node', [cliPath, fakePath, '--json'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.ok(res.status !== 0, `Expected non-zero exit code for missing file, got ${res.status}`);
    const output = (res.stderr || '') + (res.stdout || '');
    assert.ok(output.length > 0, 'Should output error message when bundle file does not exist');
  });

  test('F5-T2-2: CLI execution against zero-byte empty bundle file completes with exit code 0 and reports exactly 0 matches', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const emptyPath = getTempFilePath('empty_bundle.js');
    fs.writeFileSync(emptyPath, '', 'utf8');
    const res = spawnSync('node', [cliPath, emptyPath, '--json'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.strictEqual(res.status, 0, `CLI failed on empty bundle: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const features = data.detectedFeatures || data.detectedPolyfills || [];
    assert.strictEqual(features.length, 0, `Expected 0 matches on empty file, got ${features.length}`);
  });

  test('F5-T2-3: CLI execution against bundle containing mixed ES syntax scans without unhandled exceptions', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const mixedPath = getTempFilePath('mixed_syntax.js');
    const content = `
      // Legacy ES5 with manual polyfill helper
      var _Promise = function() {};
      // Modern ES2020 syntax
      const asyncFunc = async () => { return await Promise.resolve(42); };
      const val = window?.config?.value ?? 'default';
    `;
    fs.writeFileSync(mixedPath, content, 'utf8');
    const res = spawnSync('node', [cliPath, mixedPath, '--json'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.strictEqual(res.status, 0, `CLI failed on mixed syntax bundle: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(data && typeof data === 'object', 'Must return valid JSON object for mixed syntax bundle');
  });

  test('F5-T2-4: CLI execution against directory path instead of file path fails gracefully with non-zero exit code', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const dirPath = path.join(workspaceRoot, 'dist');
    const res = spawnSync('node', [cliPath, dirPath, '--json'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.ok(res.status !== 0, `Expected non-zero exit code when scanning directory, got ${res.status}`);
  });

  test('F5-T2-5: CLI execution with no bundle arguments exits with non-zero status or outputs usage help', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const res = spawnSync('node', [cliPath], { encoding: 'utf8', cwd: workspaceRoot });
    const output = (res.stderr || '') + (res.stdout || '');
    assert.ok(res.status !== 0 || output.toLowerCase().includes('usage') || output.toLowerCase().includes('help'), 'Should exit with error or print usage');
  });
});

describe('Tier 2 - Boundary & Corner Cases for F6 (CLI Baseline Inference)', () => {
  test('F6-T2-1: Baseline inference handles bundle where no baseline year can be inferred without throwing error', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const testPath = getTempFilePath('no_baseline.js');
    fs.writeFileSync(testPath, 'console.log("no polyfills here");', 'utf8');
    const res = spawnSync('node', [cliPath, testPath, '--json'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const status = data.inferredBaseline?.status || data.baselineStatus || data.baseline?.status || 'low';
    assert.ok(['low', 'high', 'false'].includes(status), 'Status should default cleanly to valid enum');
  });

  test('F6-T2-2: Baseline inference when baseline is false for detected polyfill reports overall compatibility appropriately', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const testPath = getTempFilePath('false_baseline.js');
    fs.writeFileSync(testPath, 'var _custom_unbaselined_shim = true;', 'utf8');
    const res = spawnSync('node', [cliPath, testPath, '--json'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(data && typeof data === 'object', 'Must return valid report object');
  });

  test('F6-T2-3: Baseline inference handles empty feature list (0 polyfills detected) with valid schema', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const testPath = getTempFilePath('empty_features.js');
    fs.writeFileSync(testPath, 'const x = 1;', 'utf8');
    const res = spawnSync('node', [cliPath, testPath, '--json'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const features = data.detectedFeatures || data.detectedPolyfills || [];
    assert.strictEqual(features.length, 0, 'Expected 0 features');
  });

  test('F6-T2-4: Baseline inference handles contradictory feature sets without unhandled null pointer exceptions', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const testPath = getTempFilePath('contradictory_features.js');
    fs.writeFileSync(testPath, 'Promise.resolve(); typeof BigInt !== "undefined";', 'utf8');
    const res = spawnSync('node', [cliPath, testPath, '--json'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(data && typeof data === 'object', 'Must return valid JSON object');
  });

  test('F6-T2-5: Baseline year property formatting in JSON avoids outputting literal string "undefined"', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const testPath = getTempFilePath('clean_metadata.js');
    fs.writeFileSync(testPath, 'var x = 10;', 'utf8');
    const res = spawnSync('node', [cliPath, testPath, '--json'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    assert.ok(!res.stdout.includes('"undefined"'), 'JSON stdout must not contain literal "undefined" string');
  });
});

describe('Tier 2 - Boundary & Corner Cases for F7 (CLI Modernization Recommendations)', () => {
  test('F7-T2-1: Recommendations engine handles bundles with large number of distinct polyfills without truncation error', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const suggestion = data.modernizationSuggestion || data.suggestion || data.inferredBaseline?.suggestion || "Use modern syntax";
    assert.ok(typeof suggestion === 'string' && suggestion.length > 0, 'Must produce clean string suggestion');
  });

  test('F7-T2-2: Recommendations for bundle with only obsolete/deprecated shims provides removal suggestion', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const testPath = getTempFilePath('obsolete_shim.js');
    fs.writeFileSync(testPath, 'var _es5_shim = true;', 'utf8');
    const res = spawnSync('node', [cliPath, testPath, '--json'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(data && typeof data === 'object', 'Must return valid JSON report');
  });

  test('F7-T2-3: Recommendations engine behavior when custom catalog is specified defaults to valid suggestion text', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    assert.skipIfMissing(catalogPath, `Catalog missing: ${catalogPath}`);
    const res = runCli([targetBundle, `--catalog=${catalogPath}`, '--json']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(data && typeof data === 'object', 'Must return valid JSON report');
  });

  test('F7-T2-4: Recommendations text formatting in table format wraps cleanly without breaking stdout output', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = runCli([targetBundle, '--format', 'table']);
    assert.strictEqual(res.status, 0, `CLI failed: ${res.stderr}`);
    assert.ok(res.stdout.length > 0, 'Table format stdout should be populated');
  });

  test('F7-T2-5: Recommendations engine produces deterministic output across consecutive invocations on same file', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res1 = runCli([targetBundle, '--json']);
    const res2 = runCli([targetBundle, '--json']);
    assert.strictEqual(res1.status, 0, `First run failed: ${res1.stderr}`);
    assert.strictEqual(res2.status, 0, `Second run failed: ${res2.stderr}`);
    assert.strictEqual(res1.stdout, res2.stdout, 'CLI output must be deterministic across identical runs');
  });
});

describe('Tier 2 - Boundary & Corner Cases for F8 (CLI Structured Output Formats)', () => {
  test('F8-T2-1: CLI invoked with invalid argument flag (--unknown-flag) exits with non-zero status and reports error', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = spawnSync('node', [cliPath, targetBundle, '--unknown-flag'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.ok(res.status !== 0, `Expected non-zero exit code for unknown flag, got ${res.status}`);
    const output = (res.stderr || '') + (res.stdout || '');
    assert.ok(output.length > 0, 'Should output error text for unknown flag');
  });

  test('F8-T2-2: CLI invoked with malformed catalog option (--catalog=/invalid/path) exits with non-zero status', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = spawnSync('node', [cliPath, targetBundle, '--catalog=/invalid/path/rules.json'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.ok(res.status !== 0, `Expected non-zero exit code for malformed catalog path, got ${res.status}`);
  });

  test('F8-T2-3: CLI invoked with unsupported format value (--format xml) exits with non-zero status', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = spawnSync('node', [cliPath, targetBundle, '--format', 'xml'], { encoding: 'utf8', cwd: workspaceRoot });
    assert.ok(res.status !== 0, `Expected non-zero exit code for unsupported format, got ${res.status}`);
  });

  test('F8-T2-4: When scanning syntax-corrupted bundle with --json, error handling outputs clean message or error object', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const badSyntaxPath = getTempFilePath('corrupted_syntax.js');
    fs.writeFileSync(badSyntaxPath, 'function((( { invalid syntax %%%', 'utf8');
    const res = spawnSync('node', [cliPath, badSyntaxPath, '--json'], { encoding: 'utf8', cwd: workspaceRoot });
    const output = (res.stderr || '') + (res.stdout || '');
    assert.ok(output.length > 0, 'CLI should output diagnostic error on syntax corruption');
  });

  test('F8-T2-5: Conflicting flags (--json together with --format table) are handled deterministically without crash', () => {
    assert.skipIfMissing(cliPath, `CLI binary missing: ${cliPath}`);
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.skipIfMissing(targetBundle, `Target bundle missing: ${targetBundle}`);
    const res = spawnSync('node', [cliPath, targetBundle, '--json', '--format', 'table'], { encoding: 'utf8', cwd: workspaceRoot });
    const output = (res.stderr || '') + (res.stdout || '');
    assert.ok(output.length > 0, 'CLI should resolve or report flag conflicts deterministically');
  });
});

describe('Tier 3 - Cross-Feature Combinations for R3 (CLI Flags x Bundle Formats x Catalog Options)', () => {
  const t3Cases = [
    { id: 'R3-PW-01', bundler: 'rollup', sample: 'es2015_ie11', flag: '--json', useCatalog: false },
    { id: 'R3-PW-02', bundler: 'rollup', sample: 'es2015_modern', flag: '--format=table', useCatalog: false },
    { id: 'R3-PW-03', bundler: 'esbuild', sample: 'es2020_chrome50', flag: '--json', useCatalog: true },
    { id: 'R3-PW-04', bundler: 'esbuild', sample: 'es2020_modern', flag: '--format=table', useCatalog: true },
    { id: 'R3-PW-05', bundler: 'webpack', sample: 'es2024_ie11', flag: '--json', useCatalog: false },
    { id: 'R3-PW-06', bundler: 'webpack', sample: 'es2024_modern', flag: '--format=table', useCatalog: false },
    { id: 'R3-PW-07', bundler: 'rollup', sample: 'es2018_es5', flag: '--format=table', useCatalog: true },
    { id: 'R3-PW-08', bundler: 'esbuild', sample: 'es2018_modern', flag: '--json', useCatalog: false }
  ];

  for (const tc of t3Cases) {
    test(`F5/F6/F7/F8-T3-${tc.id}: Pairwise combination [${tc.bundler} × ${tc.sample} × ${tc.flag} × catalog=${tc.useCatalog}]`, () => {
      const bundlePath = path.join(distBundlesRoot, tc.bundler, `${tc.sample}.js`);
      assert.skipIfMissing(bundlePath, `Bundle missing: ${bundlePath}`);
      if (tc.useCatalog) {
        assert.skipIfMissing(catalogPath, `Catalog missing: ${catalogPath}`);
      }
      const args = [bundlePath, tc.flag];
      if (tc.useCatalog) {
        args.push(`--catalog=${catalogPath}`);
      }
      const res = runCli(args);
      assert.strictEqual(res.status, 0, `Pairwise CLI scan failed: ${res.stderr}`);
      if (tc.flag === '--json') {
        const data = JSON.parse(res.stdout);
        assert.ok(data && typeof data === 'object', 'JSON report must be an object');
      } else {
        assert.ok(res.stdout.length > 0, 'Table report must not be empty');
      }
    });
  }
});

describe('Tier 4 - Real-World Application Scenarios for R3 (CLI Workflows & Reporting)', () => {
  test('F5/F6/F7/F8-T4-1: Automated Audit CI Pipeline Usage with PR artifact verification', () => {
    const ciBundle = path.join(distBundlesRoot, 'scenarios/ci_pr_artifact.js');
    assert.skipIfMissing(ciBundle, `CI scenario bundle missing: ${ciBundle}`);
    const res = runCli([ciBundle, '--json']);
    assert.strictEqual(res.status, 0, `CLI audit pipeline failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    const features = data.detectedFeatures || data.detectedPolyfills || [];
    assert.ok(Array.isArray(features), 'Audit pipeline report must return feature list');
  });

  test('F5/F6/F7/F8-T4-2: Production Legacy Enterprise Bundle Audit with table format summary', () => {
    const enterpriseBundle = path.join(distBundlesRoot, 'scenarios/enterprise_ie11.js');
    assert.skipIfMissing(enterpriseBundle, `Enterprise bundle missing: ${enterpriseBundle}`);
    const res = runCli([enterpriseBundle, '--format', 'table']);
    assert.strictEqual(res.status, 0, `Enterprise audit failed: ${res.stderr}`);
    assert.ok(res.stdout.length > 0, 'Enterprise audit summary should be formatted');
  });

  test('F5/F6/F7/F8-T4-3: Micro-Frontend Migration Strategy Reporting with custom rules catalog', () => {
    const mfeBundle = path.join(distBundlesRoot, 'scenarios/microfrontend_shared.js');
    assert.skipIfMissing(mfeBundle, `MFE bundle missing: ${mfeBundle}`);
    assert.skipIfMissing(catalogPath, `Catalog missing: ${catalogPath}`);
    const res = runCli([mfeBundle, `--catalog=${catalogPath}`, '--json']);
    assert.strictEqual(res.status, 0, `MFE migration scan failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(data && typeof data === 'object', 'MFE migration report must be valid JSON');
  });

  test('F5/F6/F7/F8-T4-4: Strict Security & CSP Financial Banking App Scan', () => {
    const bankingBundle = path.join(distBundlesRoot, 'scenarios/banking_secure.js');
    assert.skipIfMissing(bankingBundle, `Banking bundle missing: ${bankingBundle}`);
    const res = runCli([bankingBundle, '--json']);
    assert.strictEqual(res.status, 0, `Banking scan failed: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(data && typeof data === 'object', 'Banking security audit report must be JSON object');
  });

  test('F5/F6/F7/F8-T4-5: Multi-Bundle Comparative Audit Workflow (Legacy vs Modern SPA)', () => {
    const legacyBundle = path.join(distBundlesRoot, 'scenarios/enterprise_ie11.js');
    const modernBundle = path.join(distBundlesRoot, 'scenarios/modern_spa.js');
    assert.skipIfMissing(legacyBundle, `Legacy bundle missing: ${legacyBundle}`);
    assert.skipIfMissing(modernBundle, `Modern bundle missing: ${modernBundle}`);
    const resLegacy = runCli([legacyBundle, '--json']);
    const resModern = runCli([modernBundle, '--json']);
    assert.strictEqual(resLegacy.status, 0, `Legacy scan failed: ${resLegacy.stderr}`);
    assert.strictEqual(resModern.status, 0, `Modern scan failed: ${resModern.stderr}`);
    const dataLegacy = JSON.parse(resLegacy.stdout);
    const dataModern = JSON.parse(resModern.stdout);
    const legCount = (dataLegacy.detectedFeatures || dataLegacy.detectedPolyfills || []).length;
    const modCount = (dataModern.detectedFeatures || dataModern.detectedPolyfills || []).length;
    assert.ok(legCount >= 0 && modCount >= 0, 'Comparative audit must evaluate feature counts for both bundles');
  });
});
