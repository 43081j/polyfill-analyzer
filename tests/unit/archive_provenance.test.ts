import { describe, test, expect, beforeAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncArchives } from '../../src/bundlers/sync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../../');
const distBundlesRoot = path.join(workspaceRoot, 'dist/bundles');
const srcOutputsRoot = path.join(workspaceRoot, 'src/bundlers/outputs');

describe('Milestone 7: Archive Provenance Documentation and ES5 Bundle Integrity', () => {
  const bundlers = ['rollup', 'esbuild', 'webpack', 'swc'];
  const samples = [
    'es2011', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019',
    'es2020', 'es2021', 'es2022', 'es2023', 'es2024', 'es2025', 'es2026'
  ];

  beforeAll(() => {
    // Ensure both archive locations are synchronized before verification
    syncArchives();
  });

  test('verifies existence and non-empty content of README.md in each bundler archive directory in dist/bundles/', () => {
    for (const bundler of bundlers) {
      const readmePath = path.join(distBundlesRoot, bundler, 'README.md');
      expect(fs.existsSync(readmePath), `Expected README.md to exist in ${readmePath}`).toBe(true);
      const content = fs.readFileSync(readmePath, 'utf8');
      expect(content.length).toBeGreaterThan(100);
      expect(content).toContain('Overview');
      expect(content).toContain('Bundler Configuration');
      expect(content).toContain('Artifact Generation Commands');
    }
  });

  test('verifies existence and non-empty content of README.md in each bundler archive directory in src/bundlers/outputs/', () => {
    for (const bundler of bundlers) {
      const readmePath = path.join(srcOutputsRoot, bundler, 'README.md');
      expect(fs.existsSync(readmePath), `Expected README.md to exist in ${readmePath}`).toBe(true);
      const content = fs.readFileSync(readmePath, 'utf8');
      expect(content.length).toBeGreaterThan(100);
      expect(content).toContain('Overview');
      expect(content).toContain('Bundler Configuration');
      expect(content).toContain('Artifact Generation Commands');
    }
  });

  test('verifies existence of ES5 downleveled bundle outputs for all sample files across all 4 adapters in dist/bundles/', () => {
    syncArchives();
    for (const bundler of bundlers) {
      for (const sample of samples) {
        const bundlePath = path.join(distBundlesRoot, bundler, `${sample}_es5.js`);
        expect(fs.existsSync(bundlePath), `Expected ${bundlePath} to exist`).toBe(true);
        const stat = fs.statSync(bundlePath);
        expect(stat.size).toBeGreaterThan(0);
      }
    }
  });

  test('verifies existence of ES5 downleveled bundle outputs for all sample files across all 4 adapters in src/bundlers/outputs/', () => {
    for (const bundler of bundlers) {
      for (const sample of samples) {
        const bundlePath = path.join(srcOutputsRoot, bundler, `${sample}_es5.js`);
        expect(fs.existsSync(bundlePath), `Expected ${bundlePath} to exist in src/bundlers/outputs/`).toBe(true);
        const stat = fs.statSync(bundlePath);
        expect(stat.size).toBeGreaterThan(0);
      }
    }
  });

  test('verifies existence of ES5 sourcemap (.map) files for all sample files across all 4 adapters in dist/bundles/', () => {
    syncArchives();
    for (const bundler of bundlers) {
      for (const sample of samples) {
        const mapPath = path.join(distBundlesRoot, bundler, `${sample}_es5.js.map`);
        expect(fs.existsSync(mapPath), `Expected ${mapPath} to exist`).toBe(true);
        const stat = fs.statSync(mapPath);
        expect(stat.size).toBeGreaterThan(0);
      }
    }
  });

  test('verifies existence of ES5 sourcemap (.map) files for all sample files across all 4 adapters in src/bundlers/outputs/', () => {
    for (const bundler of bundlers) {
      for (const sample of samples) {
        const mapPath = path.join(srcOutputsRoot, bundler, `${sample}_es5.js.map`);
        expect(fs.existsSync(mapPath), `Expected ${mapPath} to exist in src/bundlers/outputs/`).toBe(true);
        const stat = fs.statSync(mapPath);
        expect(stat.size).toBeGreaterThan(0);
      }
    }
  });

  test('verifies that no temporary (.tmp) files exist in archive directories', () => {
    for (const bundler of bundlers) {
      const distFiles = fs.readdirSync(path.join(distBundlesRoot, bundler));
      const srcFiles = fs.readdirSync(path.join(srcOutputsRoot, bundler));
      expect(distFiles.filter(f => f.endsWith('.tmp'))).toEqual([]);
      expect(srcFiles.filter(f => f.endsWith('.tmp'))).toEqual([]);
    }
  });
});
