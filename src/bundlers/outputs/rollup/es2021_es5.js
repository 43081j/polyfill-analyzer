var SampleBundle = (function (exports) {
  'use strict';

  function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = true, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), true), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
  function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.get-prototype-of.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.promise.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/esnext.aggregate-error.js");
  require("core-js/modules/esnext.promise.any.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
  function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
  /**
   * ECMAScript 2021 (12th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/12.0/
   */

  /*
   * AggregateError
   * Represents an error when several errors need to be wrapped in a single error object.
   * Spec: https://262.ecma-international.org/12.0/#sec-aggregate-error-objects
   */
  function demoAggregateError() {
    return _demoAggregateError.apply(this, arguments);
  }
  function _demoAggregateError() {
    _demoAggregateError = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var rejections, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            rejections = [Promise.reject(new Error("Fail A")), Promise.reject(new Error("Fail B"))];
            _context.p = 1;
            _context.n = 2;
            return Promise.any(rejections);
          case 2:
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            return _context.a(2, {
              isAggregateError: _t instanceof AggregateError,
              errorCount: _t.errors.length
            });
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3]]);
    }));
    return _demoAggregateError.apply(this, arguments);
  }

  /**
   * ECMAScript 2021 (12th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/12.0/
   */

  /*
   * FinalizationRegistry
   * Provides a way to register custom cleanup callbacks to be invoked after an object is garbage collected.
   * Spec: https://262.ecma-international.org/12.0/#sec-finalization-registry-objects
   */
  function demoFinalizationRegistry() {
    var registry = new FinalizationRegistry(function (heldValue) {
      // Cleanup action
    });
    var target = {
      data: "valuable"
    };
    registry.register(target, "token");
    return typeof registry.register === "function";
  }

  /**
   * ECMAScript 2021 (12th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/12.0/
   */

  /*
   * Logical Assignment Operators (||=, &&=, and ??=)
   * Combines logical operations with assignment. The assignment only occurs if the logical condition evaluates to
   * trigger evaluation of the right-hand side (short-circuiting assignment).
   * Spec: https://262.ecma-international.org/12.0/#sec-logical-assignment-operators
   */
  function demoLogicalAssignment() {
    var a = 0;
    a || (a = 10); // Assigns 10 because 0 is falsy

    var b = "hello";
    b && (b = b.toUpperCase()); // Assigns "HELLO" because b is truthy

    var c = null;
    c !== null && c !== void 0 ? c : c = "default"; // Assigns "default" because c is nullish

    return {
      a: a,
      b: b,
      c: c
    };
  }

  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.regexp.to-string.js");
  /**
   * ECMAScript 2021 (12th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/12.0/
   */

  /*
   * Numeric Separators
   * Allows underscores (`_`) as visual separators within numeric literals (decimal, binary, hex, octal, BigInt)
   * to enhance readability of large numbers without affecting programmatic values.
   * Spec: https://262.ecma-international.org/12.0/#sec-literal-numeric-separators
   */
  function demoNumericSeparators() {
    var oneBillion = 1000000000;
    var hexBytes = 0xFFECDE5E;
    var bigIntAmount = 9000000000000000n;
    return {
      oneBillion: oneBillion,
      hexBytes: hexBytes,
      bigIntAmountString: bigIntAmount.toString()
    };
  }

  require("core-js/modules/es.regexp.exec.js");
  require("core-js/modules/es.string.replace.js");
  require("core-js/modules/esnext.string.replace-all.js");
  /**
   * ECMAScript 2021 (12th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/12.0/
   */

  /*
   * String.prototype.replaceAll()
   * Returns a new string with all matches of a pattern (either a string or a RegExp with `g` flag) replaced by a replacement.
   * Eliminates the need for regular expressions when replacing literal string occurrences globally.
   * Spec: https://262.ecma-international.org/12.0/#sec-string.prototype.replaceall
   */
  function demoReplaceAll() {
    var quote = "To be or not to be, that is the question.";
    var replaced = quote.replaceAll("be", "code");
    return replaced; // "To code or not to code, that is the question."
  }

  /**
   * ECMAScript 2021 (12th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/12.0/
   */

  /*
   * WeakRef
   * Holds a weak reference to an object, allowing it to be garbage collected without preventing reclamation.
   * Spec: https://262.ecma-international.org/12.0/#sec-weak-ref-objects
   */
  function demoWeakRef() {
    var target = {
      data: "valuable"
    };
    var ref = new WeakRef(target);
    var retrieved = ref.deref();
    return (retrieved === null || retrieved === void 0 ? void 0 : retrieved.data) === "valuable";
  }

  exports.demoAggregateError = demoAggregateError;
  exports.demoFinalizationRegistry = demoFinalizationRegistry;
  exports.demoLogicalAssignment = demoLogicalAssignment;
  exports.demoNumericSeparators = demoNumericSeparators;
  exports.demoReplaceAll = demoReplaceAll;
  exports.demoWeakRef = demoWeakRef;

  return exports;

})({});
//# sourceMappingURL=es2021_es5.js.101_1789571220093_6ew96.tmp.map
