# Polyfill & Transform Analyzer (`polyfill-analyzer`)

An AST-driven JavaScript bundle analyzer powered by `@ast-grep/napi` that deterministically detects polyfills (`core-js`, inline prototype shims) and syntax transforms (Babel, SWC, TypeScript, esbuild helpers) in minified, mangled production bundles with **1:1 source-to-minified mapping** and **Web Platform Baseline** modernization recommendations.

---

## ✨ Key Capabilities

1. **Minification-Invariant AST Detection**:
   Matches structural AST signatures across 35 ECMAScript rules—even when identifiers are mangled to 1–2 letter variables (e.g. `Ce({target:"Array",proto:!0},{at:function(t){...}})` or mangled `_defineProperty` / private field helpers).
2. **High-Level Executive Recommendations Right at the Top**:
   - **🚨 Syntax vs. Polyfill Target Mismatch**: Automatically detects when an app ships modern native syntax (like native `async/await` [ES2017+] or ES6 `class` declarations) while still bundling unreachable legacy ES2015–ES2017 polyfills.
   - **⚠️ Cross-Bundle Duplicate Polyfill Detection**: Identifies when multiple chunks (e.g. Next.js `polyfills-*.js` and `main-*.js`) ship duplicate shims for the same feature.
   - **⚠️ Obsolete `Baseline Widely available` Polyfills**: Calculates the exact percentage of polyfills that are natively supported across all major browsers (`Baseline Widely available`, dynamically resolved via `web-features`) and recommends a modernized `browserslist` config.
3. **1:1 SourceMap Decoder (Zero External Dependencies)**:
   Includes a built-in Base64 VLQ SourceMap v3 decoder that links minified polyfill definitions and call sites directly back to the preceding source file, line, and column.
4. **Interactive Web UI & REST API**:
   Includes a built-in HTTP dashboard and API server (`polyfill-analyzer serve`) for inspecting live website URLs or pasted bundles in the browser.
5. **Ready-to-Use Agent Skill (`SKILL.md`)**:
   Packaged with an AI agent skill (`skill/SKILL.md` and `.agents/skills/polyfill-analyzer/SKILL.md`) so any agent can check websites or bundles on demand.

---

## 🚀 Quick Start & CLI Usage

### 1. Scan a Live Website URL
Fetch a website's HTML, discover and download its production JS bundles, and output a structured executive report:
```bash
# Output Markdown report with High-Level Recommendations at the top
npx polyfill-analyzer url https://www.target.com/ --max-bundles 20 --format markdown

# Generate a standalone local HTML report (with the full Web UI dashboard experience)
npx polyfill-analyzer url https://www.target.com/ --format html -o target-report.html

# Set a custom Baseline Target (matches baseline-browser-mapping CLI options):
#   --target-year <YYYY>: warn on features not available across all browsers by end of YYYY
#   --widely-available-on-date <YYYY-MM-DD>: warn on features with baseline_low_date > (date minus 30 months)
npx polyfill-analyzer url https://www.target.com/ --target-year 2022
npx polyfill-analyzer url https://www.target.com/ --widely-available-on-date 2025-01-01

# Output raw JSON report
npx polyfill-analyzer url https://www.target.com/ --json
```

### 2. Scan a Local Bundled File
```bash
# Default tabular terminal report
npx polyfill-analyzer ./dist/bundle.min.js

# Generate a standalone local HTML file (defaults to ./polyfill-report.html or specify -o)
npx polyfill-analyzer ./dist/bundle.min.js --format html -o ./bundle-report.html

# Warn against a specific Baseline target year or Widely available cutoff date
npx polyfill-analyzer ./dist/bundle.min.js --target-year 2022
npx polyfill-analyzer ./dist/bundle.min.js --widely-available-on-date 2025-01-01

# Markdown report with Executive Summary
npx polyfill-analyzer ./dist/bundle.min.js --format markdown

# JSON output (includes 1:1 SourceMap mapping if .map file is present)
npx polyfill-analyzer ./dist/bundle.min.js --json
```

### 3. Launch the Interactive Web UI Dashboard
Start the self-contained Web UI and REST API server:
```bash
npx polyfill-analyzer serve --port 3456
# Or via npm script:
npm run web
```
Then open **`http://localhost:3456`** to:
- Enter any website URL to analyze its production bundles live.
- Configure a **Baseline Target** (`Baseline Widely available (Today)`, `--target-year`, or `--widely-available-on-date`).
- View **High-Level Executive Recommendations** highlighted right at the top.
- Filter bundles by Baseline status and inspect **1:1 Minified AST Match Snippets** with byte offsets.
- Export reports as Standalone HTML, Markdown, or JSON with one click.

---

## 🤖 Installing & Using the Agent Skill

This package includes an agent skill at [`skill/SKILL.md`](./skill/SKILL.md) (and `.agents/skills/polyfill-analyzer/SKILL.md`).

Once installed in an agent's context, you can prompt your agent naturally:
> *"Please check `https://www.example.com` (or `./build/static/js/main.js`) for polyfills and tell me what I need to do."*

The agent will automatically run the AST-grep scanner, evaluate the site's native syntax floor against its shipped polyfills, and present prioritized, actionable engineering recommendations at the top of its response.
