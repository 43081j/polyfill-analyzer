import { rollup } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import * as babelCore from '@babel/core';
import type { BundlerAdapter, BundlerTarget, BundlerOptions } from './index.js';
import path from 'node:path';
import fs from 'node:fs';

function customBabelPlugin(options: any) {
  return {
    name: 'custom-babel',
    async transform(code: string, id: string) {
      if (id.includes('node_modules')) return null;
      if (!/\.(js|mjs|ts)$/.test(id)) return null;
      const res = await babelCore.transformAsync(code, {
        filename: id,
        presets: options.presets,
        sourceMaps: true,
        babelrc: false,
        configFile: false,
      });
      if (!res) return null;
      let transformedCode = res.code || code;
      transformedCode = transformedCode.replace(/import\s+(["'])(core-js\/[^"']+)\1\s*;/g, 'require($1$2$1);');
      return {
        code: transformedCode,
        map: res.map || null,
      };
    }
  };
}

async function json(): Promise<any> {
  try {
    // @ts-ignore
    const mod = await import('@rollup/plugin-json');
    const fn = mod.default || mod;
    if (typeof fn === 'function') return fn();
  } catch (_) {}
  return {
    name: 'json',
    transform(code: string, id: string) {
      if (!id.endsWith('.json')) return null;
      try {
        const parsed = JSON.parse(code);
        return {
          code: `export default ${JSON.stringify(parsed)};`,
          map: { mappings: '' }
        };
      } catch (e) {
        return null;
      }
    }
  };
}

function duplicateNamedCaptureGroupPlugin() {
  return {
    name: 'duplicate-named-capture-groups',
    transform(code: string, id: string) {
      if (!/\.(js|mjs|ts)$/.test(id)) return null;
      // Check if code contains regex with duplicate named capture groups like (?<year>...)...(?<year>...)
      if (!code.includes('(?<')) return null;
      const rewritten = code.replace(
        /\/((?:[^/\\]|\\.)*\(\?<(\w+)>[^/\\]*(?:\\.[^/\\]*)*\(\?<\2>(?:[^/\\]|\\.)*)\/([gimsuy]*)/g,
        (_match, pattern, _groupName, flags) => {
          return `new RegExp(${JSON.stringify(pattern)}, ${JSON.stringify(flags)})`;
        }
      );
      if (rewritten !== code) {
        return { code: rewritten, map: null };
      }
      return null;
    }
  };
}

export class RollupAdapter implements BundlerAdapter {
  name = 'rollup';

  async bundle(inputPath: string, outputPath: string, target: BundlerTarget, options: BundlerOptions = {}): Promise<void> {
    const isModern = target === 'modern';
    const plugins: any[] = [
      duplicateNamedCaptureGroupPlugin(),
      await json(),
      nodeResolve({ preferBuiltins: true }),
      commonjs()
    ];

    if (!isModern) {
      plugins.push(
        customBabelPlugin({
          presets: [
            [
              '@babel/preset-env',
              {
                targets: getBabelTargets(target),
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false,
              }
            ]
          ]
        })
      );
    }

    let bundle;
    try {
      bundle = await rollup({
        input: inputPath,
        plugins,
        external: !isModern ? (id) => id === 'core-js' || id.startsWith('core-js/') || id.startsWith('@babel/runtime') || (Array.isArray(options.external) && options.external.includes(id)) : options.external,
        onwarn: () => {}, // Suppress warnings
      });

      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      await bundle.write({
        file: outputPath,
        format: options.format || (isModern ? 'esm' : 'iife'),
        name: 'SampleBundle',
        sourcemap: options.sourcemap !== undefined ? options.sourcemap : true,
        inlineDynamicImports: true,
        compact: false,
      });
    } finally {
      if (bundle) {
        await bundle.close();
      }
    }
  }
}

function getBabelTargets(target: BundlerTarget): any {
  switch (target) {
    case 'ie11':
      return { ie: '11' };
    case 'chrome50':
      return { chrome: '50' };
    case 'es5':
      return { ie: '11' };
    default:
      return 'defaults';
  }
}
