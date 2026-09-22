# Polyfill Analyzer E2E Test Infrastructure Specification

## 1. Test Philosophy

The end-to-end (E2E) testing infrastructure for the **Polyfill Analyzer** project is built upon rigorous, industrial-grade testing methodologies. Since the tool operates as a pipeline analyzer—processing JavaScript sample files through bundlers, scanning downlevel code with AST-grep rules, and synthesizing baseline compatibility recommendations via a CLI—our testing strategy enforces strict separation of concerns and progressive testability.

### 1.1 Opaque-Box Testing
All E2E tests operate as opaque-box verifications. Tests do not inspect or mock internal TypeScript module structures or class implementations. Instead, they interact exclusively with externally observable artifacts and interfaces:
- Generated bundle files on disk (`dist/bundles/...`)
- Rule catalog YAML definitions and schema structures
- CLI command execution, standard output (`stdout`), standard error (`stderr`), and process exit codes.

### 1.2 Requirement-Driven Verification
Every test case is explicitly traceable to a numbered functional requirement (F1 through F8) across the primary project deliverables:
- **R1**: Bundler Polyfill Generation Pipeline
- **R2**: AST-Grep Catalog & Web-Features Mapping
- **R3**: CLI Analysis & Modernization Engine (Future Milestones)

### 1.3 Category-Partition Method
Input spaces for sample files, bundlers, target compatibility environments, and AST rules are decomposed into discrete parameter categories and equivalence partitions. For example, ECMAScript samples are partitioned into legacy (`es2011`, `es2015`), intermediate (`es2018`, `es2020`), and modern (`es2024`, `es2026`) features.

### 1.4 Boundary Value Analysis (BVA)
To ensure robustness against malformed or edge-case inputs, BVA is systematically applied to all pipeline boundaries:
- Zero-byte and empty JavaScript sample files
- Files containing deliberate JavaScript syntax errors
- Boundary ES version targets (e.g., transitioning from ES5 to ES6/ES2015)
- Malformed AST-grep YAML rule paths and invalid `web-features` / BCD identifiers
- Missing bundler configuration files or unresolvable imports.

### 1.5 Pairwise Testing (Tier 3)
To control combinatorial explosion while maintaining comprehensive test coverage across multi-variable interactions (e.g., `[bundler: rollup, esbuild, webpack, swc] × [target: ie11, chrome50, es5, modern] × [sample: es2011 through es2026]`), pairwise combinatorial testing is utilized. This guarantees that every orthogonal pair of parameter values is exercised at least once.

### 1.6 Real-World Workloads (Tier 4)
Tier 4 tests validate realistic application workloads, including complex multi-sample bundles, synthetic production applications targeting legacy enterprise browsers (e.g., IE11, Chrome 50), and end-to-end roundtrip analysis from build generation to CLI modernization reporting.

---

## 2. Feature Inventory Table

The following table catalogs the 8 core features of the Polyfill Analyzer ecosystem and defines their test specifications:

| ID | Feature Name | Target Artifact / Interface | Requirement Source | Description |
| :--- | :--- | :--- | :--- | :--- |
| **F1** | Automated Polyfill Bundle Generation | `dist/bundles/<bundler>/<sample>_<target>.js` | R1 (Bundler Pipeline) | Verifies automated transpilation and polyfill injection across all 4 supported bundlers (Rollup, esbuild, Webpack, SWC) for all 13 historical ES sample files (`es2011` through `es2026`) targeting specific downlevel environments. |
| **F2** | Reference Modern Bundle Generation | `dist/bundles/<bundler>/<sample>_modern.js` | R1 (Bundler Pipeline) | Verifies the generation of modern, native reference bundles across all 4 bundlers and 13 sample files without polyfill injection, preserving native ES syntax for comparative AST analysis. |
| **F3** | AST-Grep Rule Catalog Linking | `src/catalog/rules.json` / YAML rules | R2 (Catalog & Rules) | Verifies that the catalog links $\ge 10$ distinct ECMAScript features to valid AST-grep rule YAMLs, mandatory `bundlers` array schema verification, standardized `web-features` IDs, and MDN Browser Compat Data (BCD) IDs. |
| **F4** | Catalog Validation & Zero False Positives | AST-grep scanner execution | R2 (Catalog & Rules) | Enforces 0 false-positive detections when running catalog rules across all 4 bundlers and 13 sample files against native modern non-polyfilled bundles (`*_modern.js`). |
| **F5** | CLI Bundle Analysis Execution | `bin/analyze.js <path_to_bundle.js>` | R3 (CLI Engine) | Verifies CLI execution against target bundle files, ensuring correct parsing, file resolution, and rule invocation. |
| **F6** | CLI Baseline Inference | CLI JSON/Table output | R3 (CLI Engine) | Verifies that the CLI accurately infers Baseline status (`low`, `high`, `false`) and baseline year based on detected downlevel polyfills and formats bundlers provenance columns and summary information. |
| **F7** | CLI Modernization Recommendations | CLI output text | R3 (CLI Engine) | Verifies that the CLI outputs actionable modernization suggestions incorporating bundler attribution strings when redundant polyfills are detected. |
| **F8** | CLI Structured Output Format | JSON & Table formatted CLI output | R3 (CLI Engine) | Verifies CLI output formatting flags (`--format json`, `--format table`), schema adherence, and graceful error handling on invalid inputs. |

---

## 3. Coverage Thresholds and Test Tiers

To achieve rigorous test maturity, the suite is organized into four distinct execution tiers with strict quantitative minimums:

| Tier | Name | Focus & Scope | Coverage Threshold | Minimum Cases |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | Feature Acceptance | Functional verification of core requirements under happy-path conditions | $\ge 5$ test cases per feature (F1–F8) | 59 |
| **Tier 2** | Boundary & Corner | Robustness testing via BVA, syntax errors, missing configs, and extreme inputs | $\ge 5$ test cases per feature (F1–F8) | 53 |
| **Tier 3** | Cross-Feature Pairwise | Combinatorial integration testing across R1 pipeline outputs and R2 catalog rules | Pairwise coverage of bundler $\times$ target $\times$ rule interactions | 35 |
| **Tier 4** | Application Scenarios | End-to-end user workflows and real-world multi-feature bundle analysis | $\ge 5$ application workflow scenarios | 20 |
| **Total** | **Full E2E Suite** | Comprehensive opaque-box verification across all project milestones | **Minimum total test cases across suite** | **$\sim 167$** |

---

## 4. Progressive Testability Architecture

Because E2E tests are developed concurrently with or ahead of product implementation (TDD/E2E-first engineering), the test runner and test cases adhere to **Progressive Testability**:
1. **No Unhandled Crashes**: Tests checking for non-existent directories, unbuilt bundles, or missing CLI binaries must catch system exceptions (`ENOENT`, module resolution errors) and emit clean assertion failures or skip summaries rather than crashing the Node.js process.
2. **Zero-Dependency Runner**: The infrastructure uses a custom Node.js runner located at `tests/e2e_requirements/runner.js` with zero third-party testing dependencies, ensuring portability and lightweight execution across CI/CD environments.
3. **Structured Reporting**: Every test execution reports precise counts for `Passed`, `Failed`, and `Skipped` tests along with detailed diagnostics for failure analysis.
