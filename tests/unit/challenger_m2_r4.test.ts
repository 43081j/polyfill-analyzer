import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { RollupAdapter, EsbuildAdapter, WebpackAdapter, SwcAdapter, type BundlerAdapter, type BundlerTarget } from '../../src/bundlers/index.js';
import { generate } from '../../src/bundlers/generate.js';

describe('Challenger M2 R4 - Empirical Verification & Stress Testing', () => {
  const esSamplesDir = fs.existsSync(path.resolve(__dirname, '../../../es-samples/samples'))
    ? path.resolve(__dirname, '../../../es-samples/samples')
    : path.resolve(__dirname, '../../node_modules/es-samples/samples');
  const distBundlesDir = path.resolve(__dirname, '../../dist/bundles');
  let tmpDir: string;

  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger-m2-r4-'));
  });

  afterAll(() => {
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  test('1. Verify all 15 scenario bundles are generated cleanly', async () => {
    const res = await generate({
      samplesDir: esSamplesDir,
      outDir: distBundlesDir,
      concurrency: 4,
    });
    
    expect(res.failed).toBe(0);
    expect(res.errors).toHaveLength(0);

    const scenariosDir = path.join(distBundlesDir, 'scenarios');
    expect(fs.existsSync(scenariosDir)).toBe(true);

    const expectedScenarios = [
      'enterprise_ie11.js',
      'modern_spa.js',
      'ecommerce_mixed.js',
      'microfrontend_shared.js',
      'ci_pr_artifact.js',
      'pwa_worker.js',
      'banking_secure.js',
      'saas_dynamic.js',
      'media_player.js',
      'edtech_canvas.js',
      'telemed_portal.js',
      'wasm_game_ui.js',
      'iot_realtime.js',
      'govtech_portal.js',
      'docs_playground.js',
    ];

    for (const scenario of expectedScenarios) {
      const scenarioPath = path.join(scenariosDir, scenario);
      expect(fs.existsSync(scenarioPath), `Missing scenario bundle: ${scenario}`).toBe(true);
      const content = fs.readFileSync(scenarioPath, 'utf8');
      expect(content.length).toBeGreaterThan(0);
    }
  }, 120000);

  test('2. Verify all 4 adapters across all sample files (es2011.js to es2026.js)', () => {
    const bundlers = ['rollup', 'esbuild', 'webpack', 'swc'];
    const targets: BundlerTarget[] = ['ie11', 'chrome50', 'es5', 'modern'];
    const sampleFiles = fs.readdirSync(esSamplesDir).filter(f => /^es\d{4}\.js$/.test(f));

    expect(sampleFiles.length).toBeGreaterThanOrEqual(13); // es2011, 2015..2026

    for (const bundler of bundlers) {
      const bundlerDir = path.join(distBundlesDir, bundler);
      expect(fs.existsSync(bundlerDir), `Missing bundler directory: ${bundler}`).toBe(true);
      
      for (const sample of sampleFiles) {
        const sampleName = path.basename(sample, '.js');
        for (const target of targets) {
          const bundleName = `${sampleName}_${target}.js`;
          const bundlePath = path.join(bundlerDir, bundleName);
          expect(fs.existsSync(bundlePath), `Missing bundle: ${bundler}/${bundleName}`).toBe(true);
          const content = fs.readFileSync(bundlePath, 'utf8');
          expect(content.length).toBeGreaterThan(0);
        }
      }
    }
  });

  test('3. Specifically verify Esbuild cleanly handles Top-Level Await (es2022.js and explicit TLA)', async () => {
    const adapter = new EsbuildAdapter();
    const es2022Path = path.join(esSamplesDir, 'es2022.js');
    const targets: BundlerTarget[] = ['ie11', 'chrome50', 'es5', 'modern'];

    // Test existing es2022.js
    for (const target of targets) {
      const outPath = path.join(tmpDir, `esbuild_es2022_${target}.js`);
      await expect(adapter.bundle(es2022Path, outPath, target)).resolves.not.toThrow();
      expect(fs.existsSync(outPath)).toBe(true);
    }

    // Stress test explicit Top-Level Await syntax
    const tlaSamplePath = path.join(tmpDir, 'tla_sample.js');
    fs.writeFileSync(tlaSamplePath, 'const data = await Promise.resolve({ status: "ok" });\nexport { data };');

    for (const target of targets) {
      const outPath = path.join(tmpDir, `esbuild_tla_${target}.js`);
      await expect(adapter.bundle(tlaSamplePath, outPath, target)).resolves.not.toThrow();
      expect(fs.existsSync(outPath)).toBe(true);
      const content = fs.readFileSync(outPath, 'utf8');
      expect(content.length).toBeGreaterThan(0);
    }
  }, 60000);

  test('4. Specifically verify Esbuild cleanly handles ES2024 destructuring', async () => {
    const adapter = new EsbuildAdapter();
    const es2024Path = path.join(esSamplesDir, 'es2024.js');
    const targets: BundlerTarget[] = ['ie11', 'chrome50', 'es5', 'modern'];

    for (const target of targets) {
      const outPath = path.join(tmpDir, `esbuild_es2024_${target}.js`);
      await expect(adapter.bundle(es2024Path, outPath, target)).resolves.not.toThrow();
      expect(fs.existsSync(outPath)).toBe(true);
      const content = fs.readFileSync(outPath, 'utf8');
      expect(content.length).toBeGreaterThan(0);
    }

    // Stress test complex ES2024 destructuring with defaults and nested structures
    const destructuringSamplePath = path.join(tmpDir, 'destruct_sample.js');
    fs.writeFileSync(
      destructuringSamplePath,
      'const { promise, resolve = () => {}, reject = () => {}, ...rest } = Promise.withResolvers();\n' +
      'const [{ type: a = "default", ...itemRest } = {}] = [{ type: "test", val: 42 }];\n' +
      'export { promise, resolve, reject, rest, a, itemRest };'
    );

    for (const target of targets) {
      const outPath = path.join(tmpDir, `esbuild_destruct_${target}.js`);
      await expect(adapter.bundle(destructuringSamplePath, outPath, target)).resolves.not.toThrow();
      expect(fs.existsSync(outPath)).toBe(true);
      const content = fs.readFileSync(outPath, 'utf8');
      expect(content.length).toBeGreaterThan(0);
    }
  }, 60000);

  test('5. Specifically verify Rollup handles JSON imports', async () => {
    const adapter = new RollupAdapter();
    const jsonPath = path.join(tmpDir, 'data.json');
    fs.writeFileSync(jsonPath, JSON.stringify({ version: '1.0.0', features: ['tla', 'json'] }));

    const jsImportPath = path.join(tmpDir, 'import_json.js');
    fs.writeFileSync(
      jsImportPath,
      `import data from './data.json';\nconsole.log(data.version, data.features);`
    );

    const targets: BundlerTarget[] = ['ie11', 'chrome50', 'es5', 'modern'];
    for (const target of targets) {
      const outPath = path.join(tmpDir, `rollup_json_${target}.js`);
      await expect(adapter.bundle(jsImportPath, outPath, target)).resolves.not.toThrow();
      expect(fs.existsSync(outPath)).toBe(true);
      const content = fs.readFileSync(outPath, 'utf8');
      expect(content).toContain('1.0.0');
    }
  }, 60000);
});
