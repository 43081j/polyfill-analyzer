import fs from 'node:fs';
import path from 'node:path';
import { features as webFeaturesData } from 'web-features';
import { z } from 'zod';

export const RuleEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  astGrepRulePath: z.string(),
  webFeatureId: z.string().regex(/^[a-z0-9-]+$/),
  bcdId: z.string().regex(/^[a-zA-Z0-9._-]+$/),
  baselineStatus: z.enum(['low', 'high', 'false']),
  baselineYear: z.number().int().nullable(),
  baselineLowDate: z.string().nullable().optional(),
  baselineHighDate: z.string().nullable().optional(),
  estimatedSizeBytes: z.number().int().positive().optional(),
  modernSuggestion: z.string(),
  bundlers: z.array(z.enum(['webpack', 'rollup', 'esbuild', 'swc'])).nonempty(),
  esSamplesId: z.string().optional(),
  webFeaturesId: z.string().optional()
}).strict();

export type RuleEntry = z.infer<typeof RuleEntrySchema>;
export type FeatureRule = RuleEntry;
export type CatalogDatabase = { rules: RuleEntry[] };

/**
 * Typical minified footprint in bytes (including implementation + direct core-js/Babel
 * helper dependencies) for each polyfill or syntax transform rule in the catalog.
 */
export const ESTIMATED_POLYFILL_WEIGHT_BYTES: Record<string, number> = {
  'promise': 18500,
  'iterator-helpers': 9200,
  'float16array': 8600,
  'set-methods': 6800,
  'async-generator': 6400,
  'async-iteration': 5200,
  'array-iterator': 4800,
  'array-change-by-copy': 4200,
  'promise-any': 3800,
  'string-match-all': 3600,
  'array-flat': 3400,
  'class-fields': 3200,
  'promise-all-settled': 2900,
  'string-replace-all': 2800,
  'string-padding': 2600,
  'array-includes': 2500,
  'string-trimming': 2400,
  'object-rest-spread': 2400,
  'array-filter': 2300,
  'promise-finally': 2200,
  'object-assign': 2100,
  'symbol-description': 2100,
  'object-entries': 1900,
  'object-values': 1900,
  'array-find-last': 1800,
  'object-from-entries': 1700,
  'array-at': 1600,
  'object-group-by': 1600,
  'promise-try': 1500,
  'promise-with-resolvers': 1400,
  'object-has-own': 1200,
  'global-this': 900,
  'class-static-initialization-blocks': 800,
  'optional-chaining': 700,
  'nullish-coalescing': 600,
};

export function getEstimatedPolyfillBytes(ruleId: string, snippetLength?: number): number {
  const catalogEstimate = ESTIMATED_POLYFILL_WEIGHT_BYTES[ruleId] ?? 1800;
  return snippetLength ? Math.max(catalogEstimate, snippetLength) : catalogEstimate;
}

const catalogCache = new Map<string, CatalogDatabase>();

/**
 * Dynamically resolves a rule's Baseline status ('high' = Baseline Widely available,
 * 'low' = Baseline Newly available, 'false' = Limited availability) and Baseline Year
 * directly from the installed `web-features` package (including per-BCD-key status
 * overrides in `status.by_compat_key[rule.bcdId]` and 30-month Widely available progression).
 */
export function resolveDynamicBaseline(rule: RuleEntry): {
  baselineStatus: 'low' | 'high' | 'false';
  baselineYear: number | null;
  baselineLowDate: string | null;
  baselineHighDate: string | null;
} {
  const wfMap = webFeaturesData as Record<string, any>;
  const wfId = rule.webFeaturesId || rule.webFeatureId;
  const feat = wfMap[wfId] || wfMap[rule.webFeatureId];
  const fallbackLowDate =
    rule.baselineLowDate ?? (rule.baselineYear !== null ? `${rule.baselineYear}-12-31` : null);
  const fallbackHighDate = rule.baselineHighDate ?? null;

  if (!feat || !feat.status) {
    return {
      baselineStatus: rule.baselineStatus,
      baselineYear: rule.baselineYear,
      baselineLowDate: fallbackLowDate,
      baselineHighDate: fallbackHighDate,
    };
  }

  const byKey = feat.status.by_compat_key?.[rule.bcdId];
  const statusObj = byKey || feat.status;
  if (!statusObj || statusObj.baseline === undefined) {
    return {
      baselineStatus: rule.baselineStatus,
      baselineYear: rule.baselineYear,
      baselineLowDate: fallbackLowDate,
      baselineHighDate: fallbackHighDate,
    };
  }

  const rawLowDate: string | undefined = statusObj.baseline_low_date;
  const rawHighDate: string | undefined = statusObj.baseline_high_date;
  const cleanLowDate = typeof rawLowDate === 'string' ? rawLowDate.replace(/^≤/, '') : null;
  const cleanHighDate = typeof rawHighDate === 'string' ? rawHighDate.replace(/^≤/, '') : null;

  let baselineYear = rule.baselineYear;
  if (cleanLowDate) {
    const parsedYear = parseInt(cleanLowDate.slice(0, 4), 10);
    if (!Number.isNaN(parsedYear)) {
      baselineYear = parsedYear;
    }
  }

  let baselineStatus: 'low' | 'high' | 'false' =
    statusObj.baseline === 'high'
      ? 'high'
      : statusObj.baseline === 'low'
        ? 'low'
        : 'false';

  // If marked 'low' in the static snapshot, check if 30 months have elapsed since baseline_low_date
  if (baselineStatus === 'low' && cleanLowDate) {
    const lowTime = Date.parse(cleanLowDate);
    if (!Number.isNaN(lowTime)) {
      const highTime = cleanHighDate
        ? Date.parse(cleanHighDate)
        : new Date(lowTime).setMonth(new Date(lowTime).getMonth() + 30);
      if (!Number.isNaN(highTime) && Date.now() >= highTime) {
        baselineStatus = 'high';
      }
    }
  }

  if (baselineStatus === 'false') {
    baselineYear = null;
  }

  return {
    baselineStatus,
    baselineYear,
    baselineLowDate: baselineStatus === 'false' ? null : (cleanLowDate ?? fallbackLowDate),
    baselineHighDate: baselineStatus === 'false' ? null : cleanHighDate,
  };
}

type CacheClearCallback = () => void;
const cacheClearCallbacks = new Set<CacheClearCallback>();

export function registerCacheClearCallback(callback: CacheClearCallback): void {
  cacheClearCallbacks.add(callback);
}

export function unregisterCacheClearCallback(callback: CacheClearCallback): boolean {
  return cacheClearCallbacks.delete(callback);
}

export function clearCatalogCache(): void {
  catalogCache.clear();
  for (const callback of Array.from(cacheClearCallbacks)) {
    try {
      callback();
    } catch (err) {
      console.error('Error in cache clear callback:', err);
    }
  }
}

export function loadCatalog(catalogPath?: string): CatalogDatabase {
  const resolved = path.resolve(process.cwd(), catalogPath || 'src/catalog/rules.json');
  const cached = catalogCache.get(resolved);
  if (cached) {
    return cached;
  }
  const raw = fs.readFileSync(resolved, 'utf8');
  const parsed = JSON.parse(raw);
  const validated = z.object({ rules: z.array(RuleEntrySchema) }).parse(parsed);
  for (const rule of validated.rules) {
    const dynamic = resolveDynamicBaseline(rule);
    rule.baselineStatus = dynamic.baselineStatus;
    rule.baselineYear = dynamic.baselineYear;
    rule.baselineLowDate = dynamic.baselineLowDate;
    rule.baselineHighDate = dynamic.baselineHighDate;
    rule.estimatedSizeBytes = rule.estimatedSizeBytes ?? getEstimatedPolyfillBytes(rule.id);
  }
  catalogCache.set(resolved, validated);
  return validated;
}

export function getRuleById(id: string, catalogPath?: string): RuleEntry | undefined {
  return loadCatalog(catalogPath).rules.find(r => r.id === id);
}

export function getRuleByWebFeatureId(webFeatureId: string, catalogPath?: string): RuleEntry | undefined {
  return loadCatalog(catalogPath).rules.find(
    r => r.webFeatureId === webFeatureId || r.webFeaturesId === webFeatureId
  );
}

export function getRuleByBcdId(bcdId: string, catalogPath?: string): RuleEntry | undefined {
  return loadCatalog(catalogPath).rules.find(r => r.bcdId === bcdId);
}

export function getAllRules(catalogPath?: string): RuleEntry[] {
  return loadCatalog(catalogPath).rules;
}

export const catalog: RuleEntry[] = [];
