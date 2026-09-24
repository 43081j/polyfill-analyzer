import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {
  scan,
  SourceMapConsumer,
  computeBaselineStatus,
  inferBaselineYear,
  generateRecommendations,
  scanWebsiteUrl,
  analyzeBundles,
  formatWebsiteMarkdownReport,
  formatWebsiteHtmlReport,
  WebsiteScanReport,
} from '../engine/index.js';
import { loadCatalog } from '../catalog/index.js';

const UI_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Polyfill & Transform Analyzer — Web Platform Baseline</title>
  <style>
    :root {
      --bg: #0f172a;
      --bg-card: #1e293b;
      --bg-card-hover: #26354d;
      --bg-code: #0b1120;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: #334155;
      --primary: #38bdf8;
      --primary-hover: #0284c7;
      --critical-bg: rgba(239, 68, 68, 0.12);
      --critical-border: #ef4444;
      --critical-text: #fca5a5;
      --high-bg: rgba(245, 158, 11, 0.12);
      --high-border: #f59e0b;
      --high-text: #fcd34d;
      --info-bg: rgba(56, 189, 248, 0.12);
      --info-border: #38bdf8;
      --info-text: #bae6fd;
      --success-bg: rgba(34, 197, 94, 0.12);
      --success-border: #22c55e;
      --success-text: #86efac;
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      line-height: 1.6;
      min-height: 100vh;
    }

    header {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border-bottom: 1px solid var(--border);
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .brand-icon {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      background: linear-gradient(135deg, #38bdf8, #818cf8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.25rem;
      color: #0f172a;
    }

    .brand h1 {
      font-size: 1.35rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .brand p {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .mode-tabs {
      display: flex;
      gap: 0.5rem;
      background: var(--bg-code);
      padding: 0.35rem;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .mode-tab {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 0.45rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.15s ease;
    }

    .mode-tab.active {
      background: var(--bg-card);
      color: var(--primary);
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }

    main {
      max-width: 1360px;
      margin: 0 auto;
      padding: 2rem;
    }

    .control-panel {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }

    .url-input-group {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .input-wrapper {
      flex: 1;
      min-width: 280px;
      position: relative;
    }

    input[type="text"], textarea {
      width: 100%;
      background: var(--bg-code);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 0.8rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      font-family: var(--font-mono);
      outline: none;
      transition: border-color 0.2s;
    }

    input[type="text"]:focus, textarea:focus {
      border-color: var(--primary);
    }

    .btn {
      background: var(--primary);
      color: #0f172a;
      font-weight: 700;
      border: none;
      padding: 0.8rem 1.4rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.95rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn:hover:not(:disabled) {
      background: #7dd3fc;
      transform: translateY(-1px);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: var(--bg-code);
      color: var(--text);
      border: 1px solid var(--border);
      font-weight: 600;
    }

    .btn-secondary:hover:not(:disabled) {
      background: var(--bg-card-hover);
      border-color: var(--primary);
    }

    .quick-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1rem;
      flex-wrap: wrap;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .pill-btn {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: var(--primary);
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 600;
      transition: all 0.15s;
    }

    .pill-btn:hover {
      background: rgba(56, 189, 248, 0.2);
    }

    /* Loading Spinner */
    .loader {
      display: none;
      align-items: center;
      gap: 0.75rem;
      padding: 1.25rem;
      background: rgba(56, 189, 248, 0.08);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 10px;
      margin-bottom: 2rem;
      color: var(--primary);
      font-weight: 600;
    }

    .spinner {
      width: 22px;
      height: 22px;
      border: 3px solid rgba(56, 189, 248, 0.3);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Executive Recommendations Banner */
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .section-header h2 {
      font-size: 1.25rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .recommendations-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2.25rem;
    }

    .rec-card {
      border-radius: 12px;
      padding: 1.35rem 1.5rem;
      border-left: 5px solid;
      background: var(--bg-card);
      border-top: 1px solid var(--border);
      border-right: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .rec-card.priority-CRITICAL {
      border-left-color: var(--critical-border);
      background: linear-gradient(90deg, var(--critical-bg) 0%, var(--bg-card) 100%);
    }

    .rec-card.priority-HIGH {
      border-left-color: var(--high-border);
      background: linear-gradient(90deg, var(--high-bg) 0%, var(--bg-card) 100%);
    }

    .rec-card.priority-INFO {
      border-left-color: var(--info-border);
      background: linear-gradient(90deg, var(--info-bg) 0%, var(--bg-card) 100%);
    }

    .rec-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.65rem;
      flex-wrap: wrap;
    }

    .badge {
      font-size: 0.72rem;
      font-weight: 800;
      padding: 0.2rem 0.55rem;
      border-radius: 5px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .badge-CRITICAL { background: var(--critical-border); color: #0f172a; }
    .badge-HIGH { background: var(--high-border); color: #0f172a; }
    .badge-INFO { background: var(--info-border); color: #0f172a; }
    .badge-high-status { background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid #ef4444; }
    .badge-low-status { background: rgba(56, 189, 248, 0.2); color: #bae6fd; border: 1px solid #38bdf8; }

    .rec-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text);
    }

    .rec-desc {
      color: #cbd5e1;
      font-size: 0.92rem;
      margin-bottom: 0.85rem;
    }

    .rec-action {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
    }

    .rec-action strong {
      color: var(--primary);
      white-space: nowrap;
    }

    /* KPI Grid */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 1rem;
      margin-bottom: 2.25rem;
    }

    .kpi-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1.15rem 1.25rem;
    }

    .kpi-label {
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 0.35rem;
    }

    .kpi-value {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--text);
    }

    .kpi-sub {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
    }

    /* Tables & Bundles */
    .bundle-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      margin-bottom: 1.25rem;
      overflow: hidden;
    }

    .bundle-header {
      padding: 1rem 1.35rem;
      background: rgba(15, 23, 42, 0.5);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.75rem;
      cursor: pointer;
    }

    .bundle-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.95rem;
    }

    .bundle-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
    }

    th {
      text-align: left;
      padding: 0.75rem 1.25rem;
      background: rgba(15, 23, 42, 0.35);
      color: var(--text-muted);
      font-weight: 600;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid var(--border);
    }

    td {
      padding: 0.8rem 1.25rem;
      border-bottom: 1px solid rgba(51, 65, 85, 0.5);
      vertical-align: top;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .code-snippet {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      background: var(--bg-code);
      padding: 0.45rem 0.65rem;
      border-radius: 6px;
      border: 1px solid var(--border);
      color: #38bdf8;
      display: block;
      max-width: 580px;
      overflow-x: auto;
      white-space: pre;
    }

    .filter-bar {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
      flex-wrap: wrap;
    }

    .export-actions {
      display: flex;
      gap: 0.5rem;
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <div class="brand-icon">JS</div>
      <div>
        <h1>Polyfill & Transform Analyzer</h1>
        <p>AST-driven 1:1 Minified Bundle Inspector & Web Platform Baseline Advisor</p>
      </div>
    </div>
    <div class="mode-tabs">
      <button class="mode-tab active" onclick="switchMode('url')">🌐 Scan Website URL</button>
      <button class="mode-tab" onclick="switchMode('code')">📄 Paste / Upload Bundle</button>
    </div>
  </header>

  <main>
    <!-- Baseline Target Configuration Bar -->
    <div class="control-panel" style="padding: 0.9rem 1.25rem; margin-bottom: 1rem; display: flex; flex-wrap: wrap; align-items: center; gap: 1rem;">
      <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-main);">🎯 Baseline Target Warning Threshold:</div>
      <select id="baseline-target-mode" onchange="onBaselineTargetModeChange()" style="background: rgba(15,23,42,0.85); color: var(--text-main); border: 1px solid var(--border); border-radius: 8px; padding: 0.45rem 0.75rem; font-size: 0.85rem;">
        <option value="default">Baseline Widely available (Today — default)</option>
        <option value="target-year">--target-year (Available in all browsers by end of YYYY)</option>
        <option value="widely-available-on-date">--widely-available-on-date (Widely available on YYYY-MM-DD, i.e. low_date - 30m)</option>
      </select>
      <input type="number" id="baseline-target-year" min="2015" max="2026" value="2022" placeholder="2022" style="display: none; width: 100px; padding: 0.45rem 0.75rem; font-size: 0.85rem;" />
      <input type="date" id="baseline-target-date" value="2025-01-01" style="display: none; width: 165px; padding: 0.45rem 0.75rem; font-size: 0.85rem; background: rgba(15,23,42,0.85); color: var(--text-main); border: 1px solid var(--border); border-radius: 8px;" />
    </div>

    <!-- URL Mode Control Panel -->
    <div id="panel-url" class="control-panel">
      <div class="url-input-group">
        <div class="input-wrapper">
          <input type="text" id="target-url" placeholder="Enter a website URL to analyze (e.g. https://example.com)..." value="" onkeydown="if(event.key==='Enter') runUrlScan()" />
        </div>
        <button class="btn" id="btn-scan-url" onclick="runUrlScan()">
          <span>🔍 Analyze Website Bundles</span>
        </button>
      </div>
    </div>

    <!-- Code Mode Control Panel -->
    <div id="panel-code" class="control-panel" style="display: none;">
      <div style="margin-bottom: 0.75rem;">
        <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 0.35rem;">
          Paste Minified JavaScript Bundle (or ES5/Babel/SWC transpiled output):
        </label>
        <textarea id="code-input" rows="7" placeholder="Ce({target:'Array',proto:!0},{at:function(t){...}})"></textarea>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <button class="pill-btn" onclick="loadSampleMinifiedSnippet()">✨ Insert Sample Mangled core-js & Babel Bundle</button>
        <button class="btn" onclick="runCodeScan()">🔍 Scan JavaScript Code</button>
      </div>
    </div>

    <!-- Loader -->
    <div id="loader" class="loader">
      <div class="spinner"></div>
      <span id="loader-text">Fetching HTML & scanning production JavaScript bundles with @ast-grep/napi...</span>
    </div>

    <!-- Results Container -->
    <div id="results-container" style="display: none;">
      <!-- Top High-Level Recommendations Section -->
      <div class="section-header">
        <h2>🎯 High-Level Executive Recommendations (What You Need To Do)</h2>
        <div class="export-actions">
          <button class="btn btn-secondary" onclick="downloadHtmlReport()">⬇️ Export Standalone HTML</button>
          <button class="btn btn-secondary" onclick="downloadMarkdownReport()">⬇️ Export Markdown Report</button>
          <button class="btn btn-secondary" onclick="downloadJsonReport()">⬇️ Export JSON</button>
        </div>
      </div>

      <div id="recommendations-list" class="recommendations-list"></div>

      <!-- KPI Overview Cards -->
      <div id="kpi-grid" class="kpi-grid"></div>

      <!-- Duplicate Polyfills Section -->
      <div id="duplicates-section" style="display: none; margin-bottom: 2.25rem;">
        <div class="section-header">
          <h2>🔄 Duplicate Polyfills Shipped Across Multiple Bundles</h2>
        </div>
        <div class="bundle-card">
          <table>
            <thead>
              <tr>
                <th>Feature Name</th>
                <th>Baseline Year</th>
                <th>Status</th>
                <th>Duplicated In Bundles (with 1:1 Byte Offsets)</th>
              </tr>
            </thead>
            <tbody id="duplicates-tbody"></tbody>
          </table>
        </div>
      </div>

      <!-- Bundle-by-Bundle Breakdown -->
      <div class="section-header">
        <h2>📦 Bundle-by-Bundle Breakdown & 1:1 AST Matches</h2>
        <div class="filter-bar">
          <button class="pill-btn" onclick="filterBundles('all')">All Bundles</button>
          <button class="pill-btn" onclick="filterBundles('polyfills')">With Polyfills Only</button>
          <button class="pill-btn" onclick="filterBundles('high')">Obsolete (Baseline Widely available)</button>
        </div>
      </div>
      <div id="bundles-list"></div>
    </div>
  </main>

  <script>
    let currentReport = null;
    let activeFilter = 'all';

    function switchMode(mode) {
      document.querySelectorAll('.mode-tab').forEach((t, idx) => {
        t.classList.toggle('active', (mode === 'url' && idx === 0) || (mode === 'code' && idx === 1));
      });
      document.getElementById('panel-url').style.display = mode === 'url' ? 'block' : 'none';
      document.getElementById('panel-code').style.display = mode === 'code' ? 'block' : 'none';
    }

    function setLoader(visible, text) {
      const el = document.getElementById('loader');
      el.style.display = visible ? 'flex' : 'none';
      if (text) document.getElementById('loader-text').textContent = text;
    }

    function setUrlAndScan(url) {
      document.getElementById('target-url').value = url;
      runUrlScan();
    }

    async function loadTargetDemo() {
      setLoader(true, 'Loading example.com 20-bundle production AST analysis...');
      try {
        const res = await fetch('/api/demo-target');
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        renderReport(data);
      } catch (err) {
        alert('Error loading demo: ' + err.message);
      } finally {
        setLoader(false);
      }
    }

    function onBaselineTargetModeChange() {
      const mode = document.getElementById('baseline-target-mode').value;
      document.getElementById('baseline-target-year').style.display = mode === 'target-year' ? 'inline-block' : 'none';
      document.getElementById('baseline-target-date').style.display = mode === 'widely-available-on-date' ? 'inline-block' : 'none';
    }

    function getBaselineTargetPayload() {
      const mode = document.getElementById('baseline-target-mode').value;
      if (mode === 'target-year') {
        const yr = parseInt(document.getElementById('baseline-target-year').value, 10);
        return { targetYear: Number.isNaN(yr) ? undefined : yr };
      }
      if (mode === 'widely-available-on-date') {
        const dt = document.getElementById('baseline-target-date').value;
        return { widelyAvailableOnDate: dt || undefined };
      }
      return {};
    }

    async function runUrlScan() {
      const url = document.getElementById('target-url').value.trim();
      if (!url) return alert('Please enter a website URL');
      setLoader(true, 'Fetching ' + url + ' and analyzing production JavaScript bundles...');
      try {
        const res = await fetch('/api/scan-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, maxBundles: 20, ...getBaselineTargetPayload() })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        renderReport(data);
      } catch (err) {
        alert('Scan failed: ' + err.message);
      } finally {
        setLoader(false);
      }
    }

    function loadSampleMinifiedSnippet() {
      document.getElementById('code-input').value = [
        '/* Sample Minified Production Bundle with core-js + inline shims */',
        'Ce({global:!0,constructor:!0,wrap:!0,forced:sm},{Promise:vm});',
        'Ce({target:"Array",proto:!0},{at:function(t){var e=it(this),r=de(e),n=ce(t),o=n>=0?n:r+n;return o<0||o>=r?void 0:e[o]}});',
        'Ce({target:"Object",stat:!0},{hasOwn:ut});',
        'Array.prototype.flat=function(e,t){return t=this.concat.apply([],this),e>1&&t.some(Array.isArray)?t.flat(e-1):t};',
        'async function fetchUserData(id) { const res = await fetch("/api/user/" + id); return res.json(); }'
      ].join('\\n');
    }

    async function runCodeScan() {
      const code = document.getElementById('code-input').value;
      if (!code.trim()) return alert('Please paste some JavaScript code');
      setLoader(true, 'Running AST-grep polyfill & syntax analysis on code...');
      try {
        const res = await fetch('/api/scan-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, filename: 'pasted-bundle.min.js', ...getBaselineTargetPayload() })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        renderReport(data);
      } catch (err) {
        alert('Code scan failed: ' + err.message);
      } finally {
        setLoader(false);
      }
    }

    function renderReport(report) {
      currentReport = report;
      document.getElementById('results-container').style.display = 'block';

      // 1. Render High-Level Recommendations at the top
      const recContainer = document.getElementById('recommendations-list');
      recContainer.innerHTML = '';
      for (const rec of report.highLevelRecommendations || []) {
        const card = document.createElement('div');
        card.className = 'rec-card priority-' + rec.priority;
        card.innerHTML = \`
          <div class="rec-header">
            <span class="badge badge-\${rec.priority}">\${rec.priority}</span>
            <span class="rec-title">\${escapeHtml(rec.title)}</span>
          </div>
          <div class="rec-desc">\${escapeHtml(rec.description)}</div>
          <div class="rec-action">
            <strong>👉 Action Required:</strong>
            <span>\${escapeHtml(rec.actionItem)}</span>
          </div>
        \`;
        recContainer.appendChild(card);
      }

      // 2. Render KPI Grid
      const s = report.summary;
      const bt = report.baselineTarget;
      const targetShortName = bt?.shortTargetName || 'Baseline Widely available';
      const totalKB = (s.totalBytesScanned / 1024).toFixed(1);
      const highBtn = document.querySelector('button[onclick="filterBundles(\\'high\\')"]');
      if (highBtn) {
        highBtn.textContent = 'Obsolete (' + targetShortName + ')';
      }
      const estSavingsKB = ((s.estimatedTotalSavingsBytes || 0) / 1024).toFixed(1);
      const polyBundleKB = ((s.polyfillsBundleTotalBytes || 0) / 1024).toFixed(1);
      const postBundleKB = ((s.estimatedPostRemovalPolyfillBundleBytes || 0) / 1024).toFixed(1);
      const savingsPct = s.estimatedPolyfillBundleSavingsPercentage || 0;
      document.getElementById('kpi-grid').innerHTML = \`
        <div class="kpi-card">
          <div class="kpi-label">Bundles Analyzed</div>
          <div class="kpi-value">\${s.totalBundlesScanned}</div>
          <div class="kpi-sub">\${totalKB} KB total client JS</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Polyfills Detected</div>
          <div class="kpi-value">\${s.totalPolyfillInstances}</div>
          <div class="kpi-sub">Across \${s.uniqueFeaturesPolyfilled} distinct ES features</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Redundant (\${escapeHtml(targetShortName)})</div>
          <div class="kpi-value" style="color: \${s.redundantPercentage > 50 ? '#fca5a5' : '#86efac'}">\${s.redundantPercentage}%</div>
          <div class="kpi-sub">\${s.redundantPolyfillCount} of \${s.totalPolyfillInstances} natively in \${escapeHtml(targetShortName)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Estimated Size Savings</div>
          <div class="kpi-value" style="color: #38bdf8">-\${estSavingsKB} KB</div>
          <div class="kpi-sub">\${polyBundleKB} KB &rarr; ~\${postBundleKB} KB (-\${savingsPct}%)</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Duplicate Polyfills</div>
          <div class="kpi-value" style="color: \${s.duplicateFeatureCount > 0 ? '#fcd34d' : '#86efac'}">\${s.duplicateFeatureCount}</div>
          <div class="kpi-sub">Shipped in multiple chunks</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Newest Un-Polyfilled Feature</div>
          <div class="kpi-value" style="font-size: 1.25rem; line-height: 1.3;">\${escapeHtml(s.siteMostModernFeatureName || 'ES' + s.siteNativeSyntaxFloorYear)}</div>
          <div class="kpi-sub">Baseline: \${escapeHtml(s.siteMostModernFeatureBaselineDate || String(s.siteNativeSyntaxFloorYear))} &middot; Oldest polyfill: \${s.inferredPolyfillFloorYear ? 'ES' + s.inferredPolyfillFloorYear : 'None'}</div>
        </div>
      \`;

      // 3. Render Duplicate Polyfills Table
      const dupSection = document.getElementById('duplicates-section');
      const dupTbody = document.getElementById('duplicates-tbody');
      if (report.duplicatePolyfills && report.duplicatePolyfills.length > 0) {
        dupSection.style.display = 'block';
        dupTbody.innerHTML = report.duplicatePolyfills.map(d => \`
          <tr>
            <td><strong>\${escapeHtml(d.featureName)}</strong> (<code>\${d.featureId}</code>)</td>
            <td>\${d.baselineYear || 'N/A'}</td>
            <td><span class="badge badge-\${d.status}-status">\${formatBaselineStatus(d.status)}</span></td>
            <td>\${d.occurrences.map(o => \`<code>\${escapeHtml(o.bundleName)}</code> (offset \${o.offset ?? '?'})\`).join(' &bull; ')}</td>
          </tr>
        \`).join('');
      } else {
        dupSection.style.display = 'none';
      }

      // 4. Render Bundles
      renderBundlesList();
    }

    function formatBaselineStatus(status) {
      if (status === 'high') return 'Baseline Widely available';
      if (status === 'low') return 'Baseline Newly available';
      return 'Limited availability';
    }

    function filterBundles(mode) {
      activeFilter = mode;
      renderBundlesList();
    }

    function renderBundlesList() {
      if (!currentReport) return;
      const list = document.getElementById('bundles-list');
      list.innerHTML = '';

      const bt = currentReport.baselineTarget;
      const targetShortName = bt?.shortTargetName || 'Baseline Widely available';
      const supportedIds = new Set((bt?.supportedByTargetFeatures || []).map(r => r.id));

      const bundles = currentReport.bundles.filter(b => {
        if (activeFilter === 'polyfills') return b.detectedPolyfills.length > 0;
        if (activeFilter === 'high') {
          return b.detectedPolyfills.some(d =>
            bt && bt.mode !== 'default' ? supportedIds.has(d.id) : d.baselineStatus === 'high'
          );
        }
        return true;
      });

      for (const b of bundles) {
        const kb = (b.sizeBytes / 1024).toFixed(1);
        const savedKb = ((b.estimatedSavingsBytes || 0) / 1024).toFixed(1);
        const postKb = ((b.estimatedPostRemovalBytes ?? b.sizeBytes) / 1024).toFixed(1);
        const pct = b.estimatedSavingsPercentage || 0;
        const card = document.createElement('div');
        card.className = 'bundle-card';

        const statusBadge = b.detectedPolyfills.length === 0
          ? '<span class="badge" style="background: rgba(34,197,94,0.2); color: #86efac;">✅ CLEAN (0 Polyfills)</span>'
          : \`<span class="badge badge-HIGH">\${b.detectedPolyfills.length} Polyfills Detected</span>\`;

        const savingsBadge = b.detectedPolyfills.length > 0 && (b.estimatedSavingsBytes || 0) > 0
          ? \`<span>Est. After Removal: <strong style="color: #86efac;">~\${postKb} KB</strong></span>
             <span class="badge badge-high-status">💾 Save ~\${savedKb} KB (-\${pct}%)</span>\`
          : '';

        let tableHtml = '';
        if (b.detectedPolyfills.length > 0) {
          const rows = b.detectedPolyfills.map(d => {
            const loc = d.mapping?.minifiedPolyfill || {};
            const origList = d.mapping?.precedingSource || [];
            const origHtml = origList.length > 0
              ? origList.map(o => \`<div style="margin-top:0.3rem; font-size:0.75rem; color:#86efac;">↳ Source Map: <code>\${escapeHtml(o.sourceFile)}:\${o.line}</code></div>\`).join('')
              : '';
            const isObsolete = bt && bt.mode !== 'default' ? supportedIds.has(d.id) : d.baselineStatus === 'high';
            const estFeatureKb = ((d.estimatedSizeBytes || 1800) / 1024).toFixed(1);
            const targetVerdictHtml = bt && bt.mode !== 'default'
              ? (isObsolete
                ? \`<div style="margin-bottom:0.3rem;"><span class="badge badge-high-status">✅ Obsolete in \${escapeHtml(targetShortName)}</span></div>\`
                : \`<div style="margin-bottom:0.3rem;"><span class="badge badge-low-status">⚠️ Exceeds \${escapeHtml(targetShortName)} (\${escapeHtml(d.baselineLowDate || String(d.baselineYear || 'N/A'))})</span></div>\`)
              : '';
            return \`
              <tr>
                <td><strong>\${escapeHtml(d.name)}</strong><br><code style="font-size:0.75rem; color:var(--text-muted)">\${d.id}</code></td>
                <td>\${d.baselineYear ?? 'N/A'}</td>
                <td>
                  <strong>~\${estFeatureKb} KB</strong><br>
                  <span style="font-size:0.73rem; color:\${isObsolete ? '#86efac' : '#fde047'}">\${isObsolete ? '🗑️ Save if removed' : '📌 Retained for target'}</span>
                </td>
                <td>\${targetVerdictHtml}<span class="badge badge-\${d.baselineStatus}-status" style="\${bt && bt.mode !== 'default' ? 'opacity:0.82;' : ''}">\${formatBaselineStatus(d.baselineStatus)}</span></td>
                <td>Line \${loc.line ?? 1}, Col \${loc.column ?? '?'}<br><span style="font-size:0.75rem; color:var(--text-muted)">Offset: \${loc.byteOffset ?? 'N/A'}</span></td>
                <td>
                  <code class="code-snippet">\${escapeHtml(loc.snippet || '')}</code>
                  \${origHtml}
                </td>
              </tr>
            \`;
          }).join('');

          tableHtml = \`
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Baseline Year</th>
                  <th>Est. Size</th>
                  <th>Status</th>
                  <th>Minified AST Location</th>
                  <th>1:1 Production AST Match Snippet</th>
                </tr>
              </thead>
              <tbody>\${rows}</tbody>
            </table>
          \`;
        }

        card.innerHTML = \`
          <div class="bundle-header">
            <div class="bundle-title">
              \${statusBadge}
              <span>\${escapeHtml(b.fileName)}</span>
              <span style="color: var(--text-muted); font-weight: 400;">(\${kb} KB)</span>
            </div>
            <div class="bundle-meta">
              \${savingsBadge}
              <span>Newest Un-Polyfilled: <strong>\${escapeHtml(b.nativeSyntaxStats.mostModernFeatureName || 'ES' + b.nativeSyntaxStats.inferredSyntaxFloorYear)}</strong>\${b.nativeSyntaxStats.mostModernFeatureBaselineDate ? ' (' + escapeHtml(b.nativeSyntaxStats.mostModernFeatureBaselineDate) + ')' : ''}</span>
            </div>
          </div>
          \${tableHtml}
        \`;
        list.appendChild(card);
      }
    }

    function downloadHtmlReport() {
      if (!currentReport) return;
      fetch('/api/format-html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentReport)
      })
      .then(r => r.text())
      .then(html => {
        const blob = new Blob([html], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'polyfill-analysis-report.html';
        a.click();
      });
    }

    function downloadMarkdownReport() {
      if (!currentReport) return;
      fetch('/api/format-markdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentReport)
      })
      .then(r => r.text())
      .then(md => {
        const blob = new Blob([md], { type: 'text/markdown' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'polyfill-analysis-report.md';
        a.click();
      });
    }

    function downloadJsonReport() {
      if (!currentReport) return;
      const blob = new Blob([JSON.stringify(currentReport, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'polyfill-analysis-report.json';
      a.click();
    }

    function escapeHtml(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }
  </script>
</body>
</html>`;

export function loadCachedTargetReport(): WebsiteScanReport | null {
  const targetDir = path.resolve(process.cwd(), 'scratch/target_bundles');
  if (!fs.existsSync(targetDir)) return null;

  const files = fs.readdirSync(targetDir).filter((f) => f.endsWith('.js')).sort();
  if (files.length === 0) return null;

  const rawBundles: Array<{ url: string; fileName: string; code: string; sourceMapJson?: string }> = [];
  for (const fileName of files) {
    const fullPath = path.join(targetDir, fileName);
    const code = fs.readFileSync(fullPath, 'utf8');
    let sourceMapJson: string | undefined;
    if (fs.existsSync(fullPath + '.map')) {
      sourceMapJson = fs.readFileSync(fullPath + '.map', 'utf8');
    }
    const cleanChunkName = fileName.replace(/^\d+_/, '');
    rawBundles.push({
      url: `https://assets.targetimg1.com/webui/top-of-funnel/_next/static/chunks/${cleanChunkName}`,
      fileName,
      code,
      sourceMapJson,
    });
  }

  return analyzeBundles('https://www.example.com/', 62, rawBundles);
}

export function startWebServer(port = 3000): http.Server {
  const server = http.createServer(async (req, res) => {
    // Enable CORS for easy local/remote API access
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const urlObj = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

    if ((req.method === 'GET' || req.method === 'HEAD') && (urlObj.pathname === '/' || urlObj.pathname === '/index.html')) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(req.method === 'HEAD' ? undefined : UI_HTML);
      return;
    }

    if (req.method === 'GET' && urlObj.pathname === '/api/catalog') {
      const catalog = loadCatalog();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(catalog, null, 2));
      return;
    }

    if (req.method === 'GET' && urlObj.pathname === '/api/demo-target') {
      try {
        const cached = loadCachedTargetReport();
        if (cached) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(cached));
          return;
        }
        // Fallback to live scan if scratch/target_bundles not present
        const live = await scanWebsiteUrl('https://www.example.com/', { maxBundles: 15 });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(live));
      } catch (err: any) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (req.method === 'POST' && urlObj.pathname === '/api/scan-url') {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', async () => {
        try {
          const { url, maxBundles, targetYear, widelyAvailableOnDate } = JSON.parse(body || '{}');
          if (!url) throw new Error('Missing url parameter');
          const report = await scanWebsiteUrl(url, {
            maxBundles: maxBundles ?? 20,
            targetYear: targetYear !== undefined ? Number(targetYear) : undefined,
            widelyAvailableOnDate,
          });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(report));
        } catch (err: any) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    if (req.method === 'POST' && urlObj.pathname === '/api/scan-code') {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          const { code, filename, sourceMap, targetYear, widelyAvailableOnDate } = JSON.parse(
            body || '{}'
          );
          if (!code) throw new Error('Missing code parameter');
          const report = analyzeBundles(
            filename || 'bundle.js',
            1,
            [
              {
                url: filename || 'bundle.js',
                fileName: filename || 'bundle.js',
                code,
                sourceMapJson: sourceMap,
              },
            ],
            {
              targetYear: targetYear !== undefined ? Number(targetYear) : undefined,
              widelyAvailableOnDate,
            }
          );
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(report));
        } catch (err: any) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    if (req.method === 'POST' && urlObj.pathname === '/api/format-markdown') {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          const report = JSON.parse(body || '{}');
          const md = formatWebsiteMarkdownReport(report);
          res.writeHead(200, { 'Content-Type': 'text/markdown; charset=utf-8' });
          res.end(md);
        } catch (err: any) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error formatting markdown: ' + err.message);
        }
      });
      return;
    }

    if (req.method === 'POST' && urlObj.pathname === '/api/format-html') {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          const report = JSON.parse(body || '{}');
          const html = formatWebsiteHtmlReport(report);
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(html);
        } catch (err: any) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error formatting HTML: ' + err.message);
        }
      });
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  });

  const tryListen = (currentPort: number) => {
    server.once('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️  Port ${currentPort} is already in use, trying port ${currentPort + 1}...`);
        tryListen(currentPort + 1);
      } else {
        console.error('Server error:', err);
      }
    });

    server.listen(currentPort, '0.0.0.0', () => {
      console.log(`\n🚀 Polyfill & Transform Analyzer Web UI is running on 0.0.0.0:${currentPort}!`);
      console.log(`   Local URL:    http://localhost:${currentPort}`);
          });
  };

  tryListen(port);

  return server;
}
