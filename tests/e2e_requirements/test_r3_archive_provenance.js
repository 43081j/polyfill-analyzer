import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, test, assert } from './runner.js';
import { syncArchives } from '../../dist/bundlers/sync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../../');
const distBundlesRoot = path.join(workspaceRoot, 'dist/bundles');
const srcOutputsRoot = path.join(workspaceRoot, 'src/bundlers/outputs');

describe('Tier 1 - R3: Bundler Output Archive & Provenance Documentation Verification', () => {
  const bundlers = ['rollup', 'esbuild', 'webpack', 'swc'];
  const samples = [
    'es2011', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019',
    'es2020', 'es2021', 'es2022', 'es2023', 'es2024', 'es2025', 'es2026'
  ];

  test('R3-T1-0: Sync archive directories before E2E verification', () => {
    syncArchives();
    assert.ok(true, 'Archives synchronized successfully');
  });

  test('R3-T1-1: README.md exists and contains provenance documentation in dist/bundles/ for all bundlers', () => {
    for (const bundler of bundlers) {
      const readmePath = path.join(distBundlesRoot, bundler, 'README.md');
      assert.existsSync(readmePath, `Expected README.md in ${readmePath}`);
      const content = fs.readFileSync(readmePath, 'utf8');
      assert.ok(content.length > 100, `README.md in ${bundler} must have substantial content`);
      assert.ok(content.includes('Overview') && content.includes('Configuration'), `README.md in ${bundler} must contain required sections`);
    }
  });

  test('R3-T1-2: README.md exists and contains provenance documentation in src/bundlers/outputs/ for all bundlers', () => {
    for (const bundler of bundlers) {
      const readmePath = path.join(srcOutputsRoot, bundler, 'README.md');
      assert.existsSync(readmePath, `Expected README.md in ${readmePath}`);
      const content = fs.readFileSync(readmePath, 'utf8');
      assert.ok(content.length > 100, `README.md in ${bundler} must have substantial content`);
      assert.ok(content.includes('Overview') && content.includes('Configuration'), `README.md in ${bundler} must contain required sections`);
    }
  });

  test('R3-T1-3: ES5 downleveled bundle outputs exist for all 13 sample files across all 4 adapters in dist/bundles/', () => {
    for (const bundler of bundlers) {
      for (const sample of samples) {
        const bundlePath = path.join(distBundlesRoot, bundler, `${sample}_es5.js`);
        assert.existsSync(bundlePath, `Expected ES5 bundle ${bundlePath}`);
        const stat = fs.statSync(bundlePath);
        assert.ok(stat.size > 0, `Bundle ${bundlePath} must not be empty`);
      }
    }
  });

  test('R3-T1-4: ES5 downleveled bundle outputs exist for all 13 sample files across all 4 adapters in src/bundlers/outputs/', () => {
    for (const bundler of bundlers) {
      for (const sample of samples) {
        const bundlePath = path.join(srcOutputsRoot, bundler, `${sample}_es5.js`);
        assert.existsSync(bundlePath, `Expected ES5 bundle ${bundlePath} in src/bundlers/outputs/`);
        const stat = fs.statSync(bundlePath);
        assert.ok(stat.size > 0, `Bundle ${bundlePath} in src/bundlers/outputs/ must not be empty`);
      }
    }
  });

  test('R3-T1-5: ES5 sourcemap (.map) outputs exist and are non-empty for all 13 sample files across all 4 adapters in dist/bundles/', () => {
    for (const bundler of bundlers) {
      for (const sample of samples) {
        const mapPath = path.join(distBundlesRoot, bundler, `${sample}_es5.js.map`);
        assert.existsSync(mapPath, `Expected ES5 sourcemap ${mapPath}`);
        const stat = fs.statSync(mapPath);
        assert.ok(stat.size > 0, `Sourcemap ${mapPath} must not be empty`);
      }
    }
  });

  test('R3-T1-6: ES5 sourcemap (.map) outputs exist and are non-empty for all 13 sample files across all 4 adapters in src/bundlers/outputs/', () => {
    for (const bundler of bundlers) {
      for (const sample of samples) {
        const mapPath = path.join(srcOutputsRoot, bundler, `${sample}_es5.js.map`);
        assert.existsSync(mapPath, `Expected ES5 sourcemap ${mapPath} in src/bundlers/outputs/`);
        const stat = fs.statSync(mapPath);
        assert.ok(stat.size > 0, `Sourcemap ${mapPath} in src/bundlers/outputs/ must not be empty`);
      }
    }
  });
});
