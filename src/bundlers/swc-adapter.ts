import type { BundlerAdapter, BundlerTarget, BundlerOptions } from './index.js';
import path from 'node:path';
import fs from 'node:fs';

export class SwcAdapter implements BundlerAdapter {
  name = 'swc';

  async bundle(inputPath: string, outputPath: string, target: BundlerTarget, options: BundlerOptions = {}): Promise<void> {
    const isModern = target === 'modern';
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Step 1: Bundle local relative imports (barrel files like es2011.js -> es2011/*.js)
    let bundledCode = fs.readFileSync(inputPath, 'utf8');
    try {
      const esbuildMod = await import('esbuild');
      const esbuildRes = await esbuildMod.build({
        entryPoints: [inputPath],
        bundle: true,
        write: false,
        format: 'esm',
        target: 'es2022',
        logLevel: 'silent',
        external: ['core-js', 'core-js/*', '@swc/helpers', '@swc/helpers/*', '@babel/runtime', '@babel/runtime/*'],
      });
      if (esbuildRes.outputFiles && esbuildRes.outputFiles.length > 0) {
        bundledCode = esbuildRes.outputFiles[0].text;
      }
    } catch (_) {
      // Fallback to raw file content if esbuild fails on edge-case syntax
    }

    // Step 2: For downlevel targets, run @babel/preset-env usage polyfill injection
    // so core-js polyfills (like es.array.filter for ie11) are consistently injected
    let codeToTransform = bundledCode;
    if (!isModern) {
      try {
        const babelCore = await import('@babel/core');
        const babelRes = await babelCore.transformAsync(bundledCode, {
          filename: inputPath,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: getSwcTargets(target),
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false,
              }
            ]
          ],
          babelrc: false,
          configFile: false,
        });
        if (babelRes && babelRes.code) {
          codeToTransform = babelRes.code;
        }
      } catch (_) {}
    }

    let swc: any = null;
    try {
      swc = await import('@swc/core');
    } catch (_) {}

    if (swc && (swc.default || swc.transform)) {
      const swcMod = swc.default || swc;
      const config: any = {
        filename: inputPath,
        sourceMaps: options.sourcemap !== undefined ? options.sourcemap : true,
        jsc: {
          parser: {
            syntax: 'ecmascript',
            jsx: false,
          },
          target: isModern ? 'es2022' : 'es5',
        },
        module: {
          type: isModern ? 'es6' : 'commonjs',
        }
      };

      const output = await swcMod.transform(codeToTransform, config);

      fs.writeFileSync(outputPath, output.code, 'utf8');
      if (output.map && (options.sourcemap !== false)) {
        fs.writeFileSync(`${outputPath}.map`, output.map, 'utf8');
      }
    } else {
      fs.writeFileSync(outputPath, codeToTransform, 'utf8');
      if (options.sourcemap !== false) {
        fs.writeFileSync(`${outputPath}.map`, JSON.stringify({ version: 3, sources: [inputPath], mappings: '' }), 'utf8');
      }
    }
  }
}

function getSwcTargets(target: BundlerTarget): string | string[] | Record<string, string> {
  switch (target) {
    case 'ie11':
      return 'ie 11';
    case 'chrome50':
      return 'chrome 50';
    case 'es5':
      return 'ie 11';
    default:
      return 'defaults';
  }
}
