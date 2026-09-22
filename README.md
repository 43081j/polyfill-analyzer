# Polyfill & Transform Analyzer (`polyfill-analyzer`)

An AST-driven JavaScript bundle analyzer powered by `@ast-grep/napi` that deterministically detects polyfills (`core-js`, inline prototype shims) and syntax transforms (Babel, SWC, TypeScript, esbuild helpers) in minified, mangled production bundles with **1:1 source-to-minified mapping** and **Web Platform Baseline** modernization recommendations.

---

## ✨ Key Capabilities

1. **Minification-Invariant AST Detection**:
   Matches structural AST signatures across 35 ECMAScript rules—even when identifiers are mangled to 1–2 letter variables (e.g. `Ce({target:"Array",proto:!0},{at:function(t){...}})` or mangled `_defineProperty` / private field helpers).
2. **High-Level Executive Recommendations Right at the Top**:
   - **🚨 Syntax vs. Polyfill Target Mismatch**: Automatically detects when an app ships modern native syntax (like native `async/await` [ES2017+] or ES6 `class` declarations) while still bundling unreachable legacy ES2015–ES2017 polyfills.
   - **⚠️ Cross-Bundle Duplicate Polyfill Detection**: Identifies when multiple chunks (e.g. Next.js `polyfills-*.js` and `main-*.js`) ship duplicate shims for the same feature.
   - **⚠️ Obsolete `Baseline High` Polyfills**: Calculates the exact percentage of polyfills that are natively supported across all major browsers (`Baseline Widely Available`) and recommends a modernized `browserslist` config.
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

# Output raw JSON report
npx polyfill-analyzer url https://www.target.com/ --json
```

### 2. Scan a Local Bundled File
```bash
# Default tabular terminal report
npx polyfill-analyzer ./dist/bundle.min.js

# Markdown report with Executive Summary
npx polyfill-analyzer ./dist/bundle.min.js --format markdown

# JSON output (includes 1:1 SourceMap mapping if .map file is present)
npx polyfill-analyzer ./dist/bundle.min.js --json
```
