import { describe, it, expect } from 'vitest';
import { scan } from '../../src/engine/index.js';

describe('Adversarial Test Suite - Rules Detection & Engine Gaps', () => {

  describe('1. False Positives on Custom Helper Function Names', () => {
    it('adv_fp_object_assign_helper: does not flag user-defined _extends function without Object.assign', () => {
      const snippet = `function _extends() { return "custom user helper"; }`;
      const detected = scan(snippet);
      const match = detected.find(r => r.id === 'object-assign');
      expect(match, 'Should not flag object-assign on generic user function _extends()').toBeUndefined();
    });

    it('adv_fp_async_iteration_helper: does not flag user-defined _asyncIterator function', () => {
      const snippet = `function _asyncIterator(x) { return x * 2; }`;
      const detected = scan(snippet);
      const match = detected.find(r => r.id === 'async-iteration');
      expect(match, 'Should not flag async-iteration on generic user function _asyncIterator').toBeUndefined();
    });

    it('adv_fp_class_fields_helper: does not flag user-defined _defineProperty function', () => {
      const snippet = `function _defineProperty(obj, key, val) { obj[key] = val; return obj; }`;
      const detected = scan(snippet);
      const match = detected.find(r => r.id === 'class-fields');
      expect(match, 'Should not flag class-fields on generic user function _defineProperty').toBeUndefined();
    });

    it('adv_fp_class_static_init_helper: does not flag _classCallCheck which is for ES6 classes, not ES2022 static init blocks', () => {
      const snippet = `function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }`;
      const detected = scan(snippet);
      const match = detected.find(r => r.id === 'class-static-initialization-blocks');
      expect(match, 'Should not flag class-static-initialization-blocks due to standard ES6 _classCallCheck helper').toBeUndefined();
    });

    it('adv_fp_create_class_helper: does not flag Babel _createClass helper on class-static-initialization-blocks', () => {
      const snippet = `function _createClass(Constructor, protoProps, staticProps) { Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }`;
      const detected = scan(snippet);
      const match = detected.find(r => r.id === 'class-static-initialization-blocks');
      expect(match, 'Should not flag class-static-initialization-blocks on standard Babel _createClass helper').toBeUndefined();
    });
  });

  describe('2. False Negatives on Alternative Core-JS Import Paths', () => {
    it('adv_fn_core_js_actual_includes: detects core-js/actual/array/includes import', () => {
      const snippet = `import "core-js/actual/array/includes";`;
      const detected = scan(snippet);
      const match = detected.find(r => r.id === 'array-includes');
      expect(match, 'Should detect core-js/actual/array/includes').toBeDefined();
    });

    it('adv_fn_core_js_features_promise: detects require("core-js/features/promise/all-settled")', () => {
      const snippet = `require("core-js/features/promise/all-settled");`;
      const detected = scan(snippet);
      const match = detected.find(r => r.id === 'promise-all-settled');
      expect(match, 'Should detect core-js/features/promise/all-settled').toBeDefined();
    });
  });

  describe('3. False Negatives on Dynamic Imports of Polyfills', () => {
    it('adv_fn_dynamic_import_includes: detects dynamic import of polyfill module', () => {
      const snippet = `async function loadPolyfill() { await import("core-js/modules/es.array.includes.js"); }`;
      const detected = scan(snippet);
      const match = detected.find(r => r.id === 'array-includes');
      expect(match, 'Should detect dynamic import("core-js/modules/es.array.includes.js")').toBeDefined();
    });
  });

  describe('4. False Negatives on Global Object Explicit Assignments', () => {
    it('adv_fn_globalthis_promise_all_settled: detects polyfill assigned to globalThis.Promise.allSettled', () => {
      const snippet = `globalThis.Promise.allSettled = function(iterable) { /* polyfill implementation */ };`;
      const detected = scan(snippet);
      const match = detected.find(r => r.id === 'promise-all-settled');
      expect(match, 'Should detect globalThis.Promise.allSettled polyfill assignment').toBeDefined();
    });

    it('adv_fn_window_array_includes: detects polyfill assigned to window.Array.prototype.includes', () => {
      const snippet = `window.Array.prototype.includes = function(searchElement) { /* polyfill */ };`;
      const detected = scan(snippet);
      const match = detected.find(r => r.id === 'array-includes');
      expect(match, 'Should detect window.Array.prototype.includes polyfill assignment').toBeDefined();
    });
  });

  describe('5. False Negatives on Prototype/Constructor Aliasing', () => {
    it('adv_fn_aliased_prototype_assign: fails to detect assignment via aliased prototype variable (known semantic limitation)', () => {
      const snippet = `const AP = Array.prototype; AP.includes = function(val) {};`;
      const detected = scan(snippet);
      const match = detected.find(r => r.id === 'array-includes');
      // Known limitation: static AST-grep pattern matching cannot resolve arbitrary variable aliasing without dataflow analysis
      expect(match, 'Known limitation: aliased prototype assignment AP.includes = ... is not detected').toBeUndefined();
    });
  });

  describe('6. Robustness against Tricky Variable Names & Comments', () => {
    it('adv_robust_tricky_var_name: verifies var includes = 5 does not trigger false positive', () => {
      const snippet = `var includes = 5; const allSettled = true;`;
      const detected = scan(snippet);
      expect(detected.length, 'Should be 0 matches on tricky variable names').toBe(0);
    });

    it('adv_robust_commented_polyfill: verifies commented out polyfills are ignored', () => {
      const snippet = `// import "core-js/modules/es.promise.all-settled.js";\n/* Promise.allSettled = function() {}; */`;
      const detected = scan(snippet);
      expect(detected.length, 'Should be 0 matches on commented out polyfills').toBe(0);
    });
  });
});
