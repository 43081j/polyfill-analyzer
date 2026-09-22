var SampleBundle = (function (exports) {
  'use strict';

  require("core-js/modules/es.array-buffer.constructor.js");
  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 2024 (15th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/15.0/
   */

  /*
   * ArrayBuffer.prototype.resize
   * Resizes the ArrayBuffer to the specified size in bytes.
   * Spec: https://262.ecma-international.org/15.0/#sec-arraybuffer.prototype.resize
   */
  function demoArrayBufferResize() {
    var buffer = new ArrayBuffer(8, {
      maxByteLength: 32
    });
    buffer.resize(16);
    return buffer.byteLength;
  }

  require("core-js/modules/es.array-buffer.constructor.js");
  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 2024 (15th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/15.0/
   */

  /*
   * ArrayBuffer.prototype.transfer
   * Creates a new ArrayBuffer with the same byte content as this buffer, then detaches this buffer.
   * Spec: https://262.ecma-international.org/15.0/#sec-arraybuffer.prototype.transfer
   */
  function demoArrayBufferTransfer() {
    var buffer = new ArrayBuffer(8);
    var newBuffer = buffer.transfer(16);
    return {
      isDetached: buffer.detached,
      newLength: newBuffer.byteLength
    };
  }

  function _regenerator$1() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2$1(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = true, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), true), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2$1(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2$1(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2$1(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2$1(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2$1(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2$1(u), _regeneratorDefine2$1(u, o, "Generator"), _regeneratorDefine2$1(u, n, function () { return this; }), _regeneratorDefine2$1(u, "toString", function () { return "[object Generator]"; }), (_regenerator$1 = function _regenerator() { return { w: i, m: f }; })(); }
  function _regeneratorDefine2$1(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2$1 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2$1(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2$1(e, r, n, t); }
  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.array-buffer.constructor.js");
  require("core-js/modules/es.object.get-prototype-of.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.promise.js");
  require("core-js/modules/es.typed-array.int32-array.js");
  require("core-js/modules/es.typed-array.copy-within.js");
  require("core-js/modules/es.typed-array.every.js");
  require("core-js/modules/es.typed-array.fill.js");
  require("core-js/modules/es.typed-array.filter.js");
  require("core-js/modules/es.typed-array.find.js");
  require("core-js/modules/es.typed-array.find-index.js");
  require("core-js/modules/es.typed-array.for-each.js");
  require("core-js/modules/es.typed-array.includes.js");
  require("core-js/modules/es.typed-array.index-of.js");
  require("core-js/modules/es.typed-array.iterator.js");
  require("core-js/modules/es.typed-array.join.js");
  require("core-js/modules/es.typed-array.last-index-of.js");
  require("core-js/modules/es.typed-array.map.js");
  require("core-js/modules/es.typed-array.reduce.js");
  require("core-js/modules/es.typed-array.reduce-right.js");
  require("core-js/modules/es.typed-array.reverse.js");
  require("core-js/modules/es.typed-array.set.js");
  require("core-js/modules/es.typed-array.slice.js");
  require("core-js/modules/es.typed-array.some.js");
  require("core-js/modules/es.typed-array.sort.js");
  require("core-js/modules/es.typed-array.subarray.js");
  require("core-js/modules/es.typed-array.to-locale-string.js");
  require("core-js/modules/es.typed-array.to-string.js");
  function asyncGeneratorStep$1(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
  function _asyncToGenerator$1(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep$1(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep$1(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
  /**
   * ECMAScript 2024 (15th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/15.0/
   */

  /*
   * Atomics.waitAsync()
   * Asynchronous version of `Atomics.wait()`, returning a Promise that resolves when a shared memory location is notified or times out.
   * Non-blocking, making it safe for use on the main browser UI thread where synchronous `Atomics.wait()` is disallowed.
   * Spec: https://262.ecma-international.org/15.0/#sec-atomics.waitasync
   */
  function demoAtomicsWaitAsync() {
    return _demoAtomicsWaitAsync.apply(this, arguments);
  }
  function _demoAtomicsWaitAsync() {
    _demoAtomicsWaitAsync = _asyncToGenerator$1(/*#__PURE__*/_regenerator$1().m(function _callee() {
      var sab, int32, waitResult, outcome;
      return _regenerator$1().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            sab = new SharedArrayBuffer(1024);
            int32 = new Int32Array(sab); // Non-blocking wait for index 0 to change from initial value 0
            waitResult = Atomics.waitAsync(int32, 0, 0, 50); // 50ms timeout
            // We don't notify, so it should time out and resolve to "timed-out"
            _context.n = 1;
            return waitResult.value;
          case 1:
            outcome = _context.v;
            return _context.a(2, outcome);
        }
      }, _callee);
    }));
    return _demoAtomicsWaitAsync.apply(this, arguments);
  }

  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.map.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/esnext.map.group-by.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2024 (15th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/15.0/
   */

  /*
   * Map.groupBy()
   * Groups elements of an iterable according to arbitrary keys returned by a callback function into a Map.
   * Spec: https://262.ecma-international.org/15.0/#sec-map.groupby
   */
  function demoMapGroupBy() {
    var inventory = [{
      name: "Banana",
      quantity: 0
    }, {
      name: "Cherries",
      quantity: 5
    }];
    return Map.groupBy(inventory, function (item) {
      return item.quantity === 0 ? "restock" : "ok";
    });
  }

  /**
   * ECMAScript 2024 (15th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/15.0/
   */

  /*
   * Object.groupBy()
   * Groups elements of an iterable according to string/symbol keys returned by a callback function.
   * Spec: https://262.ecma-international.org/15.0/#sec-object.groupby
   */
  function demoObjectGroupBy() {
    var inventory = [{
      name: "Asparagus",
      type: "vegetable"
    }, {
      name: "Banana",
      type: "fruit"
    }];
    return Object.groupBy(inventory, function (item) {
      return item.type;
    });
  }

  function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = true, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), true), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
  function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.object.get-prototype-of.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.promise.js");
  function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
  function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
  /**
   * ECMAScript 2024 (15th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/15.0/
   */

  /*
   * Promise.withResolvers()
   * A static method returning an object containing a new Promise along with its associated `resolve` and `reject`
   * functions, avoiding the boilerplate of extracting resolvers from within a `new Promise(...)` executor constructor callback.
   * Spec: https://262.ecma-international.org/15.0/#sec-promise.withresolvers
   */
  function demoPromiseWithResolvers() {
    return _demoPromiseWithResolvers.apply(this, arguments);
  }
  function _demoPromiseWithResolvers() {
    _demoPromiseWithResolvers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _Promise$withResolver, promise, resolve, result;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _Promise$withResolver = Promise.withResolvers(), promise = _Promise$withResolver.promise, resolve = _Promise$withResolver.resolve, _Promise$withResolver.reject; // Resolve asynchronously outside constructor callback
            setTimeout(function () {
              return resolve("Resolved via withResolvers");
            }, 10);
            _context.n = 1;
            return promise;
          case 1:
            result = _context.v;
            return _context.a(2, result);
        }
      }, _callee);
    }));
    return _demoPromiseWithResolvers.apply(this, arguments);
  }

  require("core-js/modules/es.regexp.exec.js");
  /**
   * ECMAScript 2024 (15th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/15.0/
   */

  /*
   * RegExp v Flag (Unicode Sets)
   * An upgrade over the `u` flag (`/pattern/v`) that enables set notation and operations within character classes,
   * supporting string properties, difference (`--`), and intersection (`&&`) of Unicode sets.
   * Spec: https://262.ecma-international.org/15.0/#sec-get-regexp.prototype.unicodeSets
   */
  function demoRegExpVFlag() {
    // Matching Greek characters except for the letter alpha using set difference `--`
    var nonAlphaGreek = /^(?:[\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03B0\u03B2-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65]|\uD800[\uDD40-\uDD8E\uDDA0]|\uD834[\uDE00-\uDE45])+$/;

    // Matching string properties like RGI emoji flag sequences
    var emojiFlagRegex = /^(?:🇦🇨|🇦🇩|🇦🇪|🇦🇫|🇦🇬|🇦🇮|🇦🇱|🇦🇲|🇦🇴|🇦🇶|🇦🇷|🇦🇸|🇦🇹|🇦🇺|🇦🇼|🇦🇽|🇦🇿|🇧🇦|🇧🇧|🇧🇩|🇧🇪|🇧🇫|🇧🇬|🇧🇭|🇧🇮|🇧🇯|🇧🇱|🇧🇲|🇧🇳|🇧🇴|🇧🇶|🇧🇷|🇧🇸|🇧🇹|🇧🇻|🇧🇼|🇧🇾|🇧🇿|🇨🇦|🇨🇨|🇨🇩|🇨🇫|🇨🇬|🇨🇭|🇨🇮|🇨🇰|🇨🇱|🇨🇲|🇨🇳|🇨🇴|🇨🇵|🇨🇶|🇨🇷|🇨🇺|🇨🇻|🇨🇼|🇨🇽|🇨🇾|🇨🇿|🇩🇪|🇩🇬|🇩🇯|🇩🇰|🇩🇲|🇩🇴|🇩🇿|🇪🇦|🇪🇨|🇪🇪|🇪🇬|🇪🇭|🇪🇷|🇪🇸|🇪🇹|🇪🇺|🇫🇮|🇫🇯|🇫🇰|🇫🇲|🇫🇴|🇫🇷|🇬🇦|🇬🇧|🇬🇩|🇬🇪|🇬🇫|🇬🇬|🇬🇭|🇬🇮|🇬🇱|🇬🇲|🇬🇳|🇬🇵|🇬🇶|🇬🇷|🇬🇸|🇬🇹|🇬🇺|🇬🇼|🇬🇾|🇭🇰|🇭🇲|🇭🇳|🇭🇷|🇭🇹|🇭🇺|🇮🇨|🇮🇩|🇮🇪|🇮🇱|🇮🇲|🇮🇳|🇮🇴|🇮🇶|🇮🇷|🇮🇸|🇮🇹|🇯🇪|🇯🇲|🇯🇴|🇯🇵|🇰🇪|🇰🇬|🇰🇭|🇰🇮|🇰🇲|🇰🇳|🇰🇵|🇰🇷|🇰🇼|🇰🇾|🇰🇿|🇱🇦|🇱🇧|🇱🇨|🇱🇮|🇱🇰|🇱🇷|🇱🇸|🇱🇹|🇱🇺|🇱🇻|🇱🇾|🇲🇦|🇲🇨|🇲🇩|🇲🇪|🇲🇫|🇲🇬|🇲🇭|🇲🇰|🇲🇱|🇲🇲|🇲🇳|🇲🇴|🇲🇵|🇲🇶|🇲🇷|🇲🇸|🇲🇹|🇲🇺|🇲🇻|🇲🇼|🇲🇽|🇲🇾|🇲🇿|🇳🇦|🇳🇨|🇳🇪|🇳🇫|🇳🇬|🇳🇮|🇳🇱|🇳🇴|🇳🇵|🇳🇷|🇳🇺|🇳🇿|🇴🇲|🇵🇦|🇵🇪|🇵🇫|🇵🇬|🇵🇭|🇵🇰|🇵🇱|🇵🇲|🇵🇳|🇵🇷|🇵🇸|🇵🇹|🇵🇼|🇵🇾|🇶🇦|🇷🇪|🇷🇴|🇷🇸|🇷🇺|🇷🇼|🇸🇦|🇸🇧|🇸🇨|🇸🇩|🇸🇪|🇸🇬|🇸🇭|🇸🇮|🇸🇯|🇸🇰|🇸🇱|🇸🇲|🇸🇳|🇸🇴|🇸🇷|🇸🇸|🇸🇹|🇸🇻|🇸🇽|🇸🇾|🇸🇿|🇹🇦|🇹🇨|🇹🇩|🇹🇫|🇹🇬|🇹🇭|🇹🇯|🇹🇰|🇹🇱|🇹🇲|🇹🇳|🇹🇴|🇹🇷|🇹🇹|🇹🇻|🇹🇼|🇹🇿|🇺🇦|🇺🇬|🇺🇲|🇺🇳|🇺🇸|🇺🇾|🇺🇿|🇻🇦|🇻🇨|🇻🇪|🇻🇬|🇻🇮|🇻🇳|🇻🇺|🇼🇫|🇼🇸|🇽🇰|🇾🇪|🇾🇹|🇿🇦|🇿🇲|🇿🇼)$/;
    return {
      matchesBeta: nonAlphaGreek.test("\u03B2"),
      // true (beta)
      matchesAlpha: nonAlphaGreek.test("\u03B1"),
      // false (alpha subtracted)
      matchesFlag: emojiFlagRegex.test("🇺🇸") // true
    };
  }

  /**
   * ECMAScript 2024 (15th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/15.0/
   */

  /*
   * String.prototype.isWellFormed
   * Returns a boolean indicating whether this string contains any lone surrogates.
   * Spec: https://262.ecma-international.org/15.0/#sec-string.prototype.iswellformed
   */
  function demoStringIsWellFormed() {
    var wellFormed = "Hello";
    var illFormed = "Hello \uD800";
    return {
      wellFormedCheck: wellFormed.isWellFormed(),
      illFormedCheck: illFormed.isWellFormed()
    };
  }

  /**
   * ECMAScript 2024 (15th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/15.0/
   */

  /*
   * String.prototype.toWellFormed
   * Returns a string where any lone surrogate code points in this string are replaced with the Unicode replacement character U+FFFD.
   * Spec: https://262.ecma-international.org/15.0/#sec-string.prototype.towellformed
   */
  function demoStringToWellFormed() {
    var illFormed = "Hello \uD800 World";
    return illFormed.toWellFormed();
  }

  exports.demoArrayBufferResize = demoArrayBufferResize;
  exports.demoArrayBufferTransfer = demoArrayBufferTransfer;
  exports.demoAtomicsWaitAsync = demoAtomicsWaitAsync;
  exports.demoMapGroupBy = demoMapGroupBy;
  exports.demoObjectGroupBy = demoObjectGroupBy;
  exports.demoPromiseWithResolvers = demoPromiseWithResolvers;
  exports.demoRegExpVFlag = demoRegExpVFlag;
  exports.demoStringIsWellFormed = demoStringIsWellFormed;
  exports.demoStringToWellFormed = demoStringToWellFormed;

  return exports;

})({});
//# sourceMappingURL=es2024_es5.js.101_1789571224042_ak0qn.tmp.map
