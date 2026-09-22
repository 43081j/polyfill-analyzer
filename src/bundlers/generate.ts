import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { RollupAdapter, EsbuildAdapter, WebpackAdapter, SwcAdapter, type BundlerAdapter, type BundlerTarget } from './index.js';
import { syncArchives } from './sync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface GenerateOptions {
  samplesDir?: string;
  outDir?: string;
  bundlers?: string[];
  targets?: BundlerTarget[];
  concurrency?: number;
  [key: string]: any;
}

export interface GenerateResult {
  total: number;
  success: number;
  failed: number;
  errors: Array<{ sample: string; bundler: string; target: string; error: string }>;
}

export async function generate(options: GenerateOptions = {}): Promise<GenerateResult> {
  const defaultSamplesDir = fs.existsSync(path.resolve(__dirname, '../../../es-samples/samples'))
    ? path.resolve(__dirname, '../../../es-samples/samples')
    : path.resolve(__dirname, '../../node_modules/es-samples/samples');
  const samplesDir = options.samplesDir || defaultSamplesDir;
  const outDir = options.outDir || path.resolve(__dirname, '../../dist/bundles');
  
  const allAdapters: BundlerAdapter[] = [
    new RollupAdapter(),
    new EsbuildAdapter(),
    new WebpackAdapter(),
    new SwcAdapter(),
  ];

  const bundlerNames = options.bundlers;
  const adapters = bundlerNames 
    ? allAdapters.filter(a => bundlerNames.includes(a.name))
    : allAdapters;

  const targets: BundlerTarget[] = options.targets || ['ie11', 'chrome50', 'es5', 'modern'];

  let sampleFiles: string[] = [];
  if (fs.existsSync(samplesDir)) {
    sampleFiles = fs.readdirSync(samplesDir)
      .filter(f => /^es(?:_\w+|\d{4})\.js$/.test(f))
      .map(f => path.join(samplesDir, f));
  }

  const tasks: Array<{ samplePath: string; adapter: BundlerAdapter; target: BundlerTarget; customOutputName?: string }> = [];
  for (const samplePath of sampleFiles) {
    for (const adapter of adapters) {
      for (const target of targets) {
        tasks.push({ samplePath, adapter, target });
      }
    }
  }

  if (!options.samplesDir && !options.bundlers && options.scenarios !== false) {
    const SCENARIO_DEFINITIONS = [
      { name: 'enterprise_ie11.js', sample: 'es2015.js', bundler: 'webpack', target: 'ie11' as BundlerTarget },
      { name: 'modern_spa.js', sample: 'es2020.js', bundler: 'esbuild', target: 'modern' as BundlerTarget },
      { name: 'ecommerce_mixed.js', sample: 'es2018.js', bundler: 'rollup', target: 'chrome50' as BundlerTarget },
      { name: 'microfrontend_shared.js', sample: 'es2024.js', bundler: 'webpack', target: 'modern' as BundlerTarget },
      { name: 'ci_pr_artifact.js', sample: 'es2015.js', bundler: 'esbuild', target: 'es5' as BundlerTarget },
      { name: 'pwa_worker.js', sample: 'es2020.js', bundler: 'rollup', target: 'modern' as BundlerTarget },
      { name: 'banking_secure.js', sample: 'es2018.js', bundler: 'webpack', target: 'ie11' as BundlerTarget },
      { name: 'saas_dynamic.js', sample: 'es2024.js', bundler: 'esbuild', target: 'chrome50' as BundlerTarget },
      { name: 'media_player.js', sample: 'es2015.js', bundler: 'rollup', target: 'es5' as BundlerTarget },
      { name: 'edtech_canvas.js', sample: 'es2020.js', bundler: 'webpack', target: 'modern' as BundlerTarget },
      { name: 'telemed_portal.js', sample: 'es2018.js', bundler: 'esbuild', target: 'ie11' as BundlerTarget },
      { name: 'wasm_game_ui.js', sample: 'es2024.js', bundler: 'rollup', target: 'modern' as BundlerTarget },
      { name: 'iot_realtime.js', sample: 'es2015.js', bundler: 'webpack', target: 'chrome50' as BundlerTarget },
      { name: 'govtech_portal.js', sample: 'es2020.js', bundler: 'esbuild', target: 'ie11' as BundlerTarget },
      { name: 'docs_playground.js', sample: 'es2018.js', bundler: 'rollup', target: 'modern' as BundlerTarget },
    ];

    for (const def of SCENARIO_DEFINITIONS) {
      const adapter = allAdapters.find(a => a.name === def.bundler);
      const samplePath = path.join(samplesDir, def.sample);
      if (adapter && fs.existsSync(samplePath)) {
        tasks.push({ samplePath, adapter, target: def.target, customOutputName: def.name });
      }
    }
  }

  const concurrency = options.concurrency || 4;
  const result: GenerateResult = {
    total: tasks.length,
    success: 0,
    failed: 0,
    errors: [],
  };

  let idx = 0;
  const runWorker = async () => {
    while (idx < tasks.length) {
      const currentIdx = idx++;
      const task = tasks[currentIdx];
      const sampleName = path.basename(task.samplePath, '.js');
      const targetName = task.target === 'modern' ? 'modern' : task.target;
      const targetDir = task.customOutputName ? path.join(outDir, 'scenarios') : path.join(outDir, task.adapter.name);
      
      if (!fs.existsSync(targetDir)) {
        try {
          fs.mkdirSync(targetDir, { recursive: true });
        } catch (e) {
          // ignore concurrent mkdir errors
        }
      }

      const outputPath = task.customOutputName ? path.join(targetDir, task.customOutputName) : path.join(targetDir, `${sampleName}_${targetName}.js`);
      const tmpId = `${process.pid}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const tmpOutputPath = `${outputPath}.${tmpId}.tmp`;

      try {
        await task.adapter.bundle(task.samplePath, tmpOutputPath, task.target, { sourcemap: true, ...options });
        if (fs.existsSync(tmpOutputPath)) {
          fs.renameSync(tmpOutputPath, outputPath);
        }
        if (fs.existsSync(`${tmpOutputPath}.map`)) {
          fs.renameSync(`${tmpOutputPath}.map`, `${outputPath}.map`);
        }
        result.success++;
      } catch (err: any) {
        result.failed++;
        result.errors.push({
          sample: sampleName,
          bundler: task.adapter.name,
          target: task.target,
          error: err?.message || String(err),
        });
      } finally {
        if (fs.existsSync(tmpOutputPath)) {
          try { fs.unlinkSync(tmpOutputPath); } catch (_) {}
        }
        if (fs.existsSync(`${tmpOutputPath}.map`)) {
          try { fs.unlinkSync(`${tmpOutputPath}.map`); } catch (_) {}
        }
      }
    }
  };

  const workers: Promise<void>[] = [];
  for (let i = 0; i < Math.min(concurrency, tasks.length); i++) {
    workers.push(runWorker());
  }

  await Promise.all(workers);
  try { syncArchives(); } catch (_) {}
  return result;
}

if (process.argv[1] && process.argv[1].endsWith('generate.js')) {
  generate().then((res) => {
    console.log(`Bundle generation complete: ${res.success}/${res.total} succeeded.`);
    if (res.failed > 0) {
      console.log(`Errors encountered: ${res.failed}`);
      process.exit(1);
    }
  }).catch((err) => {
    console.error('Fatal error in generator:', err);
    process.exit(1);
  });
}
