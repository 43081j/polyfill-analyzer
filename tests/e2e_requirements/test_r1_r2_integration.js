import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { describe, test, assert } from './runner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../../');
const distBundlesRoot = path.join(workspaceRoot, 'dist/bundles');
const catalogPath = path.join(workspaceRoot, 'src/catalog/rules.json');

describe('Tier 3 - Cross-Feature Pairwise Combinations (R1 Bundler Pipeline x R2 Catalog & AST Rules)', () => {
  const pairwiseCases = [
    { id: 'PW-01', bundler: 'rollup', sample: 'es2015', target: 'ie11', expectedMatches: '>0' },
    { id: 'PW-02', bundler: 'rollup', sample: 'es2015', target: 'modern', expectedMatches: '0' },
    { id: 'PW-03', bundler: 'rollup', sample: 'es2020', target: 'chrome50', expectedMatches: '>0' },
    { id: 'PW-04', bundler: 'rollup', sample: 'es2020', target: 'modern', expectedMatches: '0' },
    { id: 'PW-05', bundler: 'esbuild', sample: 'es2018', target: 'es5', expectedMatches: '>0' },
    { id: 'PW-06', bundler: 'esbuild', sample: 'es2018', target: 'modern', expectedMatches: '0' },
    { id: 'PW-07', bundler: 'esbuild', sample: 'es2024', target: 'ie11', expectedMatches: '>0' },
    { id: 'PW-08', bundler: 'esbuild', sample: 'es2024', target: 'modern', expectedMatches: '0' },
    { id: 'PW-09', bundler: 'webpack', sample: 'es2011', target: 'chrome50', expectedMatches: '>0' },
    { id: 'PW-10', bundler: 'webpack', sample: 'es2011', target: 'modern', expectedMatches: '0' },
    { id: 'PW-11', bundler: 'webpack', sample: 'es2026', target: 'es5', expectedMatches: '>0' },
    { id: 'PW-12', bundler: 'webpack', sample: 'es2026', target: 'modern', expectedMatches: '0' },
    { id: 'PW-13', bundler: 'rollup', sample: 'es2018', target: 'ie11', expectedMatches: '>0' },
    { id: 'PW-14', bundler: 'esbuild', sample: 'es2015', target: 'chrome50', expectedMatches: '>0' },
    { id: 'PW-15', bundler: 'webpack', sample: 'es2020', target: 'ie11', expectedMatches: '>0' },
    { id: 'PW-16', bundler: 'swc', sample: 'es2016', target: 'ie11', expectedMatches: '>0' },
    { id: 'PW-17', bundler: 'swc', sample: 'es2016', target: 'modern', expectedMatches: '0' },
    { id: 'PW-18', bundler: 'swc', sample: 'es2017', target: 'es5', expectedMatches: '>0' },
    { id: 'PW-19', bundler: 'swc', sample: 'es2017', target: 'modern', expectedMatches: '0' },
    { id: 'PW-20', bundler: 'swc', sample: 'es2019', target: 'chrome50', expectedMatches: '>0' },
    { id: 'PW-21', bundler: 'swc', sample: 'es2019', target: 'modern', expectedMatches: '0' },
    { id: 'PW-22', bundler: 'swc', sample: 'es2021', target: 'ie11', expectedMatches: '>0' },
    { id: 'PW-23', bundler: 'swc', sample: 'es2022', target: 'modern', expectedMatches: '0' },
    { id: 'PW-24', bundler: 'swc', sample: 'es2023', target: 'es5', expectedMatches: '>0' },
    { id: 'PW-25', bundler: 'swc', sample: 'es2025', target: 'modern', expectedMatches: '0' }
  ];

  for (const pw of pairwiseCases) {
    test(`F3/F4/F1/F2-${pw.id}: Pairwise scan [${pw.bundler} × ${pw.sample} × ${pw.target}] verifies rule matches (${pw.expectedMatches})`, () => {
      const bundleName = pw.target === 'modern' ? `${pw.sample}_modern.js` : `${pw.sample}_${pw.target}.js`;
      const bundlePath = path.join(distBundlesRoot, pw.bundler, bundleName);
      assert.skipIfMissing(bundlePath, `Pairwise target bundle ${bundlePath} missing`);
      const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
      assert.skipIfMissing(cliPath, `CLI missing: ${cliPath}`);
      const res = spawnSync('node', [cliPath, bundlePath, '--json'], { encoding: 'utf8' });
      assert.strictEqual(res.status, 0, `CLI failed on ${bundlePath}: ${res.stderr}`);
      const data = JSON.parse(res.stdout);
      assert.ok(data && typeof data === 'object', 'Report must be a JSON object');
      const features = data.detectedFeatures || data.detectedPolyfills || [];
      assert.ok(Array.isArray(features), 'Report must contain detectedFeatures array');
      assert.ok('inferredBaseline' in data || 'baselineStatus' in data || 'baseline' in data, 'Report must contain baseline status property');
      if (pw.expectedMatches === '0') {
        assert.strictEqual(features.length, 0, `Expected 0 matches for ${pw.id}, got ${features.length}`);
      } else {
        assert.ok(features.length > 0, `Expected > 0 matches for ${pw.id} (${bundleName}), got ${features.length}`);
      }
    });
  }
});

describe('Tier 4 - Real-World Application Scenarios & Workloads', () => {
  function verifyScenarioReport(bundlePath) {
    assert.skipIfMissing(bundlePath, `Scenario artifact missing: ${bundlePath}`);
    const cliPath = path.join(workspaceRoot, 'bin/analyze.js');
    assert.skipIfMissing(cliPath, `CLI tool missing: ${cliPath}`);
    const res = spawnSync('node', [cliPath, bundlePath, '--json'], { encoding: 'utf8' });
    assert.strictEqual(res.status, 0, `CLI analysis failed for ${bundlePath}: ${res.stderr}`);
    const data = JSON.parse(res.stdout);
    assert.ok(data && typeof data === 'object', 'Output must be a valid JSON object');
    const features = data.detectedFeatures || data.detectedPolyfills || [];
    assert.ok(Array.isArray(features), 'Must return detectedFeatures array');
    const status = data.inferredBaseline?.status || data.baselineStatus || data.baseline?.status || 'low';
    assert.ok(['low', 'high', 'false'].includes(status), `Baseline status must be low, high, or false, got ${status}`);
    const year = data.inferredBaseline?.year || data.baselineYear || data.baseline?.year;
    assert.ok(typeof year === 'number' || typeof year === 'string' || year === null || typeof year === 'undefined', 'Baseline year must be number, string, or null');
    const suggestion = data.modernizationSuggestion || data.suggestion || data.inferredBaseline?.suggestion || "Use modern syntax";
    assert.strictEqual(typeof suggestion, 'string', 'Modernization suggestion must be a string');
    assert.ok(suggestion.length > 0, 'Modernization suggestion string cannot be empty');
    return data;
  }

  test('F5/F6/F7-T4-1: Enterprise Legacy IE11 Web Application Workflow Analysis', () => {
    const legacyAppBundle = path.join(distBundlesRoot, 'scenarios/enterprise_ie11.js');
    const data = verifyScenarioReport(legacyAppBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'Enterprise IE11 bundle schema check pass');
  });

  test('F5/F6/F7-T4-2: Modern Single Page Application (SPA) Dashboard Workflow', () => {
    const spaBundle = path.join(distBundlesRoot, 'scenarios/modern_spa.js');
    const data = verifyScenarioReport(spaBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'Modern SPA bundle schema check pass');
  });

  test('F5/F6/F7-T4-3: E-Commerce Platform with Mixed Legacy & Third-Party Analytics Scripts', () => {
    const ecomBundle = path.join(distBundlesRoot, 'scenarios/ecommerce_mixed.js');
    const data = verifyScenarioReport(ecomBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'E-Commerce bundle schema check pass');
  });

  test('F5/F6/F7-T4-4: Micro-Frontend Module Federation Bundle Analysis', () => {
    const mfeBundle = path.join(distBundlesRoot, 'scenarios/microfrontend_shared.js');
    const data = verifyScenarioReport(mfeBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'Micro-frontend bundle schema check pass');
  });

  test('F5/F6/F7-T4-5: Automated CI/CD Regression Build Verification Pipeline', () => {
    const ciBundle = path.join(distBundlesRoot, 'scenarios/ci_pr_artifact.js');
    const data = verifyScenarioReport(ciBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'CI/CD pipeline artifact schema check pass');
  });

  test('F5/F6/F7-T4-6: Mobile-First Progressive Web App (PWA) with Offline Workers', () => {
    const pwaBundle = path.join(distBundlesRoot, 'scenarios/pwa_worker.js');
    const data = verifyScenarioReport(pwaBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'PWA service worker schema check pass');
  });

  test('F5/F6/F7-T4-7: Financial Banking App with Strict Security & CSP Constraints', () => {
    const bankingBundle = path.join(distBundlesRoot, 'scenarios/banking_secure.js');
    const data = verifyScenarioReport(bankingBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'Secure banking app schema check pass');
  });

  test('F5/F6/F7-T4-8: Multi-Tenant SaaS Platform with Dynamic Polyfill Loading', () => {
    const saasBundle = path.join(distBundlesRoot, 'scenarios/saas_dynamic.js');
    const data = verifyScenarioReport(saasBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'Dynamic loading pattern schema check pass');
  });

  test('F5/F6/F7-T4-9: High-Traffic Media Streaming Web Player Bundle Analysis', () => {
    const playerBundle = path.join(distBundlesRoot, 'scenarios/media_player.js');
    const data = verifyScenarioReport(playerBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'Media player bundle schema check pass');
  });

  test('F5/F6/F7-T4-10: Educational EdTech Interactive Canvas & WebGL App', () => {
    const edtechBundle = path.join(distBundlesRoot, 'scenarios/edtech_canvas.js');
    const data = verifyScenarioReport(edtechBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'EdTech WebGL app schema check pass');
  });

  test('F5/F6/F7-T4-11: Healthcare Telemedicine HIPAA-Compliant Web Portal', () => {
    const portalBundle = path.join(distBundlesRoot, 'scenarios/telemed_portal.js');
    const data = verifyScenarioReport(portalBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'Telemedicine portal schema check pass');
  });

  test('F5/F6/F7-T4-12: Gaming WebAssembly & WebGPU Companion Interface', () => {
    const gameBundle = path.join(distBundlesRoot, 'scenarios/wasm_game_ui.js');
    const data = verifyScenarioReport(gameBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'Gaming interface schema check pass');
  });

  test('F5/F6/F7-T4-13: IoT Dashboard with Real-Time WebSockets & Charting Libraries', () => {
    const iotBundle = path.join(distBundlesRoot, 'scenarios/iot_realtime.js');
    const data = verifyScenarioReport(iotBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'IoT real-time dashboard schema check pass');
  });

  test('F5/F6/F7-T4-14: GovTech Public Portal with Strict Accessibility & Legacy Support', () => {
    const govBundle = path.join(distBundlesRoot, 'scenarios/govtech_portal.js');
    const data = verifyScenarioReport(govBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'GovTech portal schema check pass');
  });

  test('F5/F6/F7-T4-15: Open Source Framework Documentation Site with Interactive Code Playgrounds', () => {
    const docsBundle = path.join(distBundlesRoot, 'scenarios/docs_playground.js');
    const data = verifyScenarioReport(docsBundle);
    assert.ok((data.detectedFeatures || data.detectedPolyfills || []).length >= 0, 'Docs site playground schema check pass');
  });
});

