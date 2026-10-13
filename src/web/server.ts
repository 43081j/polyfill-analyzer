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
import { loadCatalog } from 'polyfill-patterns';

const UI_HTML = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Polyfill & Transform Analyzer — Web Platform Baseline</title>
  <script>
    (function() {
      try {
        var saved = localStorage.getItem('vitepress-theme-appearance') || localStorage.getItem('e18e-theme-appearance');
        var isDark = saved ? saved === 'dark' : true;
        document.documentElement.classList.toggle('dark', isDark);
      } catch (e) {}
    })();
  </script>
  <style>
    :root {
      --vp-c-white: #ffffff;
      --vp-c-black: #000000;
      --vp-c-neutral: var(--vp-c-black);
      --vp-c-neutral-inverse: var(--vp-c-white);

      --vp-c-bg: #ffffff;
      --vp-c-bg-alt: #f6f6f7;
      --vp-c-bg-elv: #ffffff;
      --vp-c-bg-soft: #f6f6f7;

      --vp-c-border: #c2c2c4;
      --vp-c-divider: #e2e2e3;
      --vp-c-gutter: #e2e2e3;

      --vp-c-text-1: #3c3c43;
      --vp-c-text-2: #67676c;
      --vp-c-text-3: #929295;

      --vp-c-brand-1: #c37822;
      --vp-c-brand-2: #cc7d24;
      --vp-c-brand-3: #cf8c3c;
      --vp-c-brand-soft: rgba(207, 140, 60, 0.14);

      --vp-c-green-1: #18794e;
      --vp-c-green-2: #299764;
      --vp-c-green-3: #30a46c;
      --vp-c-green-soft: rgba(16, 185, 129, 0.14);

      --vp-c-yellow-1: #915930;
      --vp-c-yellow-2: #946300;
      --vp-c-yellow-3: #9f6a00;
      --vp-c-yellow-soft: rgba(234, 179, 8, 0.14);

      --vp-c-red-1: #b8272c;
      --vp-c-red-2: #d5393e;
      --vp-c-red-3: #e0575b;
      --vp-c-red-soft: rgba(244, 63, 94, 0.14);

      --vp-c-purple-1: #6f42c1;
      --vp-c-purple-soft: rgba(159, 122, 234, 0.14);

      --vp-home-hero-name-background: linear-gradient(120deg, #7cb560, #cf8c3c);
      --vp-input-border-color: var(--vp-c-border);
      --vp-input-switch-bg-color: rgba(142, 150, 170, 0.16);
      --vp-shadow-1: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
      --vp-shadow-2: 0 3px 12px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.07);
      --vp-font-family-base: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --vp-font-family-mono: ui-monospace, "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace;

      --bg: var(--vp-c-bg);
      --bg-card: var(--vp-c-bg-soft);
      --bg-card-hover: var(--vp-c-bg-elv);
      --bg-code: var(--vp-c-bg-alt);
      --text: var(--vp-c-text-1);
      --text-main: var(--vp-c-text-1);
      --text-muted: var(--vp-c-text-2);
      --border: var(--vp-c-divider);
      --primary: var(--vp-c-brand-1);
      --primary-hover: var(--vp-c-brand-2);
      --font-sans: var(--vp-font-family-base);
      --font-mono: var(--vp-font-family-mono);
    }

    html.dark {
      color-scheme: dark;
      --vp-c-neutral: var(--vp-c-white);
      --vp-c-neutral-inverse: var(--vp-c-black);

      --vp-c-bg: #1b1b1f;
      --vp-c-bg-alt: #161618;
      --vp-c-bg-elv: #202127;
      --vp-c-bg-soft: #202127;

      --vp-c-border: #3c3f44;
      --vp-c-divider: #2e2e32;
      --vp-c-gutter: #000000;

      --vp-c-text-1: #dfdfd6;
      --vp-c-text-2: #98989f;
      --vp-c-text-3: #6a6a71;

      --vp-c-brand-1: #cf8c3c;
      --vp-c-brand-2: #cc7d24;
      --vp-c-brand-3: #c37822;
      --vp-c-brand-soft: rgba(207, 140, 60, 0.16);

      --vp-c-green-1: #3dd68c;
      --vp-c-green-2: #30a46c;
      --vp-c-green-3: #298459;
      --vp-c-green-soft: rgba(16, 185, 129, 0.16);

      --vp-c-yellow-1: #f9b44e;
      --vp-c-yellow-2: #da8b17;
      --vp-c-yellow-3: #a46a0a;
      --vp-c-yellow-soft: rgba(234, 179, 8, 0.16);

      --vp-c-red-1: #f66f81;
      --vp-c-red-2: #f14158;
      --vp-c-red-3: #b62a3c;
      --vp-c-red-soft: rgba(244, 63, 94, 0.16);

      --vp-c-purple-1: #c8abfa;
      --vp-c-purple-soft: rgba(159, 122, 234, 0.16);

      --vp-input-switch-bg-color: rgba(101, 117, 133, 0.16);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--vp-c-bg);
      color: var(--vp-c-text-1);
      font-family: var(--vp-font-family-base);
      line-height: 1.6;
      min-height: 100vh;
      transition: background-color 0.25s, color 0.25s;
    }

    header {
      background-color: var(--vp-c-bg);
      border-bottom: 1px solid var(--vp-c-divider);
      padding: 0 2rem;
      min-height: 4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      position: sticky;
      top: 0;
      z-index: 50;
      transition: background-color 0.25s, border-color 0.25s;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      padding: 0.65rem 0;
    }

    .brand-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #7cb560, #cf8c3c);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.15rem;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(207, 140, 60, 0.3);
    }

    .brand h1 {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      background: var(--vp-home-hero-name-background);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .brand p {
      font-size: 0.82rem;
      color: var(--vp-c-text-2);
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .nav-divider {
      width: 1px;
      height: 24px;
      background-color: var(--vp-c-divider);
    }

    /* Authentic e18e.dev / VitePress Dark/Light Toggle Switch */
    .VPSwitch {
      border: 1px solid var(--vp-input-border-color);
      background-color: var(--vp-input-switch-bg-color);
      border-radius: 11px;
      flex-shrink: 0;
      width: 40px;
      height: 22px;
      transition: border-color 0.25s, background-color 0.25s;
      display: inline-block;
      position: relative;
      cursor: pointer;
    }
    .VPSwitch:hover { border-color: var(--vp-c-brand-1); }
    .VPSwitch .check {
      background-color: var(--vp-c-neutral-inverse);
      width: 18px;
      height: 18px;
      box-shadow: var(--vp-shadow-1);
      border-radius: 50%;
      transition: transform 0.25s, background-color 0.25s;
      position: absolute;
      top: 1px;
      left: 1px;
    }
    .VPSwitch .icon {
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: block;
      position: relative;
      overflow: hidden;
    }
    .VPSwitch .icon svg {
      width: 12px;
      height: 12px;
      color: var(--vp-c-text-2);
      position: absolute;
      top: 3px;
      left: 3px;
      transition: opacity 0.25s;
    }
    html.dark .VPSwitch .icon svg { color: var(--vp-c-text-1); }
    .VPSwitch .sun { opacity: 1; }
    .VPSwitch .moon { opacity: 0; }
    html.dark .VPSwitch .sun { opacity: 0; }
    html.dark .VPSwitch .moon { opacity: 1; }
    html.dark .VPSwitchAppearance .check { transform: translateX(18px); }

    .mode-tabs {
      display: flex;
      gap: 0.35rem;
      background-color: var(--vp-c-bg-alt);
      padding: 0.3rem;
      border-radius: 10px;
      border: 1px solid var(--vp-c-divider);
    }

    .mode-tab {
      background: transparent;
      border: none;
      color: var(--vp-c-text-2);
      padding: 0.4rem 0.9rem;
      border-radius: 7px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.84rem;
      transition: all 0.15s ease;
    }

    .mode-tab.active {
      background-color: var(--vp-c-bg-elv);
      color: var(--vp-c-brand-1);
      box-shadow: var(--vp-shadow-1);
    }

    main {
      max-width: 1360px;
      margin: 0 auto;
      padding: 2rem;
    }

    .control-panel {
      background-color: var(--vp-c-bg-soft);
      border: 1px solid var(--vp-c-divider);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      transition: background-color 0.25s, border-color 0.25s;
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

    input[type="text"], input[type="number"], input[type="date"], select, textarea {
      background-color: var(--vp-c-bg-alt);
      border: 1px solid var(--vp-c-border);
      color: var(--vp-c-text-1);
      padding: 0.7rem 0.95rem;
      border-radius: 8px;
      font-size: 0.92rem;
      font-family: var(--vp-font-family-mono);
      outline: none;
      transition: border-color 0.2s, background-color 0.2s;
    }

    input[type="text"], textarea { width: 100%; }

    input[type="text"]:focus, input[type="number"]:focus, input[type="date"]:focus, select:focus, textarea:focus {
      border-color: var(--vp-c-brand-1);
    }

    .btn {
      background-color: var(--vp-c-brand-3);
      color: #ffffff;
      font-weight: 600;
      border: 1px solid transparent;
      padding: 0.65rem 1.3rem;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .btn:hover:not(:disabled) {
      background-color: var(--vp-c-brand-2);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: var(--vp-c-bg-soft);
      color: var(--vp-c-text-1);
      border: 1px solid var(--vp-c-divider);
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: var(--vp-c-bg-elv);
      border-color: var(--vp-c-brand-1);
    }

    .quick-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1rem;
      flex-wrap: wrap;
      font-size: 0.85rem;
      color: var(--vp-c-text-2);
    }

    .pill-btn {
      background-color: var(--vp-c-bg-soft);
      border: 1px solid var(--vp-c-divider);
      color: var(--vp-c-text-2);
      padding: 0.35rem 0.85rem;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 600;
      transition: all 0.2s;
    }

    .pill-btn:hover, .pill-btn.active {
      background-color: var(--vp-c-brand-soft);
      border-color: var(--vp-c-brand-1);
      color: var(--vp-c-brand-1);
    }

    /* Loading Spinner */
    .loader {
      display: none;
      align-items: center;
      gap: 0.75rem;
      padding: 1.25rem;
      background-color: var(--vp-c-brand-soft);
      border: 1px solid var(--vp-c-brand-1);
      border-radius: 10px;
      margin-bottom: 2rem;
      color: var(--vp-c-brand-1);
      font-weight: 600;
    }

    .spinner {
      width: 22px;
      height: 22px;
      border: 3px solid var(--vp-c-brand-soft);
      border-top-color: var(--vp-c-brand-1);
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
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--vp-c-text-1);
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
      background-color: var(--vp-c-bg-soft);
      border: 1px solid var(--vp-c-divider);
      border-left: 4px solid var(--vp-c-brand-1);
    }

    .rec-card.priority-CRITICAL { border-left-color: var(--vp-c-red-1); }
    .rec-card.priority-HIGH { border-left-color: var(--vp-c-yellow-1); }
    .rec-card.priority-INFO { border-left-color: var(--vp-c-brand-1); }

    .rec-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.65rem;
      flex-wrap: wrap;
    }

    .badge {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.2rem 0.55rem;
      border-radius: 6px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      display: inline-block;
    }

    .badge-CRITICAL { background-color: var(--vp-c-red-soft); color: var(--vp-c-red-1); border: 1px solid rgba(244, 63, 94, 0.3); }
    .badge-HIGH { background-color: var(--vp-c-yellow-soft); color: var(--vp-c-yellow-1); border: 1px solid rgba(234, 179, 8, 0.3); }
    .badge-INFO { background-color: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); border: 1px solid rgba(207, 140, 60, 0.3); }
    .badge-high-status { background-color: var(--vp-c-green-soft); color: var(--vp-c-green-1); }
    .badge-low-status { background-color: var(--vp-c-yellow-soft); color: var(--vp-c-yellow-1); }

    .rec-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--vp-c-text-1);
    }

    .rec-desc {
      color: var(--vp-c-text-2);
      font-size: 0.92rem;
      margin-bottom: 0.85rem;
    }

    .rec-action {
      background-color: var(--vp-c-bg-alt);
      border: 1px solid var(--vp-c-divider);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      color: var(--vp-c-text-1);
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
    }

    .rec-action strong {
      color: var(--vp-c-brand-1);
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
      background-color: var(--vp-c-bg-soft);
      border: 1px solid var(--vp-c-divider);
      border-radius: 12px;
      padding: 1.15rem 1.25rem;
      transition: border-color 0.25s;
    }
    .kpi-card:hover { border-color: var(--vp-c-brand-1); }

    .kpi-label {
      font-size: 0.76rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--vp-c-text-2);
      margin-bottom: 0.35rem;
    }

    .kpi-value {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--vp-c-text-1);
    }

    .kpi-sub {
      font-size: 0.8rem;
      color: var(--vp-c-text-2);
      margin-top: 0.25rem;
    }

    /* Tables & Bundles */
    .bundle-card {
      background-color: var(--vp-c-bg-soft);
      border: 1px solid var(--vp-c-divider);
      border-radius: 12px;
      margin-bottom: 1.25rem;
      overflow: hidden;
    }

    .bundle-header {
      padding: 1rem 1.35rem;
      background-color: var(--vp-c-bg-alt);
      border-bottom: 1px solid var(--vp-c-divider);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .bundle-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-family: var(--vp-font-family-mono);
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--vp-c-brand-1);
    }

    .bundle-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.82rem;
      color: var(--vp-c-text-2);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
    }

    th {
      text-align: left;
      padding: 0.75rem 1.25rem;
      background-color: var(--vp-c-bg-alt);
      color: var(--vp-c-text-2);
      font-weight: 600;
      font-size: 0.76rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid var(--vp-c-divider);
    }

    td {
      padding: 0.8rem 1.25rem;
      border-bottom: 1px solid var(--vp-c-divider);
      vertical-align: top;
    }

    tr:last-child td {
      border-bottom: none;
    }

    .code-snippet {
      font-family: var(--vp-font-family-mono);
      font-size: 0.8rem;
      background-color: var(--vp-c-bg-alt);
      padding: 0.45rem 0.65rem;
      border-radius: 6px;
      border: 1px solid var(--vp-c-divider);
      color: var(--vp-c-text-1);
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
      <div class="brand-icon">⚡</div>
      <div>
        <h1>Polyfill & Transform Analyzer</h1>
        <p>AST-driven 1:1 Minified Bundle Inspector & Web Platform Baseline Advisor</p>
      </div>
    </div>
    <div class="header-right">
      <div class="mode-tabs">
        <button class="mode-tab active" onclick="switchMode('url')">🌐 Scan Website URL</button>
        <button class="mode-tab" onclick="switchMode('code')">📄 Paste / Upload Bundle</button>
      </div>
      <div class="nav-divider"></div>
      <button class="VPSwitch VPSwitchAppearance" type="button" role="switch" title="Switch between dark and light theme" aria-label="Switch between dark and light theme" onclick="toggleTheme()">
        <span class="check">
          <span class="icon">
            <svg class="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <svg class="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </span>
        </span>
      </button>
    </div>
  </header>

  <main>
    <!-- Baseline Target Configuration Bar -->
    <div class="control-panel" style="padding: 0.9rem 1.25rem; margin-bottom: 1rem; display: flex; flex-wrap: wrap; align-items: center; gap: 1rem;">
      <div style="font-size: 0.85rem; font-weight: 600; color: var(--vp-c-text-1);">🎯 Baseline Target Warning Threshold:</div>
      <select id="baseline-target-mode" onchange="onBaselineTargetModeChange()" style="font-family: var(--vp-font-family-base); font-size: 0.85rem;">
        <option value="default">Baseline Widely available (Today — default)</option>
        <option value="target-year">--target-year (Available in all browsers by end of YYYY)</option>
        <option value="widely-available-on-date">--widely-available-on-date (Widely available on YYYY-MM-DD, i.e. low_date - 30m)</option>
      </select>
      <input type="number" id="baseline-target-year" min="2015" max="2026" value="2022" placeholder="2022" style="display: none; width: 100px; padding: 0.45rem 0.75rem; font-size: 0.85rem;" />
      <input type="date" id="baseline-target-date" value="2025-01-01" style="display: none; width: 165px; padding: 0.45rem 0.75rem; font-size: 0.85rem;" />
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

    function toggleTheme() {
      const isDark = document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('vitepress-theme-appearance', isDark ? 'dark' : 'light');
        localStorage.setItem('e18e-theme-appearance', isDark ? 'dark' : 'light');
      } catch (e) {}
    }

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
          <div class="kpi-value" style="color: \${s.redundantPercentage > 50 ? 'var(--vp-c-red-1)' : 'var(--vp-c-green-1)'}">\${s.redundantPercentage}%</div>
          <div class="kpi-sub">\${s.redundantPolyfillCount} of \${s.totalPolyfillInstances} natively in \${escapeHtml(targetShortName)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Estimated Size Savings</div>
          <div class="kpi-value" style="color: var(--vp-c-brand-1)">-\${estSavingsKB} KB</div>
          <div class="kpi-sub">\${polyBundleKB} KB &rarr; ~\${postBundleKB} KB (-\${savingsPct}%)</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Duplicate Polyfills</div>
          <div class="kpi-value" style="color: \${s.duplicateFeatureCount > 0 ? 'var(--vp-c-yellow-1)' : 'var(--vp-c-green-1)'}">\${s.duplicateFeatureCount}</div>
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
          ? '<span class="badge badge-high-status">✅ CLEAN (0 Polyfills)</span>'
          : \`<span class="badge badge-HIGH">\${b.detectedPolyfills.length} Polyfills Detected</span>\`;

        const savingsBadge = b.detectedPolyfills.length > 0 && (b.estimatedSavingsBytes || 0) > 0
          ? \`<span>Est. After Removal: <strong style="color: var(--vp-c-green-1);">~\${postKb} KB</strong></span>
             <span class="badge badge-high-status">💾 Save ~\${savedKb} KB (-\${pct}%)</span>\`
          : '';

        let tableHtml = '';
        if (b.detectedPolyfills.length > 0) {
          const rows = b.detectedPolyfills.map(d => {
            const loc = d.mapping?.minifiedPolyfill || {};
            const origList = d.mapping?.precedingSource || [];
            const origHtml = origList.length > 0
              ? origList.map(o => \`<div style="margin-top:0.3rem; font-size:0.75rem; color:var(--vp-c-green-1);">↳ Source Map: <code>\${escapeHtml(o.sourceFile)}:\${o.line}</code></div>\`).join('')
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
                <td><strong>\${escapeHtml(d.name)}</strong><br><code style="font-size:0.75rem; color:var(--vp-c-text-2)">\${d.id}</code></td>
                <td>\${d.baselineYear ?? 'N/A'}</td>
                <td>
                  <strong>~\${estFeatureKb} KB</strong><br>
                  <span style="font-size:0.73rem; color:\${isObsolete ? 'var(--vp-c-green-1)' : 'var(--vp-c-yellow-1)'}">\${isObsolete ? '🗑️ Save if removed' : '📌 Retained for target'}</span>
                </td>
                <td>\${targetVerdictHtml}<span class="badge badge-\${d.baselineStatus}-status" style="\${bt && bt.mode !== 'default' ? 'opacity:0.85;' : ''}">\${formatBaselineStatus(d.baselineStatus)}</span></td>
                <td>Line \${loc.line ?? 1}, Col \${loc.column ?? '?'}<br><span style="font-size:0.75rem; color:var(--vp-c-text-2)">Offset: \${loc.byteOffset ?? 'N/A'}</span></td>
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
