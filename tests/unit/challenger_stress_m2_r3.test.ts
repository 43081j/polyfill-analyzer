import { describe, test, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { generate } from '../../src/bundlers/generate.js';

describe('Challenger M2 R3 Stress Test - Empirical Bundle Verification', () => {
  const samplesDir = fs.existsSync(path.resolve(__dirname, '../../../es-samples/samples'))
    ? path.resolve(__dirname, '../../../es-samples/samples')
    : path.resolve(__dirname, '../../node_modules/es-samples/samples');
  const distBundlesDir = path.resolve(__dirname, '../../dist/bundles');

  test('All bundles must exist and be freshly generated without missing targets', async () => {
    const res = await generate({
      samplesDir,
      outDir: distBundlesDir,
      concurrency: 4,
    });
    console.log(`Generation completed: total=${res.total}, success=${res.success}, failed=${res.failed}`);
    if (res.errors.length > 0) {
      console.error('Generation errors:', res.errors);
    }
    expect(res.failed).toBe(0);
    expect(res.errors).toHaveLength(0);
  }, 120000);

  test('Empirical Verification: Modern reference bundles are clean without polyfill leakage', () => {
    const bundlers = ['rollup', 'esbuild', 'webpack', 'swc'];
    const sampleFiles = fs.readdirSync(samplesDir).filter(f => /^es\d{4}\.js$/.test(f));

    let modernCount = 0;
    for (const bundler of bundlers) {
      const bundlerDir = path.join(distBundlesDir, bundler);
      if (!fs.existsSync(bundlerDir)) continue;
      for (const sample of sampleFiles) {
        const sampleName = path.basename(sample, '.js');
        const modernBundlePath = path.join(bundlerDir, `${sampleName}_modern.js`);
        expect(fs.existsSync(modernBundlePath)).toBe(true);

        const content = fs.readFileSync(modernBundlePath, 'utf8');
        modernCount++;

        // Verify zero polyfill leakage
        const hasRegenerator = content.includes('regeneratorRuntime');
        const hasOptionalChainHelper = content.includes('_optionalChain') || content.includes('nullishCoalescing');
        const hasCoreJs = content.includes('core-js/') || content.includes('require("core-js') || content.includes("require('core-js");

        if (hasRegenerator || hasOptionalChainHelper || hasCoreJs) {
          throw new Error(`Polyfill leakage detected in ${bundler}/${sampleName}_modern.js: regenerator=${hasRegenerator}, optionalChain=${hasOptionalChainHelper}, coreJs=${hasCoreJs}`);
        }
        expect(hasRegenerator).toBe(false);
        expect(hasOptionalChainHelper).toBe(false);
        expect(hasCoreJs).toBe(false);

        // Verify sourcemap
        const mapPath = `${modernBundlePath}.map`;
        const hasMapFile = fs.existsSync(mapPath);
        const hasInlineMap = content.includes('sourceMappingURL=');
        expect(hasMapFile || hasInlineMap).toBe(true);
      }
    }
    expect(modernCount).toBeGreaterThan(0);
    console.log(`Verified ${modernCount} modern bundles: clean without polyfill leakage.`);
  });

  test('Empirical Verification: Downlevel bundles contain required shims', () => {
    const bundlers = ['rollup', 'esbuild', 'webpack', 'swc'];
    const sampleFiles = fs.readdirSync(samplesDir).filter(f => /^es\d{4}\.js$/.test(f));
    const legacyTargets = ['ie11', 'chrome50', 'es5'];

    let legacyCount = 0;
    for (const bundler of bundlers) {
      const bundlerDir = path.join(distBundlesDir, bundler);
      if (!fs.existsSync(bundlerDir)) continue;
      for (const sample of sampleFiles) {
        const sampleName = path.basename(sample, '.js');
        for (const target of legacyTargets) {
          const legacyBundlePath = path.join(bundlerDir, `${sampleName}_${target}.js`);
          expect(fs.existsSync(legacyBundlePath)).toBe(true);

          const content = fs.readFileSync(legacyBundlePath, 'utf8');
          legacyCount++;

          // Downlevel bundles must contain shims / polyfill signatures
          const hasPolyfillSig = content.includes('core-js') || 
                                 content.includes('__helpers') || 
                                 content.includes('regeneratorRuntime') || 
                                 content.includes('polyfill') || 
                                 content.includes('_interopRequire') ||
                                 content.includes('swc') ||
                                 content.includes('babel') ||
                                 content.includes('defineProperties') ||
                                 content.includes('_class_call_check');
          
          if (!hasPolyfillSig) {
            console.warn(`Warning: No obvious polyfill/shim signature in ${bundler}/${sampleName}_${target}.js (length: ${content.length})`);
          }
          expect(hasPolyfillSig).toBe(true);
        }
      }
    }
    expect(legacyCount).toBeGreaterThan(0);
    console.log(`Verified ${legacyCount} downlevel bundles: contain required shims.`);
  });

  test('Adversarial Stress Test: Degenerate and boundary input samples across all adapters', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger-stress-'));
    try {
      const degenerateFile = path.join(tmpDir, 'es9999.js');
      // Empty code, single variable, unicode identifiers, comments only
      fs.writeFileSync(degenerateFile, '/* empty comment */\nconst ಠ_ಠ = 42;\nexport { ಠ_ಠ };');

      const outDir = path.join(tmpDir, 'out');
      const res = await generate({
        samplesDir: tmpDir,
        outDir,
        bundlers: ['rollup', 'esbuild', 'webpack', 'swc'],
        targets: ['es5', 'modern'],
      });

      expect(res.failed).toBe(0);
      expect(res.success).toBe(8);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  }, 60000);
});
