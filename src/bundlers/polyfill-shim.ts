/**
 * Polyfill helper shims and core-js injection for legacy bundles
 */
import 'core-js/modules/es.promise.js';
import 'core-js/modules/es.array.iterator.js';

(globalThis as any).__helpers = (globalThis as any).__helpers || {
  polyfill: true,
  corejs: 'core-js',
};
