import fs from 'node:fs';
import path from 'node:path';
import { parse, Lang } from '@ast-grep/napi';
import { features as webFeaturesData } from 'web-features';
import {
  scan,
  SourceMapConsumer,
  computeBaselineStatus,
  inferBaselineYear,
  generateRecommendations,
  evaluateBaselineTarget,
} from './index.js';
import { getEstimatedPolyfillBytes } from '../catalog/index.js';
import type {
  RuleEntryWithMapping,
  BaselineTargetOptions,
  BaselineTargetEvaluation,
} from './index.js';

function resolveNativeFeatureBaselineDate(
  webFeatureId: string,
  fallbackDate: string,
  bcdId?: string
): string {
  const wfMap = webFeaturesData as Record<string, any>;
  const feat = wfMap[webFeatureId];
  const byKey = bcdId ? feat?.status?.by_compat_key?.[bcdId] : undefined;
  const raw = byKey?.baseline_low_date ?? feat?.status?.baseline_low_date;
  if (typeof raw === 'string' && raw.length > 0) {
    return raw.replace(/^≤/, '');
  }
  return fallbackDate;
}

export interface DetectedNativeFeature {
  name: string;
  baselineDate: string;
  year: number;
  kind: 'syntax' | 'builtin';
  ruleId?: string;
}

export interface BundleScanResult {
  url: string;
  fileName: string;
  sizeBytes: number;
  detectedPolyfills: RuleEntryWithMapping[];
  baselineStatus: 'high' | 'low' | 'false';
  baselineYear: number | null;
  isDedicatedPolyfillBundle?: boolean;
  obsoletePolyfillCount?: number;
  retainedPolyfillCount?: number;
  estimatedSavingsBytes?: number;
  estimatedPostRemovalBytes?: number;
  estimatedSavingsPercentage?: number;
  nativeSyntaxStats: {
    asyncCount: number;
    classCount: number;
    yieldCount: number;
    inferredSyntaxFloorYear: number;
    mostModernFeatureName?: string;
    mostModernFeatureBaselineDate?: string;
    detectedFeatures?: DetectedNativeFeature[];
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
  baselineTarget?: BaselineTargetEvaluation;
  summary: {
    totalScriptsDiscovered: number;
    totalBundlesScanned: number;
    totalBytesScanned: number;
    totalPolyfillInstances: number;
    uniqueFeaturesPolyfilled: number;
    redundantPolyfillCount: number;
    redundantPercentage: number;
    polyfillsBundleTotalBytes: number;
    estimatedTotalSavingsBytes: number;
    estimatedPostRemovalPolyfillBundleBytes: number;
    estimatedPolyfillBundleSavingsPercentage: number;
    duplicateFeatureCount: number;
    siteNativeSyntaxFloorYear: number;
    siteMostModernFeatureName?: string;
    siteMostModernFeatureBaselineDate?: string;
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
  mostModernFeatureName?: string;
  mostModernFeatureBaselineDate?: string;
  detectedFeatures: DetectedNativeFeature[];
} {
  const asyncCount = (code.match(/\basync\s+function\b|\basync\s*\(/g) || []).length;
  const classCount = (code.match(/\bclass\s+[a-zA-Z0-9_$]+\s*\{|\bclass\s*\{/g) || []).length;
  const yieldCount = (code.match(/\byield\b/g) || []).length;

  const detectedFeatures: DetectedNativeFeature[] = [];

  if (classCount > 0) {
    detectedFeatures.push({
      name: 'ES6 classes',
      baselineDate: resolveNativeFeatureBaselineDate('class-syntax', '2015-09-30'),
      year: 2015,
      kind: 'syntax',
    });
  } else if (yieldCount > 0) {
    detectedFeatures.push({
      name: 'generator functions',
      baselineDate: resolveNativeFeatureBaselineDate('generators', '2015-09-30'),
      year: 2015,
      kind: 'syntax',
    });
  }

  if (asyncCount > 0) {
    detectedFeatures.push({
      name: 'async/await',
      baselineDate: resolveNativeFeatureBaselineDate('async-await', '2017-04-05'),
      year: 2017,
      kind: 'syntax',
    });
  }

  // Use AST-grep (@ast-grep/napi) to deterministically detect modern un-transformed syntax
  // and candidate un-polyfilled built-in API usages
  try {
    const root = parse(Lang.JavaScript, code).root();

    // 1. Un-transformed ES2018-ES2024 Syntax
    if (root.find({ rule: { kind: 'spread_element', inside: { kind: 'object' } } })) {
      detectedFeatures.push({
        name: 'Object rest/spread ({...obj})',
        baselineDate: resolveNativeFeatureBaselineDate(
          'spread',
          '2020-01-15',
          'javascript.operators.spread.spread_in_object_literals'
        ),
        year: 2018,
        kind: 'syntax',
      });
    }

    if (
      root.find({ rule: { pattern: '$A?.$B' } }) ||
      root.find({ rule: { pattern: '$A?.[$B]' } }) ||
      root.find({ rule: { pattern: '$A?.($B)' } })
    ) {
      detectedFeatures.push({
        name: 'Optional chaining (?.)',
        baselineDate: resolveNativeFeatureBaselineDate(
          'optional-chaining',
          '2020-03-24',
          'javascript.operators.optional_chaining'
        ),
        year: 2020,
        kind: 'syntax',
      });
    }

    if (root.find({ rule: { pattern: '$A ?? $B' } })) {
      detectedFeatures.push({
        name: 'Nullish coalescing (??)',
        baselineDate: resolveNativeFeatureBaselineDate('nullish-coalescing', '2020-03-24'),
        year: 2020,
        kind: 'syntax',
      });
    }

    if (
      root.find({ rule: { pattern: '$A ??= $B' } }) ||
      root.find({ rule: { pattern: '$A ||= $B' } }) ||
      root.find({ rule: { pattern: '$A &&= $B' } })
    ) {
      detectedFeatures.push({
        name: 'Logical assignment (??=, ||=, &&=)',
        baselineDate: resolveNativeFeatureBaselineDate('logical-assignments', '2020-09-16'),
        year: 2020,
        kind: 'syntax',
      });
    }

    if (root.find({ rule: { kind: 'private_property_identifier' } })) {
      detectedFeatures.push({
        name: 'Private class fields (#field)',
        baselineDate: resolveNativeFeatureBaselineDate(
          'class-syntax',
          '2021-09-20',
          'javascript.classes.private_class_fields'
        ),
        year: 2021,
        kind: 'syntax',
      });
    }

    if (root.find({ rule: { kind: 'class_static_block' } })) {
      detectedFeatures.push({
        name: 'Class static initialization blocks (static {})',
        baselineDate: resolveNativeFeatureBaselineDate(
          'class-syntax',
          '2022-03-14',
          'javascript.classes.static.initialization_blocks'
        ),
        year: 2022,
        kind: 'syntax',
      });
    }

    // 2. Candidate Modern Built-in API Usages (filtered in analyzeBundles against polyfilled featureOccurrences)
    const builtinCandidates: Array<{
      pattern: string;
      ruleId: string;
      name: string;
      webFeatureId: string;
      bcdId?: string;
      fallbackDate: string;
      year: number;
    }> = [
      {
        pattern: 'globalThis',
        ruleId: 'global-this',
        name: 'globalThis',
        webFeatureId: 'globalthis',
        fallbackDate: '2020-01-15',
        year: 2020,
      },
      {
        pattern: 'Object.fromEntries($$$)',
        ruleId: 'object-from-entries',
        name: 'Object.fromEntries',
        webFeatureId: 'object-object',
        bcdId: 'javascript.builtins.Object.fromEntries',
        fallbackDate: '2020-01-15',
        year: 2020,
      },
      {
        pattern: '$A.matchAll($$$)',
        ruleId: 'string-match-all',
        name: 'String.prototype.matchAll',
        webFeatureId: 'string-matchall',
        fallbackDate: '2020-01-15',
        year: 2020,
      },
      {
        pattern: '$A.replaceAll($$$)',
        ruleId: 'string-replace-all',
        name: 'String.prototype.replaceAll',
        webFeatureId: 'string-replaceall',
        fallbackDate: '2020-09-16',
        year: 2020,
      },
      {
        pattern: 'Object.hasOwn($$$)',
        ruleId: 'object-has-own',
        name: 'Object.hasOwn',
        webFeatureId: 'object-hasown',
        fallbackDate: '2022-03-14',
        year: 2022,
      },
      {
        pattern: 'structuredClone($$$)',
        ruleId: 'structured-clone',
        name: 'structuredClone',
        webFeatureId: 'structured-clone',
        fallbackDate: '2022-03-14',
        year: 2022,
      },
      {
        pattern: '$A.findLast($$$)',
        ruleId: 'array-find-last',
        name: 'Array.prototype.findLast',
        webFeatureId: 'array-findlast',
        fallbackDate: '2022-09-12',
        year: 2022,
      },
      {
        pattern: '$A.toSorted($$$)',
        ruleId: 'array-change-by-copy',
        name: 'Array.prototype.toSorted',
        webFeatureId: 'array-by-copy',
        fallbackDate: '2023-05-09',
        year: 2023,
      },
      {
        pattern: 'Object.groupBy($$$)',
        ruleId: 'object-group-by',
        name: 'Object.groupBy',
        webFeatureId: 'array-group',
        fallbackDate: '2024-03-05',
        year: 2024,
      },
    ];

    for (const cand of builtinCandidates) {
      if (root.find({ rule: { pattern: cand.pattern } })) {
        detectedFeatures.push({
          name: cand.name,
          baselineDate: resolveNativeFeatureBaselineDate(
            cand.webFeatureId,
            cand.fallbackDate,
            cand.bcdId
          ),
          year: cand.year,
          kind: 'builtin',
          ruleId: cand.ruleId,
        });
      }
    }
  } catch (_) {}

  const syntaxOnly = detectedFeatures.filter((f) => f.kind === 'syntax');
  syntaxOnly.sort((a, b) => b.baselineDate.localeCompare(a.baselineDate));

  const inferredSyntaxFloorYear =
    syntaxOnly.length > 0 ? Math.max(...syntaxOnly.map((f) => f.year)) : 2009;
  const mostModernFeatureName = syntaxOnly[0]?.name;
  const mostModernFeatureBaselineDate = syntaxOnly[0]?.baselineDate;

  return {
    asyncCount,
    classCount,
    yieldCount,
    inferredSyntaxFloorYear,
    mostModernFeatureName,
    mostModernFeatureBaselineDate,
    detectedFeatures,
  };
}

export function analyzeBundles(
  targetUrl: string,
  totalScriptsDiscovered: number,
  rawBundles: Array<{ url: string; fileName: string; code: string; sourceMapJson?: string }>,
  targetOptions?: BaselineTargetOptions
): WebsiteScanReport {
  const bundles: BundleScanResult[] = [];
  let totalBytesScanned = 0;
  let totalPolyfillInstances = 0;
  let siteNativeSyntaxFloorYear = 2009;
  let siteMostModernFeatureName: string | undefined;
  let siteMostModernFeatureBaselineDate: string | undefined;

  const featureOccurrences = new Map<
    string,
    {
      featureName: string;
      baselineYear: number | null;
      baselineLowDate: string | null;
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
      siteMostModernFeatureName = nativeSyntaxStats.mostModernFeatureName;
      siteMostModernFeatureBaselineDate = nativeSyntaxStats.mostModernFeatureBaselineDate;
    }

    totalPolyfillInstances += sorted.length;

    for (const d of sorted) {
      let entry = featureOccurrences.get(d.id);
      if (!entry) {
        entry = {
          featureName: d.name,
          baselineYear: d.baselineYear,
          baselineLowDate: d.baselineLowDate ?? null,
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
  const baselineTarget = evaluateBaselineTarget(allDetected, targetOptions);
  const supportedByTargetIds = new Set(
    baselineTarget.supportedByTargetFeatures.map((r) => r.id)
  );
  const exceedingTargetIds = new Set(
    baselineTarget.exceedingTargetFeatures.map((r) => r.id)
  );

  // Count redundant/obsolete polyfills relative to the declared Baseline target
  // (defaults to Baseline Widely available when no custom target is specified)
  const isFeatureObsoleteForTarget = (d: RuleEntryWithMapping): boolean =>
    baselineTarget.mode !== 'default'
      ? supportedByTargetIds.has(d.id)
      : supportedByTargetIds.has(d.id) ||
        (d.baselineYear !== null && d.baselineYear <= siteNativeSyntaxFloorYear);

  const redundantInstances = allDetected.filter(isFeatureObsoleteForTarget);
  const redundantPolyfillCount = redundantInstances.length;
  const redundantPercentage =
    totalPolyfillInstances > 0
      ? Math.round((redundantPolyfillCount / totalPolyfillInstances) * 100)
      : 0;

  // Compute per-bundle and per-feature byte/KB savings estimates
  let polyfillsBundleTotalBytes = 0;
  let estimatedTotalSavingsBytes = 0;

  for (const b of bundles) {
    if (b.detectedPolyfills.length === 0) {
      b.isDedicatedPolyfillBundle = false;
      b.obsoletePolyfillCount = 0;
      b.retainedPolyfillCount = 0;
      b.estimatedSavingsBytes = 0;
      b.estimatedPostRemovalBytes = b.sizeBytes;
      b.estimatedSavingsPercentage = 0;
      continue;
    }

    polyfillsBundleTotalBytes += b.sizeBytes;
    const baseWeights = b.detectedPolyfills.map((d) =>
      getEstimatedPolyfillBytes(d.id, d.mapping?.minifiedPolyfill?.snippet?.length)
    );
    const totalBaseWeight = baseWeights.reduce((acc, w) => acc + w, 0) || 1;

    const isDedicatedPolyfillBundle =
      /\b(polyfills?|core-js|babel-polyfill|vendor-polyfills?)\b/i.test(b.fileName) ||
      (b.detectedPolyfills.length >= 5 &&
        b.nativeSyntaxStats.asyncCount === 0 &&
        b.nativeSyntaxStats.classCount === 0 &&
        totalBaseWeight >= b.sizeBytes * 0.3);

    b.isDedicatedPolyfillBundle = isDedicatedPolyfillBundle;

    let obsoleteCount = 0;
    let obsoleteWeightSum = 0;

    b.detectedPolyfills.forEach((d, idx) => {
      const baseW = baseWeights[idx];
      const obsolete = isFeatureObsoleteForTarget(d);
      if (isDedicatedPolyfillBundle) {
        d.estimatedSizeBytes = Math.round(b.sizeBytes * (baseW / totalBaseWeight));
      } else {
        const capBytes = Math.round(b.sizeBytes * 0.85);
        d.estimatedSizeBytes =
          totalBaseWeight > capBytes
            ? Math.round(capBytes * (baseW / totalBaseWeight))
            : baseW;
      }
      if (obsolete) {
        obsoleteCount++;
        obsoleteWeightSum += d.estimatedSizeBytes;
      }
    });

    if (isDedicatedPolyfillBundle && obsoleteCount === b.detectedPolyfills.length) {
      b.estimatedSavingsBytes = b.sizeBytes;
    } else {
      b.estimatedSavingsBytes = Math.min(b.sizeBytes, obsoleteWeightSum);
    }

    b.obsoletePolyfillCount = obsoleteCount;
    b.retainedPolyfillCount = b.detectedPolyfills.length - obsoleteCount;
    b.estimatedPostRemovalBytes = Math.max(0, b.sizeBytes - b.estimatedSavingsBytes);
    b.estimatedSavingsPercentage =
      b.sizeBytes > 0 ? Math.round((b.estimatedSavingsBytes / b.sizeBytes) * 100) : 0;

    estimatedTotalSavingsBytes += b.estimatedSavingsBytes;
  }

  // Refine each application bundle's un-polyfilled & un-transformed feature floor
  // by excluding any built-in feature that is polyfilled in any bundle on the site
  siteNativeSyntaxFloorYear = 2009;
  siteMostModernFeatureName = undefined;
  siteMostModernFeatureBaselineDate = undefined;

  for (const b of bundles) {
    if (b.isDedicatedPolyfillBundle) {
      continue;
    }
    const rawFeatures = b.nativeSyntaxStats.detectedFeatures || [];
    const unpolyfilledFeatures = rawFeatures.filter(
      (f) => f.kind === 'syntax' || !f.ruleId || !featureOccurrences.has(f.ruleId)
    );
    unpolyfilledFeatures.sort((x, y) => y.baselineDate.localeCompare(x.baselineDate));
    b.nativeSyntaxStats.detectedFeatures = unpolyfilledFeatures;

    if (unpolyfilledFeatures.length > 0) {
      b.nativeSyntaxStats.inferredSyntaxFloorYear = Math.max(
        ...unpolyfilledFeatures.map((f) => f.year)
      );
      b.nativeSyntaxStats.mostModernFeatureName = unpolyfilledFeatures[0].name;
      b.nativeSyntaxStats.mostModernFeatureBaselineDate = unpolyfilledFeatures[0].baselineDate;

      if (
        !siteMostModernFeatureBaselineDate ||
        unpolyfilledFeatures[0].baselineDate > siteMostModernFeatureBaselineDate
      ) {
        siteMostModernFeatureBaselineDate = unpolyfilledFeatures[0].baselineDate;
        siteMostModernFeatureName = unpolyfilledFeatures[0].name;
      }
      if (b.nativeSyntaxStats.inferredSyntaxFloorYear > siteNativeSyntaxFloorYear) {
        siteNativeSyntaxFloorYear = b.nativeSyntaxStats.inferredSyntaxFloorYear;
      }
    }
  }

  const estimatedPostRemovalPolyfillBundleBytes = Math.max(
    0,
    polyfillsBundleTotalBytes - estimatedTotalSavingsBytes
  );
  const estimatedPolyfillBundleSavingsPercentage =
    polyfillsBundleTotalBytes > 0
      ? Math.round((estimatedTotalSavingsBytes / polyfillsBundleTotalBytes) * 100)
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

  const recommendedBrowserslist =
    baselineTarget.mode === 'target-year'
      ? [`baseline ${baselineTarget.targetYear}`, 'defaults and fully supports es6-module']
      : baselineTarget.mode === 'widely-available-on-date'
        ? [`widely available on ${baselineTarget.widelyAvailableOnDate}`, 'baseline widely available']
        : ['baseline widely available', 'defaults and fully supports es6-module'];

  const coreBrowsers = baselineTarget.compatibleBrowsers
    .filter((b) => ['chrome', 'edge', 'firefox', 'safari'].includes(b.browser))
    .map((b) => `${b.browser} ${b.version}+`)
    .join(', ');

  const highLevelRecommendations: HighLevelRecommendation[] = [];

  // 1. Duplicate Polyfills Across Chunks
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

  // 2. Obsolete Polyfills Recommendation (sensitive to declared Baseline target + KB savings)
  const obsoleteFeatures = Array.from(featureOccurrences.entries())
    .filter(([id]) => supportedByTargetIds.has(id))
    .map(([, f]) => `${f.featureName} (Baseline ${f.baselineYear})`);

  const totalPolyfillBundleKB = (polyfillsBundleTotalBytes / 1024).toFixed(1);
  const estimatedSavingsKB = (estimatedTotalSavingsBytes / 1024).toFixed(1);
  const estimatedPostRemovalKB = (estimatedPostRemovalPolyfillBundleBytes / 1024).toFixed(1);

  if (obsoleteFeatures.length > 0) {
    const polyfillBundles = bundles.filter((b) =>
      b.detectedPolyfills.some((d) => supportedByTargetIds.has(d.id))
    );

    if (baselineTarget.mode !== 'default') {
      highLevelRecommendations.push({
        priority: 'HIGH',
        title: `Remove ${obsoleteFeatures.length} Obsolete '${baselineTarget.shortTargetName}' Polyfills — Save ~${estimatedSavingsKB} KB (${estimatedPolyfillBundleSavingsPercentage}% of polyfill bundle)`,
        description: `${redundantPolyfillCount} of the ${totalPolyfillInstances} detected polyfill instances cover features that reached Baseline on or before ${baselineTarget.featureCutoffDate} and are natively supported by your declared target (${baselineTarget.targetLabel}${coreBrowsers ? ` — ${coreBrowsers}` : ''}). Removing these ${obsoleteFeatures.length} unneeded polyfills is estimated to shrink your polyfill bundle(s) by ~${estimatedSavingsKB} KB (${estimatedPolyfillBundleSavingsPercentage}% reduction), from ${totalPolyfillBundleKB} KB down to ~${estimatedPostRemovalKB} KB.`,
        actionItem: `Configure your bundler/browserslist target for ${baselineTarget.shortTargetName} (e.g. "${recommendedBrowserslist[0]}") to drop all ${obsoleteFeatures.length} obsolete pre-${baselineTarget.featureCutoffDate} shims and save ~${estimatedSavingsKB} KB.`,
        affectedBundles: polyfillBundles.map((b) => b.fileName),
        affectedFeatures: obsoleteFeatures,
      });
    } else {
      highLevelRecommendations.push({
        priority: 'HIGH',
        title: `Remove ${obsoleteFeatures.length} Obsolete 'Baseline Widely available' Polyfills — Save ~${estimatedSavingsKB} KB (${estimatedPolyfillBundleSavingsPercentage}% of polyfill bundle)`,
        description: `${redundantPolyfillCount} of the ${totalPolyfillInstances} detected polyfill instances cover features that are Baseline Widely available (supported natively by Chrome, Edge, Firefox, and Safari for 30+ months, baseline_low_date <= ${baselineTarget.featureCutoffDate}). Removing these unneeded polyfills is estimated to shrink your polyfill bundle(s) by ~${estimatedSavingsKB} KB (${estimatedPolyfillBundleSavingsPercentage}% reduction), from ${totalPolyfillBundleKB} KB down to ~${estimatedPostRemovalKB} KB.`,
        actionItem: `Set your browserslist query to "baseline widely available" or "defaults and fully supports es6-module" to drop unnecessary ES2015–ES2023 shims and save ~${estimatedSavingsKB} KB.`,
        affectedBundles: polyfillBundles.map((b) => b.fileName),
        affectedFeatures: obsoleteFeatures,
      });
    }
  }

  // 3. Features Exceeding Declared Target (Retain / Target Warning)
  const uniqueExceeding = Array.from(
    new Set(
      baselineTarget.exceedingTargetFeatures.map(
        (r) => `${r.name} (baseline_low_date: ${r.baselineLowDate ?? r.baselineYear ?? 'N/A'})`
      )
    )
  );
  if (uniqueExceeding.length > 0) {
    const exceedingBundles = bundles
      .filter((b) => b.detectedPolyfills.some((d) => exceedingTargetIds.has(d.id)))
      .map((b) => b.fileName);

    if (baselineTarget.mode !== 'default') {
      highLevelRecommendations.unshift({
        priority: 'HIGH',
        title: `Retain ${uniqueExceeding.length} Polyfill(s) Exceeding ${baselineTarget.shortTargetName} (Post-${baselineTarget.featureCutoffDate} — ~${estimatedPostRemovalKB} KB est.)`,
        description: `Against your declared target (${baselineTarget.targetLabel}${coreBrowsers ? ` — ${coreBrowsers}` : ''}), ${uniqueExceeding.length} detected feature(s) reached Baseline after the cutoff date (${baselineTarget.featureCutoffDate}): ${uniqueExceeding.join(', ')}. Because these features came after ${baselineTarget.featureCutoffDate}, they are NOT obsolete for ${baselineTarget.shortTargetName}. Retaining only these ${uniqueExceeding.length} feature(s) requires an estimated ~${estimatedPostRemovalKB} KB (down from ${totalPolyfillBundleKB} KB).`,
        actionItem: `Retain polyfills for the ${uniqueExceeding.length} post-${baselineTarget.featureCutoffDate} feature(s) (${uniqueExceeding.join(', ')}) to preserve compatibility with ${baselineTarget.shortTargetName}, and remove the ${obsoleteFeatures.length} obsolete pre-${baselineTarget.featureCutoffDate} polyfill(s) to save ~${estimatedSavingsKB} KB.`,
        affectedBundles: exceedingBundles,
        affectedFeatures: uniqueExceeding,
      });
    } else {
      highLevelRecommendations.push({
        priority: 'INFO',
        title: `Retain ${uniqueExceeding.length} Modern Polyfills (Baseline Newly available / Post-${baselineTarget.featureCutoffDate} — ~${estimatedPostRemovalKB} KB est.)`,
        description: `Features such as ${uniqueExceeding.join(', ')} reached Baseline recently (after ${baselineTarget.featureCutoffDate}, less than 30 months ago). Retaining targeted polyfills only for these features requires ~${estimatedPostRemovalKB} KB instead of ${totalPolyfillBundleKB} KB.`,
        actionItem: `Keep selective polyfills only for post-${baselineTarget.featureCutoffDate} ECMAScript additions while removing Baseline Widely available shims (saving ~${estimatedSavingsKB} KB).`,
        affectedBundles: exceedingBundles,
        affectedFeatures: uniqueExceeding,
      });
    }
  }

  // 4. Native Feature Baseline vs. Older Polyfills (Constructive insight)
  if (syntaxMismatchDetected) {
    const nativeDateStr = siteMostModernFeatureBaselineDate || `${siteNativeSyntaxFloorYear}-12-31`;
    const nativeFeatureLabel = siteMostModernFeatureName || `ES${siteNativeSyntaxFloorYear} syntax`;

    const legacyFeatures = Array.from(featureOccurrences.values())
      .filter((f) => {
        if (f.baselineLowDate) {
          return f.baselineLowDate <= nativeDateStr;
        }
        return f.baselineYear !== null && f.baselineYear <= siteNativeSyntaxFloorYear;
      })
      .map((f) => `${f.featureName} (${f.baselineLowDate ?? f.baselineYear})`);

    const bundlesWithNativeModern = bundles
      .filter(
        (b) =>
          !b.isDedicatedPolyfillBundle &&
          (b.nativeSyntaxStats.mostModernFeatureBaselineDate === nativeDateStr ||
            b.nativeSyntaxStats.inferredSyntaxFloorYear >= siteNativeSyntaxFloorYear)
      )
      .sort((a, b) =>
        (b.nativeSyntaxStats.mostModernFeatureBaselineDate || '').localeCompare(
          a.nativeSyntaxStats.mostModernFeatureBaselineDate || ''
        )
      )
      .map((b) => b.fileName);

    highLevelRecommendations.push({
      priority: 'INFO',
      title: `Un-polyfilled / Un-transformed Feature (${nativeFeatureLabel}, Baseline ${nativeDateStr}) vs. Older Polyfills`,
      description: `The most modern feature you are using without polyfills or transformation (${nativeFeatureLabel} in ${bundlesWithNativeModern.slice(0, 3).join(', ')}) became Baseline on ${nativeDateStr}, but you are including polyfills for the following older features: ${legacyFeatures.join(', ')}. Consider removing these polyfills if you are only targeting browsers that support these features natively.`,
      actionItem: `Consider removing these older polyfills and aligning your polyfill injection with your ${baselineTarget.shortTargetName} target ("${recommendedBrowserslist[0]}"), as any browser supporting your un-polyfilled ${nativeFeatureLabel} code (${nativeDateStr}+) already supports those older features natively.`,
      affectedBundles: bundles.filter((b) => b.detectedPolyfills.length > 0).map((b) => b.fileName),
      affectedFeatures: legacyFeatures,
    });
  }

  if (highLevelRecommendations.length === 0) {
    highLevelRecommendations.push({
      priority: 'INFO',
      title: `Clean Modern Bundle Architecture — Zero Redundant Polyfills for ${baselineTarget.shortTargetName}`,
      description: `All scanned bundles rely on native Web Platform features without shipping obsolete polyfill shims for ${baselineTarget.shortTargetName}.`,
      actionItem: 'Maintain current browserslist configuration.',
      affectedBundles: [],
      affectedFeatures: [],
    });
  }

  return {
    targetUrl,
    scannedAt: new Date().toISOString(),
    baselineTarget,
    summary: {
      totalScriptsDiscovered,
      totalBundlesScanned: bundles.length,
      totalBytesScanned,
      totalPolyfillInstances,
      uniqueFeaturesPolyfilled: featureOccurrences.size,
      redundantPolyfillCount,
      redundantPercentage,
      polyfillsBundleTotalBytes,
      estimatedTotalSavingsBytes,
      estimatedPostRemovalPolyfillBundleBytes,
      estimatedPolyfillBundleSavingsPercentage,
      duplicateFeatureCount: duplicatePolyfills.length,
      siteNativeSyntaxFloorYear,
      siteMostModernFeatureName,
      siteMostModernFeatureBaselineDate,
      inferredPolyfillFloorYear,
      syntaxMismatchDetected,
      recommendedBrowserslist,
    },
    highLevelRecommendations,
    duplicatePolyfills,
    bundles,
  };
}

export async function scanWebsiteUrl(
  targetUrl: string,
  options: {
    maxBundles?: number;
    headers?: Record<string, string>;
    targetYear?: number;
    widelyAvailableOnDate?: string;
  } = {}
): Promise<WebsiteScanReport> {
  const maxBundles = options.maxBundles ?? 20;
  const headers: Record<string, string> = { ...DEFAULT_HEADERS, ...(options.headers || {}) };
  const targetOptions: BaselineTargetOptions = {
    targetYear: options.targetYear,
    widelyAvailableOnDate: options.widelyAvailableOnDate,
  };

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
    return analyzeBundles(targetUrl, 1, [{ url: targetUrl, fileName, code: bodyText }], targetOptions);
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

  return analyzeBundles(targetUrl, urls.size, rawBundles, targetOptions);
}

export function formatWebsiteMarkdownReport(report: WebsiteScanReport): string {
  const s = report.summary;
  const bt = report.baselineTarget;
  const targetShortName = bt?.shortTargetName || 'Baseline Widely available';
  const supportedByTargetIds = new Set(
    (bt?.supportedByTargetFeatures || []).map((r) => r.id)
  );
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
  lines.push(`| **Redundant Polyfills (${targetShortName})** | **${s.redundantPolyfillCount} / ${s.totalPolyfillInstances} (${s.redundantPercentage}%)** are natively supported in ${targetShortName} |`);
  lines.push(`| **Estimated Bundle Size Savings** | **~${((s.estimatedTotalSavingsBytes || 0) / 1024).toFixed(1)} KB** (${((s.polyfillsBundleTotalBytes || 0) / 1024).toFixed(1)} KB → ~${((s.estimatedPostRemovalPolyfillBundleBytes || 0) / 1024).toFixed(1)} KB, -${s.estimatedPolyfillBundleSavingsPercentage || 0}%) |`);
  if (bt) {
    lines.push(`| **Configured Baseline Target** | **${bt.targetLabel}** |`);
    if (bt.compatibleBrowsers.length > 0) {
      const coreBrowsers = bt.compatibleBrowsers
        .filter((b) => ['chrome', 'edge', 'firefox', 'safari'].includes(b.browser))
        .map((b) => `${b.browser} ${b.version}+`)
        .join(', ');
      if (coreBrowsers) {
        lines.push(`| **Target Browser Versions** | \`${coreBrowsers}\` |`);
      }
    }
  }
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

    const savedKb = ((b.estimatedSavingsBytes ?? 0) / 1024).toFixed(1);
    const postKb = ((b.estimatedPostRemovalBytes ?? b.sizeBytes) / 1024).toFixed(1);
    const pct = b.estimatedSavingsPercentage ?? 0;

    lines.push(`### 🔍 \`${b.fileName}\` (${kb} KB → Est. ~${postKb} KB, Save ~${savedKb} KB / -${pct}%) — ${b.detectedPolyfills.length} Polyfills Detected`);
    lines.push(`- **Source URL**: \`${b.url}\``);
    lines.push(`- **Estimated Size After Removing Obsolete Polyfills**: **~${postKb} KB** (saving **~${savedKb} KB** / **-${pct}%** from ${kb} KB)`);
    lines.push(`- **Native Syntax Usage**: ES${b.nativeSyntaxStats.inferredSyntaxFloorYear} (${b.nativeSyntaxStats.asyncCount} native \`async\` functions, ${b.nativeSyntaxStats.classCount} native \`class\` definitions)`);
    lines.push('');
    lines.push('| Feature ID | Feature Name | Baseline Year | Est. Size | Status | Offset | 1:1 Minified AST Snippet |');
    lines.push('| :--- | :--- | :---: | :---: | :---: | :---: | :--- |');
    for (const d of b.detectedPolyfills) {
      const snippet = (d.mapping?.minifiedPolyfill?.snippet || '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
      const offset = d.mapping?.minifiedPolyfill?.byteOffset ?? 'N/A';
      const estKb = ((d.estimatedSizeBytes ?? 1800) / 1024).toFixed(1);
      const baseStatusLabel =
        d.baselineStatus === 'high'
          ? 'Baseline Widely available'
          : d.baselineStatus === 'low'
            ? 'Baseline Newly available'
            : 'Limited availability';
      const statusLabel =
        bt && bt.mode !== 'default'
          ? supportedByTargetIds.has(d.id)
            ? `Obsolete in ${targetShortName} (${baseStatusLabel})`
            : `Exceeds ${targetShortName} (${baseStatusLabel})`
          : baseStatusLabel;
      lines.push(
        `| \`${d.id}\` | **${d.name}** | ${d.baselineYear ?? 'N/A'} | ~${estKb} KB | \`${statusLabel}\` | \`${offset}\` | \`${snippet}\` |`
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}
