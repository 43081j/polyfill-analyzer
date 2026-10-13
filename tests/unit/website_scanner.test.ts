import { describe, it, expect } from 'vitest';
import { analyzeBundles, formatWebsiteMarkdownReport } from '../../src/engine/index.js';

describe('Website Scanner & High-Level Recommendation Engine', () => {
  it('detects syntax vs. polyfill mismatch and duplicate polyfills across chunks', () => {
    const rawBundles = [
      {
        url: 'https://example.com/_next/static/chunks/polyfills.js',
        fileName: 'polyfills.js',
        code: `
          Ce({global:!0,constructor:!0,wrap:!0,forced:sm},{Promise:vm});
          Ce({target:"Array",proto:!0},{at:function(t){var e=it(this),r=de(e),n=ce(t),o=n>=0?n:r+n;return o<0||o>=r?void 0:e[o]}});
          Ce({target:"Object",stat:!0},{hasOwn:ut});
        `,
      },
      {
        url: 'https://example.com/_next/static/chunks/main.js',
        fileName: 'main.js',
        code: `
          Array.prototype.at=function(e){var t=Math.trunc(e)||0;if(t<0&&(t+=this.length),!(t<0||t>=this.length))return this[t]};
          Object.hasOwn=function(e,t){return Object.prototype.hasOwnProperty.call(Object(e),t)};
          async function initApp() {
            const res = await fetch('/api/status');
            return res.json();
          }
          class AppController {}
        `,
      },
    ];

    const report = analyzeBundles('https://example.com/', 10, rawBundles);

    // 1. Verify summary stats
    expect(report.summary.totalBundlesScanned).toBe(2);
    expect(report.summary.totalPolyfillInstances).toBe(5);
    expect(report.summary.uniqueFeaturesPolyfilled).toBe(3); // Promise, array-at, object-has-own
    expect(report.summary.siteNativeSyntaxFloorYear).toBe(2017); // async function
    expect(report.summary.inferredPolyfillFloorYear).toBe(2015); // Promise
    expect(report.summary.syntaxMismatchDetected).toBe(true);
    expect(report.summary.duplicateFeatureCount).toBe(2); // array-at and object-has-own

    // 2. Verify high-level recommendations at top
    expect(report.highLevelRecommendations.length).toBeGreaterThanOrEqual(3);
    const mismatchRec = report.highLevelRecommendations.find((r) =>
      r.title.includes('Un-polyfilled / Un-transformed Feature')
    );
    expect(mismatchRec).toBeDefined();
    expect(mismatchRec?.priority).toBe('INFO');

    const dupRec = report.highLevelRecommendations.find((r) =>
      r.title.includes('Duplicate Polyfills')
    );
    expect(dupRec).toBeDefined();
    expect(dupRec?.affectedFeatures).toContain('Array.prototype.at');
    expect(dupRec?.affectedFeatures).toContain('Object.hasOwn');

    // 3. Verify markdown report formatting
    const md = formatWebsiteMarkdownReport(report);
    expect(md).toContain('# Website Polyfill & Transform Analysis: `https://example.com/`');
    expect(md).toContain('## 🎯 High-Level Executive Summary & Actionable Recommendations');
    expect(md).toContain('Un-polyfilled / Un-transformed Feature');
    expect(md).toContain('## 🔄 Duplicate Polyfills Shipped Across Multiple Bundles');
  });
});
