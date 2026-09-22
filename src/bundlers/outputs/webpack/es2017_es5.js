/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_require__ = {};
/******/ })();
"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.object.get-prototype-of.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.demoAsyncAwait = demoAsyncAwait;
exports.demoAtomics = demoAtomics;
exports.demoGetOwnPropertyDescriptors = demoGetOwnPropertyDescriptors;
exports.demoObjectEntries = demoObjectEntries;
exports.demoObjectValues = demoObjectValues;
exports.demoSharedArrayBuffer = demoSharedArrayBuffer;
exports.demoStringPadEnd = demoStringPadEnd;
exports.demoStringPadStart = demoStringPadStart;
exports.demoTrailingCommas = demoTrailingCommas;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array-buffer.constructor.js");
require("core-js/modules/es.array-buffer.detached.js");
require("core-js/modules/es.array-buffer.transfer.js");
require("core-js/modules/es.array-buffer.transfer-to-fixed-length.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.pad-end.js");
require("core-js/modules/es.string.pad-start.js");
require("core-js/modules/es.typed-array.uint8-array.js");
require("core-js/modules/es.typed-array.at.js");
require("core-js/modules/es.typed-array.copy-within.js");
require("core-js/modules/es.typed-array.every.js");
require("core-js/modules/es.typed-array.fill.js");
require("core-js/modules/es.typed-array.filter.js");
require("core-js/modules/es.typed-array.find.js");
require("core-js/modules/es.typed-array.find-index.js");
require("core-js/modules/es.typed-array.find-last.js");
require("core-js/modules/es.typed-array.find-last-index.js");
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
require("core-js/modules/es.typed-array.to-reversed.js");
require("core-js/modules/es.typed-array.to-sorted.js");
require("core-js/modules/es.typed-array.to-string.js");
require("core-js/modules/es.typed-array.with.js");
require("core-js/modules/esnext.uint8-array.to-base64.js");
require("core-js/modules/esnext.uint8-array.to-hex.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// ../es-samples/samples/es2017/async-await.js
function demoAsyncAwait() {
  return _demoAsyncAwait.apply(this, arguments);
} // ../es-samples/samples/es2017/atomics.js
function _demoAsyncAwait() {
  _demoAsyncAwait = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var shouldSucceed,
      fetchData,
      response,
      _args = arguments,
      _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          fetchData = function _fetchData() {
            return new Promise(function (resolve) {
              return setTimeout(function () {
                return resolve({
                  data: "ES2017 payload"
                });
              }, 10);
            });
          };
          shouldSucceed = _args.length > 0 && _args[0] !== undefined ? _args[0] : true;
          _context.p = 1;
          _context.n = 2;
          return fetchData();
        case 2:
          response = _context.v;
          return _context.a(2, response.data);
        case 3:
          _context.p = 3;
          _t = _context.v;
          return _context.a(2, "Failed to fetch");
      }
    }, _callee, null, [[1, 3]]);
  }));
  return _demoAsyncAwait.apply(this, arguments);
}
function demoAtomics() {
  var buffer = new SharedArrayBuffer(16);
  var uint8 = new Uint8Array(buffer);
  Atomics.store(uint8, 0, 42);
  return Atomics.load(uint8, 0);
}

// ../es-samples/samples/es2017/get-own-property-descriptors.js
function demoGetOwnPropertyDescriptors() {
  var source = {
    _val: 10,
    get val() {
      return this._val;
    },
    set val(v) {
      this._val = v;
    }
  };
  var descriptors = Object.getOwnPropertyDescriptors(source);
  var clone = Object.defineProperties({}, descriptors);
  clone.val = 25;
  return {
    sourceVal: source.val,
    cloneVal: clone.val,
    hasGetter: typeof descriptors.val.get === "function"
  };
}

// ../es-samples/samples/es2017/object-entries.js
function demoObjectEntries() {
  var user = {
    name: "Bob",
    role: "Developer",
    experience: 5
  };
  return Object.entries(user);
}

// ../es-samples/samples/es2017/object-values.js
function demoObjectValues() {
  var user = {
    name: "Bob",
    role: "Developer",
    experience: 5
  };
  return Object.values(user);
}

// ../es-samples/samples/es2017/shared-array-buffer.js
function demoSharedArrayBuffer() {
  var sab = new SharedArrayBuffer(1024);
  return sab.byteLength === 1024;
}

// ../es-samples/samples/es2017/string-pad-end.js
function demoStringPadEnd() {
  var tableCell = "Total";
  return tableCell.padEnd(10, ".");
}

// ../es-samples/samples/es2017/string-pad-start.js
function demoStringPadStart() {
  var cardNumber = "1234";
  return cardNumber.padStart(16, "*");
}

// ../es-samples/samples/es2017/trailing-commas.js
function demoTrailingCommas(param1, param2, param3) {
  return [param1, param2, param3
  // trailing comma in array formatting/call argument
  ];
}