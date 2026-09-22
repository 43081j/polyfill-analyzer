import fs from 'node:fs';
import path from 'node:path';
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
  catalogCache.set(resolved, validated);
  return validated;
}

export function getRuleById(id: string, catalogPath?: string): RuleEntry | undefined {
  return loadCatalog(catalogPath).rules.find(r => r.id === id);
}

export function getRuleByWebFeatureId(webFeatureId: string, catalogPath?: string): RuleEntry | undefined {
  return loadCatalog(catalogPath).rules.find(r => r.webFeatureId === webFeatureId);
}

export function getRuleByBcdId(bcdId: string, catalogPath?: string): RuleEntry | undefined {
  return loadCatalog(catalogPath).rules.find(r => r.bcdId === bcdId);
}

export function getAllRules(catalogPath?: string): RuleEntry[] {
  return loadCatalog(catalogPath).rules;
}

export const catalog: RuleEntry[] = [];
