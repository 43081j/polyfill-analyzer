export type BundlerTarget = 'ie11' | 'chrome50' | 'es5' | 'modern';

export interface BundlerOptions {
  sourcemap?: boolean;
  minify?: boolean;
  external?: string[];
  [key: string]: any;
}

export interface BundlerAdapter {
  name: string;
  bundle(inputPath: string, outputPath: string, target: BundlerTarget, options?: BundlerOptions): Promise<void>;
}

export { RollupAdapter } from './rollup-adapter.js';
export { SwcAdapter } from './swc-adapter.js';
export { EsbuildAdapter } from './esbuild-adapter.js';
export { WebpackAdapter } from './webpack-adapter.js';
