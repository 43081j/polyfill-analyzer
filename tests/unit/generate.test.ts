import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { RollupAdapter, EsbuildAdapter, WebpackAdapter, SwcAdapter } from '../../src/bundlers/index.js';
import { generate } from '../../src/bundlers/generate.js';

describe('Adapter Unit Tests', () => {
  let tmpDir: string;
  let sampleFile: string;

  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'adapter-unit-'));
    sampleFile = path.join(tmpDir, 'sample.js');
    fs.writeFileSync(sampleFile, 'const arr = [1, 2, 3]; Promise.resolve(arr.includes(2));');
  });

  afterAll(() => {
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  const adapters = [
    new RollupAdapter(),
    new EsbuildAdapter(),
    new WebpackAdapter(),
    new SwcAdapter(),
  ];

  for (const adapter of adapters) {
    test(`${adapter.name} bundles legacy es5 target and injects polyfill signatures`, async () => {
      const outPath = path.join(tmpDir, `${adapter.name}_legacy.js`);
      await adapter.bundle(sampleFile, outPath, 'es5');
      
      expect(fs.existsSync(outPath)).toBe(true);
      const content = fs.readFileSync(outPath, 'utf8');
      if (adapter.name === 'rollup') {
        console.log('ROLLUP LEGACY OUT:', content);
      }
      expect(content.length).toBeGreaterThan(0);
      const hasPolyfill = content.includes('core-js') || content.includes('polyfill') || content.includes('__helpers') || content.includes('regeneratorRuntime') || content.includes('swc') || content.includes('babel');
      expect(hasPolyfill).toBe(true);
    }, 60000);

    test(`${adapter.name} bundles modern target and supports sourcemaps`, async () => {
      const outPath = path.join(tmpDir, `${adapter.name}_modern.js`);
      await adapter.bundle(sampleFile, outPath, 'modern', { sourcemap: true });
      
      expect(fs.existsSync(outPath)).toBe(true);
      const content = fs.readFileSync(outPath, 'utf8');
      expect(content.length).toBeGreaterThan(0);
      
      const mapPath = `${outPath}.map`;
      const hasMapFile = fs.existsSync(mapPath);
      const hasInlineMap = content.includes('sourceMappingURL=');
      expect(hasMapFile || hasInlineMap).toBe(true);
    }, 60000);
  }
});

describe('Pipeline Orchestration Tests', () => {
  let tmpSamplesDir: string;
  let tmpOutDir: string;

  beforeAll(() => {
    tmpSamplesDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gen-samples-'));
    tmpOutDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gen-out-'));
    fs.writeFileSync(path.join(tmpSamplesDir, 'es0001.js'), 'console.log("sample 1");');
    fs.writeFileSync(path.join(tmpSamplesDir, 'es0002.js'), 'console.log("sample 2");');
  });

  afterAll(() => {
    if (fs.existsSync(tmpSamplesDir)) fs.rmSync(tmpSamplesDir, { recursive: true, force: true });
    if (fs.existsSync(tmpOutDir)) fs.rmSync(tmpOutDir, { recursive: true, force: true });
  });

  test('generate() orchestrates multiple bundlers and targets with correct output structure', async () => {
    const res = await generate({
      samplesDir: tmpSamplesDir,
      outDir: tmpOutDir,
      bundlers: ['esbuild', 'rollup'],
      targets: ['es5', 'modern'],
    });

    expect(res.total).toBe(8);
    expect(res.success).toBe(8);
    expect(res.failed).toBe(0);
    expect(res.errors).toHaveLength(0);

    for (const bundler of ['esbuild', 'rollup']) {
      for (const sample of ['es0001', 'es0002']) {
        for (const target of ['es5', 'modern']) {
          const expectedPath = path.join(tmpOutDir, bundler, `${sample}_${target}.js`);
          expect(fs.existsSync(expectedPath)).toBe(true);
        }
      }
    }
  }, 60000);
});

describe('Error Handling Tests', () => {
  let tmpSamplesDir: string;
  let tmpOutDir: string;

  beforeAll(() => {
    tmpSamplesDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gen-err-samples-'));
    tmpOutDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gen-err-out-'));
    fs.writeFileSync(path.join(tmpSamplesDir, 'es0000.js'), 'function syntaxError( {');
  });

  afterAll(() => {
    if (fs.existsSync(tmpSamplesDir)) fs.rmSync(tmpSamplesDir, { recursive: true, force: true });
    if (fs.existsSync(tmpOutDir)) fs.rmSync(tmpOutDir, { recursive: true, force: true });
  });

  test('generate() captures syntax errors without unhandled exceptions', async () => {
    const res = await generate({
      samplesDir: tmpSamplesDir,
      outDir: tmpOutDir,
      bundlers: ['esbuild', 'rollup'],
      targets: ['es5'],
    });

    expect(res.total).toBe(2);
    expect(res.failed).toBe(2);
    expect(res.success).toBe(0);
    expect(res.errors.length).toBe(2);
    for (const err of res.errors) {
      expect(err.sample).toBe('es0000');
      expect(typeof err.error).toBe('string');
      expect(err.error.length).toBeGreaterThan(0);
    }
  }, 60000);
});
