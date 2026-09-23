import chalk from 'chalk';
import { RuleEntry } from '../catalog/index.js';

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

export function generateRecommendations(detected: RuleEntry[]): {
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

  const sorted = detected.slice().sort((a, b) => a.id.localeCompare(b.id));
  const deduplicatedSuggestions = Array.from(new Set(sorted.map(r => {
    const bundlersStr = r.bundlers && r.bundlers.length > 0 ? `[${r.bundlers.join(', ')}]` : '[]';
    const yearStr = r.baselineYear !== null ? `${r.baselineYear}` : 'N/A';
    return `Inferred: ${bundlersStr} polyfilled ${r.name}. This feature became Baseline on ${yearStr} (${r.baselineStatus}). ${r.modernSuggestion}`;
  })));

  const hasLegacyES5 = sorted.some(r => r.baselineYear !== null && r.baselineYear <= 2015);
  const allHigh = sorted.every(r => r.baselineStatus === 'high');

  if (hasLegacyES5) {
    return {
      modernizationSuggestion: 'Legacy IE11/ES5 polyfills detected. Upgrade your bundler target from ES5/IE11 to at least Baseline 2015 (or modern Baseline 2020+) to eliminate downlevel shims and reduce bundle size.',
      recommendations: [
        'Upgrade target environment to Baseline 2015 or newer to remove legacy ES5/IE11 shims.',
        ...deduplicatedSuggestions
      ]
    };
  }

  if (allHigh) {
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
  recommendations?: string[]
): string {
  const lines: string[] = [];
  lines.push(chalk.bold.cyan('\n=== Polyfill Analyzer Report ==='));
  lines.push(`${chalk.bold('Bundle Path:')}      ${filePath}`);
  lines.push(`${chalk.bold('Polyfills Found:')}  ${detected.length}`);
  
  const statusColor = status === 'high' ? chalk.green : status === 'low' ? chalk.yellow : chalk.red;
  lines.push(`${chalk.bold('Baseline Status:')}  ${statusColor(status.toUpperCase())}`);
  lines.push(`${chalk.bold('Baseline Year:')}    ${year !== null ? year : 'N/A'}`);
  lines.push(`${chalk.bold('Recommendation:')}   ${chalk.italic(suggestion)}\n`);

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
