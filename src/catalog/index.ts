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
  modernSuggestion: z.string(),
  bundlers: z.array(z.enum(['webpack', 'rollup', 'esbuild', 'swc'])).nonempty(),
  esSamplesId: z.string().optional(),
  webFeaturesId: z.string().optional()
}).strict();

export type RuleEntry = z.infer<typeof RuleEntrySchema>;
export type FeatureRule = RuleEntry;
export type CatalogDatabase = { rules: RuleEntry[] };

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
} {
  const wfMap = webFeaturesData as Record<string, any>;
  const wfId = rule.webFeaturesId || rule.webFeatureId;
  const feat = wfMap[wfId] || wfMap[rule.webFeatureId];
  if (!feat || !feat.status) {
    return { baselineStatus: rule.baselineStatus, baselineYear: rule.baselineYear };
  }

  const byKey = feat.status.by_compat_key?.[rule.bcdId];
  const statusObj = byKey || feat.status;
  if (!statusObj || statusObj.baseline === undefined) {
    return { baselineStatus: rule.baselineStatus, baselineYear: rule.baselineYear };
  }

  const rawLowDate: string | undefined = statusObj.baseline_low_date;
  const rawHighDate: string | undefined = statusObj.baseline_high_date;
  let baselineYear = rule.baselineYear;
  if (typeof rawLowDate === 'string') {
    const cleanDate = rawLowDate.replace(/^≤/, '');
    const parsedYear = parseInt(cleanDate.slice(0, 4), 10);
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
  if (baselineStatus === 'low' && typeof rawLowDate === 'string') {
    const cleanLowDate = rawLowDate.replace(/^≤/, '');
    const lowTime = Date.parse(cleanLowDate);
    if (!Number.isNaN(lowTime)) {
      const highTime = rawHighDate
        ? Date.parse(rawHighDate.replace(/^≤/, ''))
        : new Date(lowTime).setMonth(new Date(lowTime).getMonth() + 30);
      if (!Number.isNaN(highTime) && Date.now() >= highTime) {
        baselineStatus = 'high';
      }
    }
  }

  if (baselineStatus === 'false') {
    baselineYear = null;
  }

  return { baselineStatus, baselineYear };
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
