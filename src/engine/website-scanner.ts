import fs from 'node:fs';
import path from 'node:path';
import { scan, SourceMapConsumer, computeBaselineStatus, inferBaselineYear, generateRecommendations } from './index.js';
import type { RuleEntryWithMapping } from './index.js';

export interface BundleScanResult {
  url: string;
  fileName: string;
  sizeBytes: number;
  detectedPolyfills: RuleEntryWithMapping[];
  baselineStatus: 'high' | 'low' | 'false';
  baselineYear: number | null;
  nativeSyntaxStats: {
    asyncCount: number;
    classCount: number;
    yieldCount: number;
    inferredSyntaxFloorYear: number;
  };
}

export interface DuplicatePolyfillEntry {
  featureId: string;
  featureName: string;
  baselineYear: number | null;
  status: string;
  occurrences: Array<{
    bundleName: string;
    url: string;
    line?: number;
    column?: number;
    offset?: number;
    snippet?: string;
  }>;
}

export interface HighLevelRecommendation {
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  title: string;
  description: string;
  actionItem: string;
  affectedBundles: string[];
  affectedFeatures: string[];
}

export interface WebsiteScanReport {
  targetUrl: string;
  scannedAt: string;
  summary: {
    totalScriptsDiscovered: number;
    totalBundlesScanned: number;
    totalBytesScanned: number;
    totalPolyfillInstances: number;
    uniqueFeaturesPolyfilled: number;
    redundantPolyfillCount: number;
    redundantPercentage: number;
    duplicateFeatureCount: number;
    siteNativeSyntaxFloorYear: number;
    inferredPolyfillFloorYear: number | null;
    syntaxMismatchDetected: boolean;
    recommendedBrowserslist: string[];
  };
  highLevelRecommendations: HighLevelRecommendation[];
  duplicatePolyfills: DuplicatePolyfillEntry[];
  bundles: BundleScanResult[];
}

const DEFAULT_HEADERS: Record<string, string> = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
  'Sec-CH-UA': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
  'Sec-CH-UA-Mobile': '?0',
  'Sec-CH-UA-Platform': '"macOS"',
  'Upgrade-Insecure-Requests': '1',
};

export function inspectNativeSyntax(code: string): {
  asyncCount: number;
  classCount: number;
  yieldCount: number;
  inferredSyntaxFloorYear: number;
} {
  const asyncCount = (code.match(/\basync\s+function\b|\basync\s*\(/g) || []).length;
  const classCount = (code.match(/\bclass\s+[a-zA-Z0-9_$]+\s*\{|\bclass\s*\{/g) || []).length;
  const yieldCount = (code.match(/\byield\b/g) || []).length;

  let inferredSyntaxFloorYear = 2009; // ES5 default
  if (classCount > 0 || yieldCount > 0) {
    inferredSyntaxFloorYear = 2015; // ES2015 classes/generators
  }
  if (asyncCount > 0) {
    inferredSyntaxFloorYear = 2017; // ES2017 async/await
  }

  return {
    asyncCount,
    classCount,
    yieldCount,
    inferredSyntaxFloorYear,
  };
}

export function analyzeBundles(
  targetUrl: string,
  totalScriptsDiscovered: number,
  rawBundles: Array<{ url: string; fileName: string; code: string; sourceMapJson?: string }>
): WebsiteScanReport {
  const bundles: BundleScanResult[] = [];
  let totalBytesScanned = 0;
  let totalPolyfillInstances = 0;
  let siteNativeSyntaxFloorYear = 2009;

  const featureOccurrences = new Map<
    string,
    {
      featureName: string;
      baselineYear: number | null;
      status: string;
      occurrences: DuplicatePolyfillEntry['occurrences'];
    }
  >();

  for (const b of rawBundles) {
    totalBytesScanned += b.code.length;
    let sm: SourceMapConsumer | null = null;
    if (b.sourceMapJson) {
      try {
        sm = new SourceMapConsumer(JSON.parse(b.sourceMapJson));
      } catch (_) {}
    }
    const detected = scan(b.code, undefined, sm);
    const sorted = detected.slice().sort((x, y) => x.id.localeCompare(y.id));
    const status = computeBaselineStatus(sorted);
    const year = inferBaselineYear(sorted);
    const nativeSyntaxStats = inspectNativeSyntax(b.code);

    if (nativeSyntaxStats.inferredSyntaxFloorYear > siteNativeSyntaxFloorYear) {
      siteNativeSyntaxFloorYear = nativeSyntaxStats.inferredSyntaxFloorYear;
    }

    totalPolyfillInstances += sorted.length;

    for (const d of sorted) {
      let entry = featureOccurrences.get(d.id);
      if (!entry) {
        entry = {
          featureName: d.name,
          baselineYear: d.baselineYear,
          status: d.baselineStatus,
          occurrences: [],
        };
        featureOccurrences.set(d.id, entry);
      }
      entry.occurrences.push({
        bundleName: b.fileName,
        url: b.url,
        line: d.mapping?.minifiedPolyfill?.line,
        column: d.mapping?.minifiedPolyfill?.column,
        offset: d.mapping?.minifiedPolyfill?.byteOffset,
        snippet: d.mapping?.minifiedPolyfill?.snippet,
      });
    }

    bundles.push({
      url: b.url,
      fileName: b.fileName,
      sizeBytes: b.code.length,
      detectedPolyfills: sorted,
      baselineStatus: status,
      baselineYear: year,
      nativeSyntaxStats,
    });
  }

  const allDetected = bundles.flatMap((b) => b.detectedPolyfills);
  const inferredPolyfillFloorYear = inferBaselineYear(allDetected);

  // Count redundant polyfills (Baseline Widely available or older than site native syntax floor)
  const redundantInstances = allDetected.filter(
    (d) =>
      d.baselineStatus === 'high' ||
      (d.baselineYear !== null && d.baselineYear <= siteNativeSyntaxFloorYear)
  );
  const redundantPolyfillCount = redundantInstances.length;
  const redundantPercentage =
    totalPolyfillInstances > 0
      ? Math.round((redundantPolyfillCount / totalPolyfillInstances) * 100)
      : 0;

  // Duplicate polyfills across multiple bundles
  const duplicatePolyfills: DuplicatePolyfillEntry[] = [];
  for (const [featureId, entry] of featureOccurrences.entries()) {
    const distinctBundles = new Set(entry.occurrences.map((o) => o.bundleName));
    if (distinctBundles.size > 1) {
      duplicatePolyfills.push({
        featureId,
        featureName: entry.featureName,
        baselineYear: entry.baselineYear,
        status: entry.status,
        occurrences: entry.occurrences,
      });
    }
  }

  const syntaxMismatchDetected =
    inferredPolyfillFloorYear !== null &&
    siteNativeSyntaxFloorYear > inferredPolyfillFloorYear;

  const highLevelRecommendations: HighLevelRecommendation[] = [];

  // 1. Syntax vs Polyfill Target Mismatch Recommendation
  if (syntaxMismatchDetected) {
    const legacyFeatures = Array.from(featureOccurrences.values())
      .filter((f) => f.baselineYear !== null && f.baselineYear <= siteNativeSyntaxFloorYear)
      .map((f) => `${f.featureName} (${f.baselineYear})`);

    const bundlesWithNativeModern = bundles
      .filter((b) => b.nativeSyntaxStats.inferredSyntaxFloorYear >= siteNativeSyntaxFloorYear)
      .map((b) => b.fileName);

    highLevelRecommendations.push({
      priority: 'CRITICAL',
      title: `Syntax vs. Polyfill Target Mismatch (App uses ES${siteNativeSyntaxFloorYear}+ syntax, ships ES${inferredPolyfillFloorYear} polyfills)`,
      description: `Your application bundles (${bundlesWithNativeModern.slice(0, 3).join(', ')}) contain un-transpiled native ES${siteNativeSyntaxFloorYear}+ syntax (such as native async/await or ES6 classes). Any legacy browser older than ${siteNativeSyntaxFloorYear} will fail with a SyntaxError when parsing your application bundles, making all ES${inferredPolyfillFloorYear}–ES${siteNativeSyntaxFloorYear} polyfills 100% unreachable dead weight.`,
      actionItem: `Update your bundler/Babel/SWC target and browserslist to align with your minimum syntax floor (at least Baseline ${siteNativeSyntaxFloorYear} or Baseline Widely available) to stop injecting unreachable legacy polyfills.`,
      affectedBundles: bundles.filter((b) => b.detectedPolyfills.length > 0).map((b) => b.fileName),
      affectedFeatures: legacyFeatures,
    });
  }

  // 2. Duplicate Polyfills Across Chunks
  if (duplicatePolyfills.length > 0) {
    const dupNames = duplicatePolyfills.map((d) => d.featureName);
    const affectedBundleSet = new Set<string>();
    for (const d of duplicatePolyfills) {
      for (const o of d.occurrences) affectedBundleSet.add(o.bundleName);
    }
    highLevelRecommendations.push({
      priority: 'HIGH',
      title: `Eliminate ${duplicatePolyfills.length} Duplicate Polyfills Shipped Across Multiple Bundles`,
      description: `The same ECMAScript features (${dupNames.join(', ')}) are polyfilled multiple times across separate bundles (${Array.from(affectedBundleSet).join(', ')}). For example, both a dedicated polyfills chunk and a main/vendor bundle are defining identical prototype methods.`,
      actionItem: `Deduplicate polyfill injection by disabling inline polyfill shims in your application/vendor bundler config or configuring @babel/preset-env / SWC useBuiltIns: 'entry' in a single shared entry point.`,
      affectedBundles: Array.from(affectedBundleSet),
      affectedFeatures: dupNames,
    });
  }

  // 3. Baseline Widely available / Obsolete Polyfills Recommendation
  if (redundantPolyfillCount > 0) {
    const obsoleteFeatures = Array.from(featureOccurrences.values())
      .filter((f) => f.status === 'high')
      .map((f) => `${f.featureName} (Baseline ${f.baselineYear})`);

    const polyfillBundles = bundles.filter((b) => b.detectedPolyfills.some((d) => d.baselineStatus === 'high'));
    const totalPolyfillBundleKB = (
      polyfillBundles.reduce((acc, b) => acc + b.sizeBytes, 0) / 1024
    ).toFixed(1);

    highLevelRecommendations.push({
      priority: 'HIGH',
      title: `Remove ${obsoleteFeatures.length} Obsolete 'Baseline Widely available' Polyfills (${redundantPercentage}% of all detected polyfills)`,
      description: `${redundantPolyfillCount} of the ${totalPolyfillInstances} detected polyfill instances cover features that are Baseline Widely available (supported natively by Chrome, Edge, Firefox, and Safari for 30+ months). Bundles containing these polyfills total ${totalPolyfillBundleKB} KB.`,
      actionItem: `Set your browserslist query to "baseline widely available" or "defaults and fully supports es6-module" to drop unnecessary ES2015–ES2023 shims.`,
      affectedBundles: polyfillBundles.map((b) => b.fileName),
      affectedFeatures: obsoleteFeatures,
    });
  }

  // 4. Modern Baseline Newly available Polyfills (Keep / Informative)
  const modernLowFeatures = Array.from(featureOccurrences.values()).filter((f) => f.status === 'low');
  if (modernLowFeatures.length > 0) {
    highLevelRecommendations.push({
      priority: 'INFO',
      title: `Retain ${modernLowFeatures.length} Modern Polyfills (Baseline 2024–2025 Newly available)`,
      description: `Features such as ${modernLowFeatures.map((f) => `${f.featureName} (${f.baselineYear})`).join(', ')} reached Baseline recently (2024–2025). Retaining targeted polyfills for these specific features ensures safe adoption across users on slightly older browser versions.`,
      actionItem: `Keep only selective polyfills for post-2023 ECMAScript additions while removing pre-2023 shims.`,
      affectedBundles: bundles
        .filter((b) => b.detectedPolyfills.some((d) => d.baselineStatus === 'low'))
        .map((b) => b.fileName),
      affectedFeatures: modernLowFeatures.map((f) => f.featureName),
    });
  }

  if (highLevelRecommendations.length === 0) {
    highLevelRecommendations.push({
      priority: 'INFO',
      title: 'Clean Modern Bundle Architecture — Zero Redundant Polyfills Detected',
      description: 'All scanned bundles rely on native Web Platform features without shipping obsolete or duplicate polyfill shims.',
      actionItem: 'Maintain current browserslist configuration.',
      affectedBundles: [],
      affectedFeatures: [],
    });
  }

  return {
    targetUrl,
    scannedAt: new Date().toISOString(),
    summary: {
      totalScriptsDiscovered,
      totalBundlesScanned: bundles.length,
      totalBytesScanned,
      totalPolyfillInstances,
      uniqueFeaturesPolyfilled: featureOccurrences.size,
      redundantPolyfillCount,
      redundantPercentage,
      duplicateFeatureCount: duplicatePolyfills.length,
      siteNativeSyntaxFloorYear,
      inferredPolyfillFloorYear,
      syntaxMismatchDetected,
      recommendedBrowserslist: [
        'baseline widely available',
        'defaults and fully supports es6-module',
      ],
    },
    highLevelRecommendations,
    duplicatePolyfills,
    bundles,
  };
}

export async function scanWebsiteUrl(
  targetUrl: string,
  options: { maxBundles?: number; headers?: Record<string, string> } = {}
): Promise<WebsiteScanReport> {
  const maxBundles = options.maxBundles ?? 20;
  const headers: Record<string, string> = { ...DEFAULT_HEADERS, ...(options.headers || {}) };

  const res = await fetch(targetUrl, { headers });
  if (!res.ok) {
    const datadome = res.headers.get('x-datadome');
    const cfRay = res.headers.get('cf-ray');
    let wafHint = '';
    if (datadome) {
      wafHint = ' (Blocked by DataDome Anti-Bot Protection — try pasting a bundle URL or code directly)';
    } else if (cfRay && res.status === 403) {
      wafHint = ' (Blocked by Cloudflare WAF challenge)';
    }
    throw new Error(`HTTP ${res.status} fetching ${targetUrl}${wafHint}`);
  }

  // Forward any session/WAF cookies (such as datadome) to subsequent script requests
  const setCookies = typeof (res.headers as any).getSetCookie === 'function'
    ? (res.headers as any).getSetCookie()
    : [];
  const cookieHeader = setCookies
    .map((c: string) => c.split(';')[0])
    .filter(Boolean)
    .join('; ');

  const scriptHeaders: Record<string, string> = {
    ...headers,
    Referer: targetUrl,
  };
  if (cookieHeader) {
    scriptHeaders['Cookie'] = cookieHeader;
  }

  const contentType = res.headers.get('content-type') || '';
  const bodyText = await res.text();

  // Check if URL is directly a JavaScript file
  if (
    targetUrl.endsWith('.js') ||
    contentType.includes('javascript') ||
    contentType.includes('ecmascript')
  ) {
    const fileName = path.basename(new URL(targetUrl).pathname) || 'bundle.js';
    return analyzeBundles(targetUrl, 1, [{ url: targetUrl, fileName, code: bodyText }]);
  }

  // Otherwise extract script src URLs from HTML
  const scriptRegex = /<script[^>]+src=["']([^"']+\.js(?:\?[^"']*)?)["']/gi;
  const urls = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = scriptRegex.exec(bodyText)) !== null) {
    let u = match[1];
    if (u.startsWith('//')) {
      u = 'https:' + u;
    } else if (u.startsWith('/')) {
      const origin = new URL(targetUrl).origin;
      u = origin + u;
    } else if (!u.startsWith('http')) {
      try {
        u = new URL(u, targetUrl).href;
      } catch (_) {}
    }
    if (u.startsWith('http')) {
      urls.add(u);
    }
  }

  const priorityRegex = /(polyfills|vendor|framework|main-|_app-|index-|webpack-|app-|bundle|chunk)/i;
  const urlList = Array.from(urls).sort((a, b) => {
    const aPri = priorityRegex.test(a) ? 0 : 1;
    const bPri = priorityRegex.test(b) ? 0 : 1;
    return aPri - bPri;
  });

  const selectedUrls = urlList.slice(0, maxBundles);
  const rawBundles: Array<{ url: string; fileName: string; code: string; sourceMapJson?: string }> = [];

  for (let i = 0; i < selectedUrls.length; i++) {
    const scriptUrl = selectedUrls[i];
    const cleanName =
      path.basename(new URL(scriptUrl).pathname).replace(/[^a-zA-Z0-9._-]/g, '_') ||
      `bundle_${i}.js`;
    try {
      const bRes = await fetch(scriptUrl, { headers: scriptHeaders });
      if (!bRes.ok) continue;
      const code = await bRes.text();

      let sourceMapJson: string | undefined;
      const mapMatch = code.match(/\/\/# sourceMappingURL=([^\s]+)/);
      if (mapMatch && mapMatch[1] && !mapMatch[1].startsWith('data:')) {
        try {
          const mapUrl = new URL(mapMatch[1], scriptUrl).href;
          const mRes = await fetch(mapUrl, { headers: scriptHeaders });
          if (mRes.ok) {
            const mapText = await mRes.text();
            if (mapText.trim().startsWith('{')) {
              sourceMapJson = mapText;
            }
          }
        } catch (_) {}
      }

      rawBundles.push({ url: scriptUrl, fileName: cleanName, code, sourceMapJson });
    } catch (_) {
      // Skip unreachable script chunks
    }
  }

  return analyzeBundles(targetUrl, urls.size, rawBundles);
}

export function formatWebsiteMarkdownReport(report: WebsiteScanReport): string {
  const s = report.summary;
  const lines: string[] = [];

  lines.push(`# Website Polyfill & Transform Analysis: \`${report.targetUrl}\``);
  lines.push(`*Scanned at: ${report.scannedAt}*`);
  lines.push('');

  lines.push('## 🎯 High-Level Executive Summary & Actionable Recommendations');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('| :--- | :--- |');
  lines.push(`| **Bundles Analyzed** | **${s.totalBundlesScanned}** of ${s.totalScriptsDiscovered} discovered scripts (${(s.totalBytesScanned / 1024).toFixed(1)} KB total) |`);
  lines.push(`| **Polyfill Instances Detected** | **${s.totalPolyfillInstances}** instances across **${s.uniqueFeaturesPolyfilled}** distinct ECMAScript features |`);
  lines.push(`| **Redundant Polyfills (Baseline Widely available)** | **${s.redundantPolyfillCount} / ${s.totalPolyfillInstances} (${s.redundantPercentage}%)** are widely available natively |`);
  lines.push(`| **Duplicate Polyfills Across Chunks** | **${s.duplicateFeatureCount}** features polyfilled in multiple separate bundles |`);
  lines.push(`| **Site Minimum Native Syntax Floor** | **ES${s.siteNativeSyntaxFloorYear}** (inferred from native \`async/await\` & \`class\` usage) |`);
  lines.push(`| **Oldest Polyfill Shipped** | **${s.inferredPolyfillFloorYear ? `Baseline ${s.inferredPolyfillFloorYear}` : 'None'}** |`);
  lines.push(`| **Recommended \`browserslist\`** | \`${s.recommendedBrowserslist.join(', ')}\` |`);
  lines.push('');

  for (const rec of report.highLevelRecommendations) {
    const icon =
      rec.priority === 'CRITICAL'
        ? '🚨'
        : rec.priority === 'HIGH'
          ? '⚠️'
          : rec.priority === 'MEDIUM'
            ? '💡'
            : 'ℹ️';
    lines.push(`### ${icon} [${rec.priority}] ${rec.title}`);
    lines.push(`- **Finding**: ${rec.description}`);
    lines.push(`- **What You Need To Do**: **${rec.actionItem}**`);
    if (rec.affectedFeatures.length > 0) {
      lines.push(`- **Affected Features**: \`${rec.affectedFeatures.join('`, `')}\``);
    }
    if (rec.affectedBundles.length > 0) {
      lines.push(`- **Affected Bundles**: \`${rec.affectedBundles.join('`, `')}\``);
    }
    lines.push('');
  }

  if (report.duplicatePolyfills.length > 0) {
    lines.push('---');
    lines.push('## 🔄 Duplicate Polyfills Shipped Across Multiple Bundles');
    lines.push('');
    lines.push('| Feature | Baseline Year | Occurrences Across Bundles |');
    lines.push('| :--- | :---: | :--- |');
    for (const dup of report.duplicatePolyfills) {
      const occStr = dup.occurrences
        .map((o) => `\`${o.bundleName}\` (offset ${o.offset ?? '?'})`)
        .join(', ');
      lines.push(`| **${dup.featureName}** (\`${dup.featureId}\`) | ${dup.baselineYear ?? 'N/A'} | ${occStr} |`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('## 📦 Bundle-by-Bundle Breakdown & 1:1 Minified AST Matches');
  lines.push('');

  for (const b of report.bundles) {
    const kb = (b.sizeBytes / 1024).toFixed(1);
    if (b.detectedPolyfills.length === 0) {
      lines.push(`- ✅ **\`${b.fileName}\`** (${kb} KB) — **0 polyfills detected** *(Native syntax floor: ES${b.nativeSyntaxStats.inferredSyntaxFloorYear}, ${b.nativeSyntaxStats.asyncCount} async fns)*`);
      continue;
    }

    lines.push(`### 🔍 \`${b.fileName}\` (${kb} KB) — ${b.detectedPolyfills.length} Polyfills Detected`);
    lines.push(`- **Source URL**: \`${b.url}\``);
    lines.push(`- **Native Syntax Usage**: ES${b.nativeSyntaxStats.inferredSyntaxFloorYear} (${b.nativeSyntaxStats.asyncCount} native \`async\` functions, ${b.nativeSyntaxStats.classCount} native \`class\` definitions)`);
    lines.push('');
    lines.push('| Feature ID | Feature Name | Baseline Year | Status | Offset | 1:1 Minified AST Snippet |');
    lines.push('| :--- | :--- | :---: | :---: | :---: | :--- |');
    for (const d of b.detectedPolyfills) {
      const snippet = (d.mapping?.minifiedPolyfill?.snippet || '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
      const offset = d.mapping?.minifiedPolyfill?.byteOffset ?? 'N/A';
      const statusLabel =
        d.baselineStatus === 'high'
          ? 'Baseline Widely available'
          : d.baselineStatus === 'low'
            ? 'Baseline Newly available'
            : 'Limited availability';
      lines.push(
        `| \`${d.id}\` | **${d.name}** | ${d.baselineYear ?? 'N/A'} | \`${statusLabel}\` | \`${offset}\` | \`${snippet}\` |`
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}
