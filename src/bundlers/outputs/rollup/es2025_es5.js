var SampleBundle = (function (exports) {
  'use strict';

  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Float16Array
   * TypedArray representing an array of 16-bit half-precision floating point numbers.
   * Spec: https://262.ecma-international.org/16.0/#sec-float16array
   */
  function demoFloat16Array() {
    var f16 = new Float16Array([1.5, 2.5]);
    return {
      len: f16.length,
      bytes: Float16Array.BYTES_PER_ELEMENT
    };
  }

  function _regenerator$2() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2$2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = true, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), true), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2$2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2$2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2$2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2$2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2$2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2$2(u), _regeneratorDefine2$2(u, o, "Generator"), _regeneratorDefine2$2(u, n, function () { return this; }), _regeneratorDefine2$2(u, "toString", function () { return "[object Generator]"; }), (_regenerator$2 = function _regenerator() { return { w: i, m: f }; })(); }
  function _regeneratorDefine2$2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2$2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2$2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2$2(e, r, n, t); }
  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.function.name.js");
  require("core-js/modules/es.object.get-prototype-of.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.promise.js");
  function asyncGeneratorStep$1(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
  function _asyncToGenerator$1(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep$1(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep$1(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Import Attributes (import ... with { type: 'json' })
   * Provides inline syntax for specifying module import assertions/attributes using the `with` keyword, informing runtime
   * module loaders how to interpret loaded resources (e.g., verifying a file is parsed as JSON rather than executed as code).
   * Spec: https://262.ecma-international.org/16.0/#sec-import-attributes
   */
  function demoImportAttributes() {
    return _demoImportAttributes.apply(this, arguments);
  }
  function _demoImportAttributes() {
    _demoImportAttributes = _asyncToGenerator$1(/*#__PURE__*/_regenerator$2().m(function _callee() {
      var _pkg$default$name, _pkg$default, pkg;
      return _regenerator$2().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return Promise.resolve().then(function () { return _package$1; });
          case 1:
            pkg = _context.v;
            return _context.a(2, (_pkg$default$name = (_pkg$default = pkg.default) === null || _pkg$default === void 0 ? void 0 : _pkg$default.name) !== null && _pkg$default$name !== void 0 ? _pkg$default$name : "es-samples");
          case 2:
            _context.p = 2;
            _context.v;
            return _context.a(2, "es-samples");
        }
      }, _callee, null, [[0, 2]]);
    }));
    return _demoImportAttributes.apply(this, arguments);
  }

  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.array.filter.js");
  require("core-js/modules/es.array.map.js");
  require("core-js/modules/es.object.get-prototype-of.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.promise.js");
  function _regenerator$1() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2$1(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = true, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), true), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2$1(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2$1(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2$1(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2$1(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2$1(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2$1(u), _regeneratorDefine2$1(u, o, "Generator"), _regeneratorDefine2$1(u, n, function () { return this; }), _regeneratorDefine2$1(u, "toString", function () { return "[object Generator]"; }), (_regenerator$1 = function _regenerator() { return { w: i, m: f }; })(); }
  function _regeneratorDefine2$1(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2$1 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2$1(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2$1(e, r, n, t); }
  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Iterator Helpers (Iterator.from, map, filter, take, drop, flatMap, reduce, toArray, some, every, find)
   * Extends iterator objects with functional programming methods similar to Array prototype methods, enabling lazy,
   * memory-efficient processing of potentially infinite sequences without intermediate array allocations.
   * Spec: https://262.ecma-international.org/16.0/#sec-iterator-objects
   * Spec (map): https://262.ecma-international.org/16.0/#sec-iterator.prototype.map
   * Spec (take): https://262.ecma-international.org/16.0/#sec-iterator.prototype.take
   */
  function demoIteratorHelpers() {
    var _marked = /*#__PURE__*/_regenerator$1().m(infiniteNumbers);
    function infiniteNumbers() {
      var n;
      return _regenerator$1().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            n = 1;
          case 1:
            _context.n = 2;
            return n++;
          case 2:
            _context.n = 1;
            break;
          case 3:
            return _context.a(2);
        }
      }, _marked);
    }

    // Create iterator and pipeline lazy transformations
    var result = infiniteNumbers().filter(function (n) {
      return n % 2 === 0;
    }) // even numbers: 2, 4, 6, 8, 10...
    .map(function (n) {
      return n * 10;
    }) // multiplied: 20, 40, 60, 80...
    .drop(1) // drop first: 40, 60, 80...
    .take(3) // take three: 40, 60, 80
    .toArray(); // [40, 60, 80]

    return result;
  }

  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Math.f16round
   * Rounds a number to the nearest 16-bit half precision float.
   * Spec: https://262.ecma-international.org/16.0/#sec-math.f16round
   */
  function demoMathF16round() {
    return Math.f16round(1.337);
  }

  function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = true, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), true), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
  function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.object.get-prototype-of.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.promise.js");
  require("core-js/modules/esnext.promise.try.js");
  function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
  function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Promise.try()
   * Wraps synchronous or asynchronous function execution inside a Promise, ensuring that any exceptions thrown synchronously
   * are caught and converted into a rejected Promise rather than terminating execution synchronously.
   * Spec: https://262.ecma-international.org/16.0/#sec-promise.try
   */
  function demoPromiseTry() {
    return _demoPromiseTry.apply(this, arguments);
  }
  function _demoPromiseTry() {
    _demoPromiseTry = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var shouldThrowSync,
        possiblySyncOperation,
        res,
        _args = arguments,
        _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            possiblySyncOperation = function _possiblySyncOperatio() {
              if (shouldThrowSync) {
                throw new Error("Synchronous failure");
              }
              return "Success value";
            };
            shouldThrowSync = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
            _context.p = 1;
            _context.n = 2;
            return Promise.try(possiblySyncOperation);
          case 2:
            res = _context.v;
            return _context.a(2, {
              success: res
            });
          case 3:
            _context.p = 3;
            _t = _context.v;
            return _context.a(2, {
              error: _t.message
            });
        }
      }, _callee, null, [[1, 3]]);
    }));
    return _demoPromiseTry.apply(this, arguments);
  }

  require("core-js/modules/es.regexp.constructor.js");
  require("core-js/modules/es.regexp.exec.js");
  require("core-js/modules/es.regexp.to-string.js");
  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * RegExp Duplicate Named Capture Groups
   * Allows multiple capture groups in different alternatives of a regular expression (separated by `|`) to share the exact
   * same group name (`(?<name>...)`), simplifying pattern matching across mutually exclusive branch formats.
   * Spec: https://262.ecma-international.org/16.0/#sec-group-specifiers
   */
  function demoDuplicateNamedCaptureGroups() {
    // Both branch options use the group name 'year'
    var regex = new RegExp("(?<year>\\d{4})-[a-z]+|[a-z]+-(?<year>\\d{4})", "i");
    var match1 = regex.exec("2025-june");
    var match2 = regex.exec("june-2025");
    return {
      firstFormatYear: match1.groups.year,
      // "2025"
      secondFormatYear: match2.groups.year // "2025"
    };
  }

  require("core-js/modules/es.array.from.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.set.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Set.prototype.difference
   * Takes a set and returns a new set containing elements in this set but not in the given set.
   * Spec: https://262.ecma-international.org/16.0/#sec-set.prototype.difference
   */
  function demoSetDifference() {
    var setA = new Set([1, 2, 3]);
    var setB = new Set([2, 3, 4]);
    return Array.from(setA.difference(setB));
  }

  require("core-js/modules/es.array.from.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.set.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Set.prototype.intersection
   * Takes a set and returns a new set containing elements in both this set and the given set.
   * Spec: https://262.ecma-international.org/16.0/#sec-set.prototype.intersection
   */
  function demoSetIntersection() {
    var setA = new Set([1, 2, 3]);
    var setB = new Set([2, 3, 4]);
    return Array.from(setA.intersection(setB));
  }

  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.set.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Set.prototype.isDisjointFrom
   * Takes a set and returns a boolean indicating if this set has no elements in common with the given set.
   * Spec: https://262.ecma-international.org/16.0/#sec-set.prototype.isdisjointfrom
   */
  function demoSetIsDisjointFrom() {
    var setA = new Set([1, 2]);
    var setB = new Set([3, 4]);
    return setA.isDisjointFrom(setB);
  }

  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.set.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Set.prototype.isSubsetOf
   * Takes a set and returns a boolean indicating if all elements of this set are in the given set.
   * Spec: https://262.ecma-international.org/16.0/#sec-set.prototype.issubsetof
   */
  function demoSetIsSubsetOf() {
    var setA = new Set([1, 2]);
    var setB = new Set([1, 2, 3]);
    return setA.isSubsetOf(setB);
  }

  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.set.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Set.prototype.isSupersetOf
   * Takes a set and returns a boolean indicating if all elements of the given set are in this set.
   * Spec: https://262.ecma-international.org/16.0/#sec-set.prototype.issupersetof
   */
  function demoSetIsSupersetOf() {
    var setA = new Set([1, 2, 3]);
    var setB = new Set([1, 2]);
    return setA.isSupersetOf(setB);
  }

  require("core-js/modules/es.array.from.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.set.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Set.prototype.symmetricDifference
   * Takes a set and returns a new set containing elements which are in either this set or the given set, but not in both.
   * Spec: https://262.ecma-international.org/16.0/#sec-set.prototype.symmetricdifference
   */
  function demoSetSymmetricDifference() {
    var setA = new Set([1, 2, 3]);
    var setB = new Set([2, 3, 4]);
    return Array.from(setA.symmetricDifference(setB));
  }

  require("core-js/modules/es.array.from.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.set.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2025 (16th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/16.0/
   */

  /*
   * Set.prototype.union
   * Takes a set and returns a new set containing elements present in either or both sets.
   * Spec: https://262.ecma-international.org/16.0/#sec-set.prototype.union
   */
  function demoSetUnion() {
    var setA = new Set([1, 2]);
    var setB = new Set([2, 3]);
    return Array.from(setA.union(setB));
  }

  var name = "es-samples";
  var version = "1.0.0";
  var description = "ECMAScript code samples library (ES2011-ES2026)";
  var type = "module";
  var main = "./samples/index.js";
  var exports$1 = {
  	".": "./samples/index.js",
  	"./samples": "./samples/index.js",
  	"./samples/index.js": "./samples/index.js",
  	"./features.json": "./features.json",
  	"./features": "./features.json",
  	"./samples/*": "./samples/*",
  	"./*": "./samples/*"
  };
  var scripts = {
  	"build:features": "node scripts/build-features.js",
  	test: "node scripts/build-features.js && node samples/test.js"
  };
  var keywords = [
  	"ecmascript",
  	"javascript",
  	"es5",
  	"es2011",
  	"es2015",
  	"es2026"
  ];
  var author = "";
  var license = "MIT";
  var dependencies = {
  	"@mdn/browser-compat-data": "^8.0.6",
  	"web-features": "^3.32.0"
  };
  var _package = {
  	name: name,
  	version: version,
  	description: description,
  	type: type,
  	main: main,
  	exports: exports$1,
  	scripts: scripts,
  	keywords: keywords,
  	author: author,
  	license: license,
  	dependencies: dependencies
  };

  var _package$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    author: author,
    default: _package,
    dependencies: dependencies,
    description: description,
    exports: exports$1,
    keywords: keywords,
    license: license,
    main: main,
    name: name,
    scripts: scripts,
    type: type,
    version: version
  });

  exports.demoDuplicateNamedCaptureGroups = demoDuplicateNamedCaptureGroups;
  exports.demoFloat16Array = demoFloat16Array;
  exports.demoImportAttributes = demoImportAttributes;
  exports.demoIteratorHelpers = demoIteratorHelpers;
  exports.demoMathF16round = demoMathF16round;
  exports.demoPromiseTry = demoPromiseTry;
  exports.demoSetDifference = demoSetDifference;
  exports.demoSetIntersection = demoSetIntersection;
  exports.demoSetIsDisjointFrom = demoSetIsDisjointFrom;
  exports.demoSetIsSubsetOf = demoSetIsSubsetOf;
  exports.demoSetIsSupersetOf = demoSetIsSupersetOf;
  exports.demoSetSymmetricDifference = demoSetSymmetricDifference;
  exports.demoSetUnion = demoSetUnion;

  return exports;

})({});
//# sourceMappingURL=es2025_es5.js.101_1789571225610_8bn5i.tmp.map
