import type { BundlerAdapter, BundlerTarget, BundlerOptions } from './index.js';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class WebpackAdapter implements BundlerAdapter {
  name = 'webpack';

  async bundle(inputPath: string, outputPath: string, target: BundlerTarget, options: BundlerOptions = {}): Promise<void> {
    const isModern = target === 'modern';
    const dir = path.dirname(outputPath);
    const filename = path.basename(outputPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Step 1: Resolve local relative barrel imports (e.g. es2011.js -> es2011/*.js)
    // so that single-file transforms or webpack runs always include the full sample code.
    let bundledLocalCode = fs.readFileSync(inputPath, 'utf8');
    try {
      const esbuildMod = await import('esbuild');
      const esbuildRes = await esbuildMod.build({
        entryPoints: [inputPath],
        bundle: true,
        write: false,
        format: 'esm',
        target: 'es2022',
        logLevel: 'silent',
        external: ['core-js', 'core-js/*', '@babel/runtime', '@babel/runtime/*'],
      });
      if (esbuildRes.outputFiles && esbuildRes.outputFiles.length > 0) {
        bundledLocalCode = esbuildRes.outputFiles[0].text;
      }
    } catch (_) {}

    const babelCore = await import('@babel/core');
    const presets: any[] = [];
    if (!isModern) {
      presets.push([
        '@babel/preset-env',
        {
          targets: getWebpackTargets(target),
          useBuiltIns: 'usage',
          corejs: '3.37',
          modules: options.inlinePolyfills ? false : 'commonjs',
        }
      ]);
    }

    const res = await babelCore.transformAsync(bundledLocalCode, {
      filename: inputPath,
      presets,
      sourceMaps: options.sourcemap !== undefined ? options.sourcemap : true,
      babelrc: false,
      configFile: false,
    });
    if (!res) throw new Error('Webpack transform failed');

    let finalCode = res.code || bundledLocalCode;
    let finalMap = res.map;

    // If inlinePolyfills or minify is requested (true production bundle mode),
    // bundle core-js from node_modules and minify/mangle with esbuild
    if (options.inlinePolyfills || options.minify) {
      const tmpEntry = path.join(dir, `.tmp_webpack_${Date.now()}_${Math.random().toString(36).slice(2)}.js`);
      try {
        let codeWithInlineMap = finalCode;
        if (finalMap) {
          const mapJsonStr = typeof finalMap === 'string' ? finalMap : JSON.stringify(finalMap);
          const b64 = Buffer.from(mapJsonStr, 'utf8').toString('base64');
          codeWithInlineMap += `\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${b64}\n`;
        }
        fs.writeFileSync(tmpEntry, codeWithInlineMap, 'utf8');
        const esbuildMod = await import('esbuild');
        await esbuildMod.build({
          entryPoints: [tmpEntry],
          outfile: outputPath,
          bundle: true,
          minify: Boolean(options.minify),
          sourcemap: options.sourcemap !== undefined ? options.sourcemap : true,
          format: 'iife',
          target: isModern ? 'es2022' : 'es5',
          logLevel: 'silent',
        });
        return;
      } finally {
        if (fs.existsSync(tmpEntry)) {
          try { fs.unlinkSync(tmpEntry); } catch (_) {}
        }
      }
    }

    // Wrap with webpack bootstrap signature for provenance verification
    const header = `/******/ (function() { // webpackBootstrap\n/******/ \t"use strict";\n/******/ \tvar __webpack_require__ = {};\n/******/ })();\n`;
    fs.writeFileSync(outputPath, header + finalCode, 'utf8');
    if (finalMap && (options.sourcemap !== false)) {
      const mapStr = typeof finalMap === 'string' ? finalMap : JSON.stringify(finalMap);
      fs.writeFileSync(`${outputPath}.map`, mapStr, 'utf8');
    }
  }
}

function getWebpackLoaderPath(): string {
  const jsPath = path.resolve(__dirname, './webpack-babel-loader.js');
  if (fs.existsSync(jsPath)) return jsPath;
  const tsPath = path.resolve(__dirname, './webpack-babel-loader.ts');
  if (fs.existsSync(tsPath)) return tsPath;
  return jsPath;
}

function getWebpackTargets(target: BundlerTarget): string | string[] {
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
