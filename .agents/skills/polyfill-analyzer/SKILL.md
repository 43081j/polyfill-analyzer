---
name: polyfill-analyzer
description: >
  Analyzes live websites (URLs) or local JavaScript bundles to deterministically
  detect polyfills (core-js, inline prototype shims) and syntax transforms
  (Babel/SWC/TypeScript helpers) using AST-grep (@ast-grep/napi). Maps minified
  production code 1:1 back to preceding source code, detects Syntax vs. Polyfill
  Target Mismatches and duplicate polyfills across chunks, and provides specific,
  actionable Web Platform Baseline modernization recommendations. Use when asked
  to check a website or bundled file for polyfills, inspect JS bundle bloat, or
  recommend browserslist/bundler target upgrades.
---

# Polyfill & Transform Analyzer Skill (`polyfill-analyzer`)

This skill equips an AI agent to inspect any **live website URL** or **local JavaScript bundle** for polyfills and syntax transforms using the AST-grep-powered `polyfill-analyzer` CLI and engine.

## When to Use This Skill

Trigger this skill whenever the user asks:
- *"Please check this website or this bundled file for polyfills and tell me what I need to do."*
- *"What polyfills is `<URL>` using in production?"*
- *"Scan this JS bundle and tell me how to modernize our `browserslist` or bundler target."*
- *"Are we shipping duplicate or obsolete Web Platform Baseline polyfills?"*

---

## Prerequisites & Setup

Ensure the project is built before invoking the CLI:
```bash
npm install
npm run build
```

---

## Workflow 1: Check a Live Website URL

When the user asks you to check a website (e.g., `https://www.example.com/` or any public web application):

1. **Run the URL Scanner CLI**:
   ```bash
   npx polyfill-analyzer url "https://www.example.com/" --max-bundles 20 --format markdown
   ```
   *(Or run directly from the repository root via `node dist/cli/index.js url "https://www.example.com/" --max-bundles 20 --format markdown`.)*
   - To get raw structured JSON instead of Markdown, pass `--json`.

2. **How It Works Under the Hood**:
   - Fetches the page HTML and discovers `<script src="...">` bundles.
   - Prioritizes core bundles (`polyfills`, `vendor`, `framework`, `main`, `_app`, `index`, `webpack`).
   - Downloads up to `--max-bundles` JS files (plus any linked `.map` SourceMap files).
   - Runs **35 minification-invariant AST-grep rules** across all bundles to detect mangled `core-js` export tables (`Ce({target:"Array",...})`), direct prototype assignments (`Array.prototype.at = ...`), and Babel/SWC/TS helpers.
   - Inspects the application code's **Minimum Native Syntax Floor** (e.g. checking if the app already uses native `async/await` [ES2017] or ES6 `class` syntax [ES2015]).

---

## Workflow 2: Check a Local Bundled File

When the user asks you to check a local `.js` or `.mjs` bundle file:

1. **Run the File Scanner CLI**:
   ```bash
   npx polyfill-analyzer "/path/to/bundle.min.js" --format markdown
   ```
   - For tabular terminal output: omit `--format markdown` (defaults to `table`).
   - For JSON output: add `--json`.
   - If a `.map` file exists alongside the bundle (e.g., `bundle.min.js.map`) or via `//# sourceMappingURL=`, the tool automatically performs **1:1 Base64 VLQ SourceMap decoding**, linking each minified AST match back to the exact original source file and line!

---

## Workflow 3: Launch the Interactive Web UI Dashboard

If the user wants to explore the results visually in a browser:

1. **Start the Web UI Server**:
   ```bash
   npx polyfill-analyzer serve --port 3000
   ```
2. **Open the Dashboard**:
   - Navigate to `http://localhost:3000` in your browser.

---

## How to Structure Your Response to the User

Always present your analysis clearly with **Specific, High-Level Recommendations at the Very Top**, followed by supporting evidence:

### 1. 🎯 High-Level Executive Recommendations (What You Need To Do)
Highlight these 4 specific architectural findings right at the top of your summary:
- **🚨 Syntax vs. Polyfill Target Mismatch (`CRITICAL`)**:
  If the site's main/app bundles use modern native syntax (e.g., native `async/await` [ES2017+] or native `class` [ES2015+]), explain that any browser older than that syntax floor will fail with a `SyntaxError` before running the app. Therefore, shipping ES2015–ES2017 polyfills (`Promise`, `Object.assign`, `Array.prototype.includes`, `Object.entries`) is **100% unreachable dead weight**.
- **⚠️ Duplicate Polyfills Across Bundles (`HIGH`)**:
  Point out every feature that is polyfilled more than once across separate bundles (for example, when Next.js/Webpack ships `core-js` in `polyfills-*.js` AND re-defines `Array.prototype.at`, `Object.hasOwn`, or `Array.prototype.flat` inline in `main-*.js`).
- **⚠️ Obsolete `Baseline High` Polyfills (`HIGH`)**:
  List the percentage and count of detected polyfills that are **Baseline Widely Available** (natively supported across Chrome, Edge, Firefox, and Safari for 30+ months) and recommend updating `browserslist` to:
  ```json
  "browserslist": [
    "baseline widely available",
    "defaults and fully supports es6-module"
  ]
  ```
- **ℹ️ Modern `Baseline Low` Polyfills Worth Retaining (`INFO`)**:
  Identify any newly available features (Baseline 2024–2025, such as `Promise.withResolvers`, `Set.prototype.intersection`, or `Promise.try`) where retaining a targeted polyfill is still beneficial.

### 2. 📦 Bundle-by-Bundle Breakdown & 1:1 AST Snippets
Include a clean summary table showing each scanned bundle, its size in KB, its native syntax floor, and exact **1:1 minified AST snippets** (with byte offsets and original source map locations when available) so the engineering team can verify every detection deterministically.
