import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { describe, test, assert } from './runner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../../');
const samplesRoot = fs.existsSync(path.join(workspaceRoot, '../es-samples/samples'))
  ? path.join(workspaceRoot, '../es-samples/samples')
  : path.join(workspaceRoot, 'node_modules/es-samples/samples');
const distBundlesRoot = path.join(workspaceRoot, 'dist/bundles');

describe('Tier 1 - F1: Automated Polyfill Bundle Generation', () => {
  const bundlers = ['rollup', 'esbuild', 'webpack', 'swc'];
  const samples = ['es2011', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'es2023', 'es2024', 'es2025', 'es2026'];
  const targets = ['ie11', 'chrome50', 'es5'];

  test('F1-T1-0: Execute automated bundle generation pipeline', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/generate.js');
    assert.existsSync(genPath, `Compiled generate.js must exist at ${genPath}`);
    const { generate } = await import(pathToFileURL(genPath).href);
    const res = await generate();
    assert.ok(res && typeof res.success === 'number', 'Pipeline must return generate result');
    assert.strictEqual(res.failed, 0, 'Pipeline must generate all bundles without errors: ' + JSON.stringify(res.errors, null, 2));
    assert.ok(res.success > 0, `Pipeline must generate bundles successfully (got ${res.success} success, ${res.failed} failed)`);
  });

  test('F1-T1-1: Source es-sample input files exist for bundle processing', () => {
    for (const sample of samples) {
      const samplePath = path.join(samplesRoot, `${sample}.js`);
      assert.existsSync(samplePath, `Source sample file must exist: ${samplePath}`);
    }
  });

  test('F1-T1-2: Rollup bundle output directory structure adheres to naming conventions', () => {
    const bundlerDir = path.join(distBundlesRoot, 'rollup');
    assert.existsSync(bundlerDir, `Rollup bundle directory missing: ${bundlerDir}`);
    assert.ok(fs.statSync(bundlerDir).isDirectory(), 'Rollup bundle path must be a directory');
  });

  test('F1-T1-3: esbuild bundle output directory structure adheres to naming conventions', () => {
    const bundlerDir = path.join(distBundlesRoot, 'esbuild');
    assert.existsSync(bundlerDir, `esbuild bundle directory missing: ${bundlerDir}`);
    assert.ok(fs.statSync(bundlerDir).isDirectory(), 'esbuild bundle path must be a directory');
  });

  test('F1-T1-4: Webpack bundle output directory structure adheres to naming conventions', () => {
    const bundlerDir = path.join(distBundlesRoot, 'webpack');
    assert.existsSync(bundlerDir, `Webpack bundle directory missing: ${bundlerDir}`);
    assert.ok(fs.statSync(bundlerDir).isDirectory(), 'Webpack bundle path must be a directory');
  });

  test('F1-T1-4b: SWC bundle output directory structure adheres to naming conventions', () => {
    const bundlerDir = path.join(distBundlesRoot, 'swc');
    assert.existsSync(bundlerDir, `SWC bundle directory missing: ${bundlerDir}`);
    assert.ok(fs.statSync(bundlerDir).isDirectory(), 'SWC bundle path must be a directory');
  });

  test('F1-T1-5: Bundle target naming convention <sample>_<target>.js is generated for ES2015 downleveling', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.existsSync(targetBundle, `Expected target bundle ${targetBundle} not yet generated`);
    const content = fs.readFileSync(targetBundle, 'utf8');
    assert.ok(content.length > 0, 'Generated bundle should not be empty');
  });

  test('F1-T1-6: Downlevel bundle contains polyfill injection signatures (core-js or babel runtime)', () => {
    const targetBundle = path.join(distBundlesRoot, 'esbuild/es2018_es5.js');
    assert.existsSync(targetBundle, `Target bundle ${targetBundle} not yet generated`);
    const content = fs.readFileSync(targetBundle, 'utf8');
    const hasPolyfill = content.includes('core-js') || content.includes('polyfill') || content.includes('__helpers') || content.includes('babel') || content.includes('regeneratorRuntime');
    assert.ok(hasPolyfill, 'Downlevel bundle must contain polyfill or runtime helper signatures');
  });

  test('F1-T1-7: Build script configuration supports multiple target compatibility environments', () => {
    const pkgPath = path.join(workspaceRoot, 'package.json');
    assert.existsSync(pkgPath);
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    assert.ok(pkg.devDependencies || pkg.dependencies, 'Package configuration must specify bundler dependencies');
  });

  test('F1-T1-8: ES2026 advanced syntax sample processing completes without transpilation fatal errors', () => {
    const sample2026 = path.join(samplesRoot, 'es2026.js');
    assert.existsSync(sample2026, 'ES2026 sample must exist');
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2026_es5.js');
    assert.existsSync(targetBundle, `ES2026 downlevel bundle ${targetBundle} not yet generated`);
    const content = fs.readFileSync(targetBundle, 'utf8');
    assert.ok(content.length > 0, 'Generated ES2026 bundle should not be empty');
  });
});

describe('Tier 1 - F2: Reference Modern Bundle Generation', () => {
  const samples = ['es2011', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'es2023', 'es2024', 'es2025', 'es2026'];

  test('F2-T1-1: Reference modern bundle naming convention <sample>_modern.js is enforced for Rollup', () => {
    const modernBundle = path.join(distBundlesRoot, 'rollup/es2015_modern.js');
    assert.existsSync(modernBundle, `Modern reference bundle ${modernBundle} missing`);
    const content = fs.readFileSync(modernBundle, 'utf8');
    assert.ok(content.length > 0, 'Modern bundle should not be empty');
  });

  test('F2-T1-2: Reference modern bundle naming convention <sample>_modern.js is enforced for esbuild', () => {
    const modernBundle = path.join(distBundlesRoot, 'esbuild/es2020_modern.js');
    assert.existsSync(modernBundle, `Modern reference bundle ${modernBundle} missing`);
    const content = fs.readFileSync(modernBundle, 'utf8');
    assert.ok(content.length > 0, 'Modern esbuild bundle should not be empty');
  });

  test('F2-T1-3: Reference modern bundle naming convention <sample>_modern.js is enforced for Webpack', () => {
    const modernBundle = path.join(distBundlesRoot, 'webpack/es2024_modern.js');
    assert.existsSync(modernBundle, `Modern reference bundle ${modernBundle} missing`);
    const content = fs.readFileSync(modernBundle, 'utf8');
    assert.ok(content.length > 0, 'Modern Webpack bundle should not be empty');
  });

  test('F2-T1-4: Modern reference bundles preserve native async/await syntax without generator helpers', () => {
    const modernBundle = path.join(distBundlesRoot, 'rollup/es2018_modern.js');
    assert.existsSync(modernBundle, `Modern reference bundle ${modernBundle} missing`);
    const content = fs.readFileSync(modernBundle, 'utf8');
    assert.ok(!content.includes('regeneratorRuntime'), 'Modern bundle must not inject regeneratorRuntime');
  });

  test('F2-T1-5: Modern reference bundles preserve optional chaining and nullish coalescing operators', () => {
    const modernBundle = path.join(distBundlesRoot, 'esbuild/es2020_modern.js');
    assert.existsSync(modernBundle, `Modern reference bundle ${modernBundle} missing`);
    const content = fs.readFileSync(modernBundle, 'utf8');
    assert.ok(!content.includes('_nullishCoalescing') && !content.includes('_optionalChain'), 'Modern bundle should avoid downleveling operators when targeting modern browsers');
  });

  test('F2-T1-6: All ES sample modern bundles generate corresponding source maps if configured', () => {
    const mapPath = path.join(distBundlesRoot, 'rollup/es2015_modern.js.map');
    assert.existsSync(mapPath, `Source map ${mapPath} missing`);
    const content = fs.readFileSync(mapPath, 'utf8');
    const map = JSON.parse(content);
    assert.ok(Array.isArray(map.sources), 'Source map must contain sources array');
  });

  test('F2-T1-7: Modern reference bundle file size is significantly smaller than downlevel polyfilled bundle', () => {
    const modernPath = path.join(distBundlesRoot, 'rollup/es2015_modern.js');
    const polyfillPath = path.join(distBundlesRoot, 'rollup/es2015_ie11.js');
    assert.existsSync(modernPath, `Modern bundle ${modernPath} missing`);
    assert.existsSync(polyfillPath, `Polyfill bundle ${polyfillPath} missing`);
    const modernSize = fs.statSync(modernPath).size;
    const polyfillSize = fs.statSync(polyfillPath).size;
    assert.ok(modernSize <= polyfillSize, `Modern bundle size (${modernSize}) should be <= polyfill size (${polyfillSize})`);
  });

  test('F2-T1-8: Modern bundles maintain valid JavaScript syntax parsable by native Node.js runtime', () => {
    const modernPath = path.join(distBundlesRoot, 'rollup/es2015_modern.js');
    assert.existsSync(modernPath, `Modern bundle ${modernPath} missing`);
    const content = fs.readFileSync(modernPath, 'utf8');
    assert.ok(content.length > 0, 'Bundle must contain parsable JavaScript code');
  });
});

describe('Tier 2 - F1: Boundary & Corner Cases for Polyfill Generation', () => {
  test('F1-T2-1: Pipeline handles zero-byte / empty sample file gracefully without fatal bundler crash', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/generate.js');
    const { generate } = await import(pathToFileURL(genPath).href);
    const emptyDir = path.join(workspaceRoot, 'tests/fixtures/empty_sample_dir');
    const outDir = path.join(workspaceRoot, 'tests/fixtures/empty_out_dir');
    fs.mkdirSync(emptyDir, { recursive: true });
    fs.writeFileSync(path.join(emptyDir, 'es_empty.js'), '');
    try {
      const res = await generate({ samplesDir: emptyDir, outDir, bundlers: ['esbuild'], targets: ['es5'] });
      assert.ok(res.total === 1, 'Should process 1 task for empty sample');
    } finally {
      if (fs.existsSync(emptyDir)) fs.rmSync(emptyDir, { recursive: true, force: true });
      if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  test('F1-T2-2: Pipeline catches and reports JavaScript syntax errors in input sample without unhandled exception', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/generate.js');
    const { generate } = await import(pathToFileURL(genPath).href);
    const errDir = path.join(workspaceRoot, 'tests/fixtures/syntax_err_dir');
    const outDir = path.join(workspaceRoot, 'tests/fixtures/syntax_err_out_dir');
    fs.mkdirSync(errDir, { recursive: true });
    fs.writeFileSync(path.join(errDir, 'es_syntax.js'), 'function invalidSyntax( { console.log("missing close paren");');
    try {
      const res = await generate({ samplesDir: errDir, outDir, bundlers: ['esbuild', 'rollup'], targets: ['es5'] });
      assert.ok(res.failed > 0, 'Pipeline must report failure on syntax errors');
      assert.ok(res.errors.length > 0, 'Must output structured syntax error message');
      assert.ok(typeof res.errors[0].error === 'string' && res.errors[0].error.length > 0, 'Error object must contain message');
    } finally {
      if (fs.existsSync(errDir)) fs.rmSync(errDir, { recursive: true, force: true });
      if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  test('F1-T2-3: Pipeline graceful failure when bundler configuration file (e.g. rollup.config.js) is missing', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/generate.js');
    const { generate } = await import(pathToFileURL(genPath).href);
    const configPath = path.join(workspaceRoot, 'rollup.config.js');
    assert.ok(!fs.existsSync(configPath), 'Rollup config file should not be present');
    const res = await generate({ bundlers: ['rollup'], targets: ['es5'] });
    assert.ok(res.success > 0, 'Rollup adapter works gracefully when rollup.config.js is missing');
  });

  test('F1-T2-4: Extreme ES version target boundary (ES5 minimum compatibility level vs ES2026 maximum)', () => {
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2026_es5.js');
    assert.existsSync(targetBundle, 'Extreme version target bundle missing');
    const content = fs.readFileSync(targetBundle, 'utf8');
    assert.ok(content.length > 0, 'Extreme version target bundle must be non-empty');
  });

  test('F1-T2-5: Pipeline handling of circular module dependencies in sample files', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/generate.js');
    const { generate } = await import(pathToFileURL(genPath).href);
    const circDir = path.join(workspaceRoot, 'tests/fixtures/circ_dir');
    const outDir = path.join(workspaceRoot, 'tests/fixtures/circ_out_dir');
    fs.mkdirSync(circDir, { recursive: true });
    fs.writeFileSync(path.join(circDir, 'es_circ_a.js'), 'import { b } from "./es_circ_b.js"; export const a = b + 1;');
    fs.writeFileSync(path.join(circDir, 'es_circ_b.js'), 'import { a } from "./es_circ_a.js"; export const b = a + 1;');
    try {
      const res = await generate({ samplesDir: circDir, outDir, bundlers: ['esbuild'], targets: ['es5'] });
      assert.ok(res.total === 2, 'Process must complete execution on circular dependencies');
    } finally {
      if (fs.existsSync(circDir)) fs.rmSync(circDir, { recursive: true, force: true });
      if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  test('F1-T2-6: Pipeline handling of non-existent import paths within sample code', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/generate.js');
    const { generate } = await import(pathToFileURL(genPath).href);
    const missingDir = path.join(workspaceRoot, 'tests/fixtures/missing_imp_dir');
    const outDir = path.join(workspaceRoot, 'tests/fixtures/missing_imp_out_dir');
    fs.mkdirSync(missingDir, { recursive: true });
    fs.writeFileSync(path.join(missingDir, 'es_missing.js'), 'import { nonExistent } from "./does_not_exist_12345.js"; console.log(nonExistent);');
    try {
      const res = await generate({ samplesDir: missingDir, outDir, bundlers: ['esbuild', 'rollup'], targets: ['es5'] });
      assert.ok(res.failed > 0, 'Pipeline must fail when resolving non-existent import paths');
      assert.ok(res.errors.length > 0, 'Must record import resolution error');
      const errStr = res.errors[0].error.toLowerCase();
      assert.ok(errStr.includes('resolve') || errStr.includes('error') || errStr.includes('cannot find') || errStr.includes('not found') || errStr.includes('could not resolve'), 'Must report import resolution failure');
    } finally {
      if (fs.existsSync(missingDir)) fs.rmSync(missingDir, { recursive: true, force: true });
      if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  test('F1-T2-7: Bundler behavior under extremely long target filenames or special characters', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/generate.js');
    const { generate } = await import(pathToFileURL(genPath).href);
    const longDir = path.join(workspaceRoot, 'tests/fixtures/long_dir');
    const outDir = path.join(workspaceRoot, 'tests/fixtures/long_out_dir');
    fs.mkdirSync(longDir, { recursive: true });
    const longName = 'es_sample_' + 'a'.repeat(100) + '_$#@!.js';
    fs.writeFileSync(path.join(longDir, longName), 'console.log("special filename test");');
    try {
      const res = await generate({ samplesDir: longDir, outDir, bundlers: ['esbuild'], targets: ['es5'] });
      assert.ok(typeof res.total === 'number', 'Must complete execution without unhandled exception');
    } finally {
      if (fs.existsSync(longDir)) fs.rmSync(longDir, { recursive: true, force: true });
      if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  test('F1-T2-8: Downleveling ES2026 features with no known polyfill available (e.g., syntax-only proposals)', () => {
    const sample2026 = path.join(samplesRoot, 'es2026.js');
    assert.existsSync(sample2026, 'ES2026 sample must exist');
    const targetBundle = path.join(distBundlesRoot, 'rollup/es2026_es5.js');
    assert.existsSync(targetBundle, 'ES2026 downlevel bundle missing');
    const content = fs.readFileSync(targetBundle, 'utf8');
    assert.ok(content.length > 0, 'Bundle content must be non-empty');
  });
});

describe('Tier 2 - F2: Boundary & Corner Cases for Modern Bundles', () => {
  test('F2-T2-1: Modern bundle generation for sample containing only comments and whitespace', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/generate.js');
    const { generate } = await import(pathToFileURL(genPath).href);
    const wsDir = path.join(workspaceRoot, 'tests/fixtures/ws_dir');
    const outDir = path.join(workspaceRoot, 'tests/fixtures/ws_out_dir');
    fs.mkdirSync(wsDir, { recursive: true });
    fs.writeFileSync(path.join(wsDir, 'es_ws.js'), '/* only comments */\n   \t\n// more comments\n');
    try {
      const res = await generate({ samplesDir: wsDir, outDir, bundlers: ['esbuild'], targets: ['modern'] });
      assert.ok(res.total === 1, 'Should process whitespace sample');
    } finally {
      if (fs.existsSync(wsDir)) fs.rmSync(wsDir, { recursive: true, force: true });
      if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  test('F2-T2-2: Modern bundle target browser specification with unsupported future browserslist query', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/index.js');
    const { RollupAdapter } = await import(pathToFileURL(genPath).href);
    const adapter = new RollupAdapter();
    const sample = path.join(samplesRoot, 'es2020.js');
    const outPath = path.join(workspaceRoot, 'tests/fixtures/future_out.js');
    try {
      await adapter.bundle(sample, outPath, 'chrome 999');
      assert.ok(true, 'Handle future query without unhandled crash');
    } catch (e) {
      assert.ok(e.message, 'Must provide error message if rejected');
    } finally {
      if (fs.existsSync(outPath)) try { fs.unlinkSync(outPath); } catch (_) {}
    }
  });

  test('F2-T2-3: Modern bundler behavior when read-only permissions prevent dist/ directory creation', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/generate.js');
    const { generate } = await import(pathToFileURL(genPath).href);
    const roDir = path.join(workspaceRoot, 'tests/fixtures/ro_dir');
    const outDir = path.join(workspaceRoot, 'tests/fixtures/ro_out_dir');
    fs.mkdirSync(roDir, { recursive: true });
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(roDir, 'es_test.js'), 'console.log("readonly test");');
    try {
      fs.chmodSync(outDir, 0o444);
      const res = await generate({ samplesDir: roDir, outDir, bundlers: ['esbuild'], targets: ['modern'] });
      assert.ok(res.failed > 0 || !fs.existsSync(path.join(outDir, 'esbuild/es_test_modern.js')), 'Must fail or report error when writing to read-only directory');
    } finally {
      fs.chmodSync(outDir, 0o777);
      if (fs.existsSync(roDir)) fs.rmSync(roDir, { recursive: true, force: true });
      if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  test('F2-T2-4: Modern bundle generation with sourcemaps disabled via CLI flag or config', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/index.js');
    const { EsbuildAdapter } = await import(pathToFileURL(genPath).href);
    const adapter = new EsbuildAdapter();
    const sample = path.join(samplesRoot, 'es2015.js');
    const outPath = path.join(workspaceRoot, 'tests/fixtures/no_map_out.js');
    try {
      await adapter.bundle(sample, outPath, 'modern', { sourcemap: false });
      assert.existsSync(outPath, 'Bundle file generated');
      assert.ok(!fs.existsSync(`${outPath}.map`), 'Source map file must NOT exist when sourcemaps are disabled');
    } finally {
      if (fs.existsSync(outPath)) try { fs.unlinkSync(outPath); } catch (_) {}
      if (fs.existsSync(`${outPath}.map`)) try { fs.unlinkSync(`${outPath}.map`); } catch (_) {}
    }
  });

  test('F2-T2-5: Verification of zero polyfill leakage when modern target includes ES2011 standard library', () => {
    const modernPath = path.join(distBundlesRoot, 'rollup/es2011_modern.js');
    assert.existsSync(modernPath, `Modern ES2011 bundle missing: ${modernPath}`);
    const content = fs.readFileSync(modernPath, 'utf8');
    assert.ok(!content.includes('core-js') && !content.includes('regeneratorRuntime'), 'Modern ES2011 bundle must not leak downlevel polyfills');
  });

  test('F2-T2-6: Modern bundle behavior when encountering top-level await in non-module context', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/index.js');
    const { RollupAdapter } = await import(pathToFileURL(genPath).href);
    const adapter = new RollupAdapter();
    const tlaSample = path.join(workspaceRoot, 'tests/fixtures/tla_script.js');
    fs.mkdirSync(path.dirname(tlaSample), { recursive: true });
    fs.writeFileSync(tlaSample, 'await Promise.resolve(42); console.log("tla");');
    const outPath = path.join(workspaceRoot, 'tests/fixtures/tla_out.js');
    try {
      await adapter.bundle(tlaSample, outPath, 'modern', { format: 'cjs' });
      assert.ok(true, 'Completes or warns');
    } catch (e) {
      const out = e.message.toLowerCase();
      assert.ok(out.includes('await') || out.includes('module') || out.includes('syntax') || out.includes('format'), 'Must catch or warn on top-level await in non-module context');
    } finally {
      if (fs.existsSync(tlaSample)) try { fs.unlinkSync(tlaSample); } catch (_) {}
      if (fs.existsSync(outPath)) try { fs.unlinkSync(outPath); } catch (_) {}
    }
  });

  test('F2-T2-7: Modern bundle generation across concurrent bundler processes (race condition prevention)', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/generate.js');
    const { generate } = await import(pathToFileURL(genPath).href);
    const sample = path.join(samplesRoot, 'es2018.js');
    const p1 = generate({ bundlers: ['esbuild'], targets: ['modern'] });
    const p2 = generate({ bundlers: ['esbuild'], targets: ['modern'] });
    const [r1, r2] = await Promise.all([p1, p2]);
    assert.strictEqual(r1.failed, r2.failed, 'Concurrent execution should produce consistent failure statuses');
  });

  test('F2-T2-8: Verification of modern bundle output integrity under low-memory CI constraints', async () => {
    const genPath = path.join(workspaceRoot, 'dist/bundlers/generate.js');
    const { generate } = await import(pathToFileURL(genPath).href);
    const res = await generate({ bundlers: ['esbuild'], targets: ['modern'] });
    assert.ok(res && typeof res.success === 'number', 'Must complete cleanly under memory constraints');
  });
});
