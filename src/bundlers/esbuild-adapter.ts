import * as esbuild from 'esbuild';
import * as babelCore from '@babel/core';
import type { BundlerAdapter, BundlerTarget, BundlerOptions } from './index.js';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class EsbuildAdapter implements BundlerAdapter {
  name = 'esbuild';

  async bundle(inputPath: string, outputPath: string, target: BundlerTarget, options: BundlerOptions = {}): Promise<void> {
    const isModern = target === 'modern';
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const plugins: esbuild.Plugin[] = [];
    if (!isModern) {
      plugins.push({
        name: 'babel-downlevel',
        setup(build) {
          build.onLoad({ filter: /\.(js|mjs|ts)$/ }, async (args) => {
            if (args.path.includes('node_modules')) {
              return null;
            }
            const source = fs.readFileSync(args.path, 'utf8');
            const res = await babelCore.transformAsync(source, {
              filename: args.path,
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
              ],
              sourceMaps: true,
              babelrc: false,
              configFile: false,
            });
            if (!res) return null;
            return {
              contents: res.code || source,
              loader: 'js',
            };
          });
        }
      });
    }

    await esbuild.build({
      entryPoints: [inputPath],
      outfile: outputPath,
      bundle: true,
      format: options.format || 'esm',
      target: getEsbuildTarget(target),
      sourcemap: options.sourcemap !== undefined ? options.sourcemap : true,
      plugins,
      logLevel: 'silent',
      minify: options.minify || false,
      external: ['core-js', 'core-js/*', ...(options.external || [])],
    });
  }
}

function getEsbuildTarget(target: BundlerTarget): string | string[] {
  switch (target) {
    case 'ie11': return 'es2022';
    case 'chrome50': return 'es2022';
    case 'es5': return 'es2022';
    case 'modern': return 'es2022';
    default: return 'es2022';
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
