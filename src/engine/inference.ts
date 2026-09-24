import chalk from 'chalk';
import { getCompatibleVersions } from 'baseline-browser-mapping';
import { RuleEntry } from '../catalog/index.js';

export interface BaselineTargetOptions {
  /**
   * Pass a year between 2015 and the current year to target all features
   * available across all core browsers by the end of that calendar year (YYYY-12-31).
   * Matches baseline-browser-mapping `--target-year`.
   */
  targetYear?: number;
  /**
   * Pass a date in the format 'YYYY-MM-DD' to target features that were
   * Baseline Widely available on the specified date (i.e. baseline_low_date <= date minus 30 months).
   * Matches baseline-browser-mapping `--widely-available-on-date`.
   */
  widelyAvailableOnDate?: string;
}

export interface CompatibleBrowserVersion {
  browser: string;
  version: string;
  release_date?: string;
}

export interface BaselineTargetEvaluation {
  mode: 'target-year' | 'widely-available-on-date' | 'default';
  targetYear: number | null;
  widelyAvailableOnDate: string | null;
  featureCutoffDate: string;
  shortTargetName: string;
  targetLabel: string;
  compatibleBrowsers: CompatibleBrowserVersion[];
  supportedByTargetFeatures: RuleEntry[];
  exceedingTargetFeatures: RuleEntry[];
  warnings: string[];
}

/**
 * Subtracts 30 months (2 years, 6 months) from a YYYY-MM-DD date string
 * to compute the maximum `baseline_low_date` for features that are
 * Baseline Widely available on `dateStr`.
 */
export function subtractThirtyMonths(dateStr: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr.trim());
  if (!match) {
    throw new Error(`Invalid date format "${dateStr}". Expected YYYY-MM-DD.`);
  }
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  const totalMonths = year * 12 + (month - 1) - 30;
  const targetYear = Math.floor(totalMonths / 12);
  const targetMonthIndex = ((totalMonths % 12) + 12) % 12;
  const maxDayInMonth = new Date(Date.UTC(targetYear, targetMonthIndex + 1, 0)).getUTCDate();
  const clampedDay = Math.min(day, maxDayInMonth);

  const y = String(targetYear).padStart(4, '0');
  const m = String(targetMonthIndex + 1).padStart(2, '0');
  const d = String(clampedDay).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function evaluateBaselineTarget(
  detected: RuleEntry[],
  options?: BaselineTargetOptions
): BaselineTargetEvaluation {
  const hasYear = options?.targetYear !== undefined && options?.targetYear !== null;
  const hasDate =
    typeof options?.widelyAvailableOnDate === 'string' &&
    options.widelyAvailableOnDate.trim().length > 0;

  if (hasYear && hasDate) {
    throw new Error(
      'Cannot use --target-year and --widely-available-on-date together (matches baseline-browser-mapping CLI).'
    );
  }

  let mode: 'target-year' | 'widely-available-on-date' | 'default' = 'default';
  let targetYear: number | null = null;
  let widelyAvailableOnDate: string | null = null;
  let featureCutoffDate: string;
  let shortTargetName: string;
  let targetLabel: string;

  if (hasYear) {
    const yr = Number(options!.targetYear);
    const currentYear = new Date().getUTCFullYear();
    if (!Number.isInteger(yr) || yr < 2015 || yr > currentYear) {
      throw new Error(
        `Invalid --target-year "${options!.targetYear}". Must be a year between 2015 and ${currentYear}.`
      );
    }
    mode = 'target-year';
    targetYear = yr;
    featureCutoffDate = `${yr}-12-31`;
    shortTargetName = `Baseline ${yr}`;
    targetLabel = `Baseline ${yr} (available in all core browsers by ${featureCutoffDate})`;
  } else if (hasDate) {
    const dateStr = options!.widelyAvailableOnDate!.trim();
    featureCutoffDate = subtractThirtyMonths(dateStr);
    mode = 'widely-available-on-date';
    widelyAvailableOnDate = dateStr;
    shortTargetName = `Baseline Widely available on ${dateStr}`;
    targetLabel = `Baseline Widely available on ${dateStr} (baseline_low_date <= ${featureCutoffDate}, i.e. -30 months)`;
  } else {
    const today = new Date().toISOString().slice(0, 10);
    featureCutoffDate = subtractThirtyMonths(today);
    mode = 'default';
    shortTargetName = 'Baseline Widely available';
    targetLabel = `Baseline Widely available (baseline_low_date <= ${featureCutoffDate})`;
  }

  let compatibleBrowsers: CompatibleBrowserVersion[] = [];
  try {
    const bbmOpts: Record<string, any> = { suppressWarnings: true };
    if (targetYear !== null) bbmOpts.targetYear = targetYear;
    if (widelyAvailableOnDate !== null) bbmOpts.widelyAvailableOnDate = widelyAvailableOnDate;
    const rawBrowsers = getCompatibleVersions(bbmOpts);
    if (Array.isArray(rawBrowsers)) {
      compatibleBrowsers = rawBrowsers.map(b => ({
        browser: b.browser,
        version: b.version,
        release_date: b.release_date,
      }));
    }
  } catch {
    compatibleBrowsers = [];
  }

  const supportedByTargetFeatures: RuleEntry[] = [];
  const exceedingTargetFeatures: RuleEntry[] = [];

  for (const r of detected) {
    const lowDate =
      r.baselineLowDate ?? (r.baselineYear !== null ? `${r.baselineYear}-12-31` : null);
    const isObsoleteForTarget =
      mode === 'default'
        ? r.baselineStatus === 'high' || (lowDate !== null && lowDate <= featureCutoffDate)
        : lowDate !== null && lowDate <= featureCutoffDate;
    if (isObsoleteForTarget) {
      supportedByTargetFeatures.push(r);
    } else {
      exceedingTargetFeatures.push(r);
    }
  }

  const warnings: string[] = [];
  const seenExceeding = new Set<string>();
  for (const r of exceedingTargetFeatures) {
    if (seenExceeding.has(r.id)) continue;
    seenExceeding.add(r.id);
    const lowDate =
      r.baselineLowDate ?? (r.baselineYear !== null ? `${r.baselineYear}-12-31` : 'unbaselined');
    if (mode === 'target-year') {
      warnings.push(
        `[Target Warning] ${r.name} (${r.id}) reached Baseline on ${lowDate} (after ${featureCutoffDate}) and exceeds --target-year ${targetYear}. Retain polyfill or raise target.`
      );
    } else if (mode === 'widely-available-on-date') {
      warnings.push(
        `[Target Warning] ${r.name} (${r.id}) has baseline_low_date ${lowDate} (after ${featureCutoffDate}, which is ${widelyAvailableOnDate} minus 30 months) and was not yet Widely available on ${widelyAvailableOnDate}.`
      );
    } else {
      warnings.push(
        `[Target Warning] ${r.name} (${r.id}) has baseline_low_date ${lowDate} (after ${featureCutoffDate}) and is not yet Baseline Widely available.`
      );
    }
  }

  const seenSupported = new Set<string>();
  for (const r of supportedByTargetFeatures) {
    if (seenSupported.has(r.id)) continue;
    seenSupported.add(r.id);
    const lowDate =
      r.baselineLowDate ?? (r.baselineYear !== null ? `${r.baselineYear}-12-31` : 'unknown');
    warnings.push(
      `[Obsolete for ${shortTargetName}] ${r.name} (${r.id}) (baseline_low_date: ${lowDate} <= ${featureCutoffDate}) is already natively supported in ${targetLabel} — polyfill is unnecessary.`
    );
  }

  return {
    mode,
    targetYear,
    widelyAvailableOnDate,
    featureCutoffDate,
    shortTargetName,
    targetLabel,
    compatibleBrowsers,
    supportedByTargetFeatures,
    exceedingTargetFeatures,
    warnings,
  };
}

export function computeBaselineStatus(detected: RuleEntry[]): 'low' | 'high' | 'false' {
  if (detected.some(r => r.baselineStatus === 'false')) {
    return 'false';
  }
  if (detected.some(r => r.baselineStatus === 'low')) {
    return 'low';
  }
  return 'high';
}

export function inferBaselineYear(detected: RuleEntry[]): number | null {
  const validYears = detected
    .map(r => r.baselineYear)
    .filter((y): y is number => typeof y === 'number' && !isNaN(y));
  
  if (validYears.length > 0) {
    return Math.min(...validYears);
  }
  return null;
}

export function generateRecommendations(
  detected: RuleEntry[],
  targetOptions?: BaselineTargetOptions
): {
  modernizationSuggestion: string;
  recommendations: string[];
} {
  if (detected.length === 0) {
    return {
      modernizationSuggestion: 'Optimal state: 0 polyfills detected. The bundle adheres to modern baseline standards without legacy downleveling.',
      recommendations: [
        'No polyfill removal needed.',
        'Maintain current target environment settings.'
      ]
    };
  }

  const targetEval = evaluateBaselineTarget(detected, targetOptions);
  const supportedIds = new Set(targetEval.supportedByTargetFeatures.map(r => r.id));

  const sorted = detected.slice().sort((a, b) => a.id.localeCompare(b.id));
  const deduplicatedSuggestions = Array.from(new Set(sorted.map(r => {
    const bundlersStr = r.bundlers && r.bundlers.length > 0 ? `[${r.bundlers.join(', ')}]` : '[]';
    const yearStr = r.baselineYear !== null ? `${r.baselineYear}` : 'N/A';
    const lowDateStr = r.baselineLowDate ?? yearStr;
    if (targetEval.mode !== 'default') {
      if (supportedIds.has(r.id)) {
        return `Inferred: ${bundlersStr} polyfilled ${r.name} (baseline_low_date: ${lowDateStr} <= ${targetEval.featureCutoffDate}). Obsolete for ${targetEval.shortTargetName}: remove polyfill.`;
      }
      return `Inferred: ${bundlersStr} polyfilled ${r.name} (baseline_low_date: ${lowDateStr} > ${targetEval.featureCutoffDate}). Exceeds ${targetEval.shortTargetName}: retain polyfill for ${targetEval.shortTargetName} compatibility.`;
    }
    return `Inferred: ${bundlersStr} polyfilled ${r.name}. This feature became Baseline on ${yearStr} (${r.baselineStatus}). ${r.modernSuggestion}`;
  })));

  const hasLegacyES5 = sorted.some(r => r.baselineYear !== null && r.baselineYear <= 2015);
  const allObsoleteForTarget = targetEval.exceedingTargetFeatures.length === 0;

  if (targetEval.mode !== 'default') {
    if (allObsoleteForTarget) {
      return {
        modernizationSuggestion: `Obsolete polyfills detected. All detected features are natively supported in ${targetEval.shortTargetName} browsers. Remove these polyfills to optimize bundle size and performance.`,
        recommendations: [
          `Remove obsolete polyfills that are natively supported across ${targetEval.shortTargetName} browsers.`,
          ...deduplicatedSuggestions
        ]
      };
    }
    return {
      modernizationSuggestion: `Polyfills exceeding ${targetEval.shortTargetName} detected (${targetEval.exceedingTargetFeatures.length} post-${targetEval.featureCutoffDate} feature(s), ${targetEval.supportedByTargetFeatures.length} obsolete pre-${targetEval.featureCutoffDate} feature(s)). Retain shims for features after ${targetEval.featureCutoffDate} while removing obsolete ${targetEval.shortTargetName} shims.`,
      recommendations: [
        `Retain polyfills for features exceeding ${targetEval.shortTargetName} and remove obsolete pre-${targetEval.featureCutoffDate} shims.`,
        ...deduplicatedSuggestions
      ]
    };
  }

  if (hasLegacyES5) {
    return {
      modernizationSuggestion: 'Legacy IE11/ES5 polyfills detected. Upgrade your bundler target from ES5/IE11 to at least Baseline 2015 (or modern Baseline 2020+) to eliminate downlevel shims and reduce bundle size.',
      recommendations: [
        'Upgrade target environment to Baseline 2015 or newer to remove legacy ES5/IE11 shims.',
        ...deduplicatedSuggestions
      ]
    };
  }

  if (allObsoleteForTarget) {
    return {
      modernizationSuggestion: 'Obsolete polyfills detected. All detected features are natively supported in Baseline Widely available browsers. Remove these polyfills to optimize bundle size and performance.',
      recommendations: [
        'Remove obsolete polyfills that are natively supported across all major browsers.',
        ...deduplicatedSuggestions
      ]
    };
  }

  return {
    modernizationSuggestion: 'Modern or experimental polyfills detected. Retain shims for non-baselined/low-baseline features, or upgrade target browser baseline to remove shims as support matures.',
    recommendations: [
      'Review polyfills for low or unbaselined features.',
      ...deduplicatedSuggestions
    ]
  };
}

export function formatTableReport(
  filePath: string,
  detected: RuleEntry[],
  status: 'low' | 'high' | 'false',
  year: number | null,
  suggestion: string,
  recommendations?: string[],
  baselineTarget?: BaselineTargetEvaluation
): string {
  const lines: string[] = [];
  lines.push(chalk.bold.cyan('\n=== Polyfill Analyzer Report ==='));
  lines.push(`${chalk.bold('Bundle Path:')}      ${filePath}`);
  lines.push(`${chalk.bold('Polyfills Found:')}  ${detected.length}`);
  
  const statusColor = status === 'high' ? chalk.green : status === 'low' ? chalk.yellow : chalk.red;
  lines.push(`${chalk.bold('Baseline Status:')}  ${statusColor(status.toUpperCase())}`);
  lines.push(`${chalk.bold('Baseline Year:')}    ${year !== null ? year : 'N/A'}`);
  if (baselineTarget) {
    lines.push(`${chalk.bold('Baseline Target:')}  ${chalk.magenta(baselineTarget.targetLabel)}`);
    if (baselineTarget.compatibleBrowsers.length > 0) {
      const coreBrowsers = baselineTarget.compatibleBrowsers
        .filter(b => ['chrome', 'edge', 'firefox', 'safari'].includes(b.browser))
        .map(b => `${b.browser} ${b.version}+`)
        .join(', ');
      if (coreBrowsers) {
        lines.push(`${chalk.bold('Target Browsers:')}  ${coreBrowsers}`);
      }
    }
  }
  lines.push(`${chalk.bold('Recommendation:')}   ${chalk.italic(suggestion)}\n`);

  if (baselineTarget && baselineTarget.warnings.length > 0) {
    lines.push(chalk.bold.yellow('Baseline Target Warnings:'));
    for (const w of baselineTarget.warnings) {
      lines.push(` ⚠️  ${w}`);
    }
    lines.push('');
  }

  if (recommendations && recommendations.length > 0) {
    lines.push(chalk.bold('Actionable Recommendations:'));
    for (const rec of recommendations) {
      lines.push(` - ${rec}`);
    }
    lines.push('');
  }

  if (detected.length === 0) {
    lines.push(chalk.green('No polyfills detected. Code relies on modern standards.\n'));
    return lines.join('\n');
  }

  const headers = ['ID', 'Feature Name', 'Bundlers', 'Status', 'Year', 'Modernization Suggestion'];
  const rows = detected.map(r => [
    r.id,
    r.name,
    r.bundlers && r.bundlers.length > 0 ? `[${r.bundlers.join(', ')}]` : '[]',
    r.baselineStatus,
    r.baselineYear !== null ? String(r.baselineYear) : '-',
    r.modernSuggestion
  ]);

  const colWidths = headers.map((h, idx) => Math.max(h.length, ...rows.map(row => row[idx].length)) + 2);
  const pad = (str: string, width: number) => str + ' '.repeat(Math.max(0, width - str.length));
  const sep = '+' + colWidths.map(w => '-'.repeat(w)).join('+') + '+';
  const headerRow = '|' + headers.map((h, idx) => chalk.bold(pad(' ' + h, colWidths[idx]))).join('|') + '|';

  lines.push(sep);
  lines.push(headerRow);
  lines.push(sep);
  for (const row of rows) {
    lines.push('|' + row.map((val, idx) => pad(' ' + val, colWidths[idx])).join('|') + '|');
  }
  lines.push(sep + '\n');

  const entriesWithMapping = detected.filter((r: any) => r.mapping && (r.mapping.minifiedPolyfill || (r.mapping.precedingSource && r.mapping.precedingSource.length > 0)));
  if (entriesWithMapping.length > 0) {
    lines.push(chalk.bold.magenta('=== 1:1 Source-to-Minified Mapping Breakdown ==='));
    for (const r of entriesWithMapping as any[]) {
      const m = r.mapping;
      lines.push(chalk.bold.yellow(`\n[${r.id}] ${r.name}`));
      if (m.minifiedPolyfill) {
        const originStr = m.minifiedPolyfill.implementationOrigin ? ` (Origin: ${m.minifiedPolyfill.implementationOrigin})` : '';
        lines.push(`  ${chalk.bold('Minified Polyfill/Helper AST Match:')} Line ${m.minifiedPolyfill.line}, Col ${m.minifiedPolyfill.column} [offset ${m.minifiedPolyfill.byteOffset}]${originStr}`);
        lines.push(`    ${chalk.gray('Snippet:')} ${chalk.cyan(m.minifiedPolyfill.snippet)}`);
      }
      if (m.precedingSource && m.precedingSource.length > 0) {
        lines.push(`  ${chalk.bold('Preceding Author Source Code (1:1 Trigger Mapping):')}`);
        for (const src of m.precedingSource) {
          lines.push(`    • ${chalk.green(`${src.sourceFile}:${src.line}:${src.column}`)}`);
          lines.push(`      ${chalk.bold('Original Source:')}  ${chalk.white(src.sourceSnippet)}`);
          if (src.minifiedUsageSnippet) {
            const loc = src.minifiedUsageLocation ? ` (at bundle Line ${src.minifiedUsageLocation.line}, Col ${src.minifiedUsageLocation.column})` : '';
            lines.push(`      ${chalk.bold('Minified Call:')}    ${chalk.cyan(src.minifiedUsageSnippet)}${loc}`);
          }
        }
      }
    }
    lines.push('');
  }

  return lines.join('\n');
}
