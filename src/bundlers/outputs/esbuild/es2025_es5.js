var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../es-samples/package.json
var package_exports = {};
__export(package_exports, {
  default: () => package_default
});
var package_default;
var init_package = __esm({
  "../es-samples/package.json"() {
    package_default = {
      name: "es-samples",
      version: "1.0.0",
      description: "ECMAScript code samples library (ES2011-ES2026)",
      type: "module",
      main: "./samples/index.js",
      exports: {
        ".": "./samples/index.js",
        "./samples": "./samples/index.js",
        "./samples/index.js": "./samples/index.js",
        "./features.json": "./features.json",
        "./features": "./features.json",
        "./samples/*": "./samples/*",
        "./*": "./samples/*"
      },
      scripts: {
        "build:features": "node scripts/build-features.js",
        test: "node scripts/build-features.js && node samples/test.js"
      },
      keywords: [
        "ecmascript",
        "javascript",
        "es5",
        "es2011",
        "es2015",
        "es2026"
      ],
      author: "",
      license: "MIT",
      dependencies: {
        "@mdn/browser-compat-data": "^8.0.6",
        "web-features": "^3.32.0"
      }
    };
  }
});

// ../es-samples/samples/es2025/float16-array.js
function demoFloat16Array() {
  var f16 = new Float16Array([1.5, 2.5]);
  return {
    len: f16.length,
    bytes: Float16Array.BYTES_PER_ELEMENT
  };
}

// ../es-samples/samples/es2025/import-attributes.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
function _regenerator() {
  var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
  function i(r2, n2, o2, i2) {
    var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
    return _regeneratorDefine2(u2, "_invoke", function(r3, n3, o3) {
      var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d2(t2, r4) {
        return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
      } };
      function d(r4, n4) {
        for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
          var o4, i4 = p[t], d2 = G.p, l = i4[2];
          r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
        }
        if (o4 || r4 > 1)
          return a;
        throw y = true, n4;
      }
      return function(o4, p2, l) {
        if (f2 > 1)
          throw TypeError("Generator is already running");
        for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
          i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
          try {
            if (f2 = 2, i3) {
              if (c3 || (o4 = "next"), t = i3[o4]) {
                if (!(t = t.call(i3, u3)))
                  throw TypeError("iterator result is not an object");
                if (!t.done)
                  return t;
                u3 = t.value, c3 < 2 && (c3 = 0);
              } else
                1 === c3 && (t = i3.return) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
              i3 = e;
            } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a)
              break;
          } catch (t2) {
            i3 = e, c3 = 1, u3 = t2;
          } finally {
            f2 = 1;
          }
        }
        return { value: t, done: y };
      };
    }(r2, o2, i2), true), u2;
  }
  var a = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function() {
    return this;
  }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e2) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function() {
    return this;
  }), _regeneratorDefine2(u, "toString", function() {
    return "[object Generator]";
  }), (_regenerator = function _regenerator4() {
    return { w: i, m: f };
  })();
}
function _regeneratorDefine2(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e2) {
    i = 0;
  }
  _regeneratorDefine2 = function _regeneratorDefine(e2, r2, n2, t2) {
    function o(r3, n3) {
      _regeneratorDefine2(e2, r3, function(e3) {
        return this._invoke(r3, n3, e3);
      });
    }
    r2 ? i ? i(e2, r2, { value: n2, enumerable: !t2, configurable: !t2, writable: !t2 }) : e2[r2] = n2 : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine2(e, r, n, t);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c), u = i.value;
  } catch (n2) {
    return void e(n2);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function() {
    var t = this, e = arguments;
    return new Promise(function(r, o) {
      var a = n.apply(t, e);
      function _next(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
      }
      function _throw(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
      }
      _next(void 0);
    });
  };
}
function demoImportAttributes() {
  return _demoImportAttributes.apply(this, arguments);
}
function _demoImportAttributes() {
  _demoImportAttributes = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee() {
    var _pkg$default$name, _pkg$default, pkg, _t;
    return _regenerator().w(function(_context) {
      while (1)
        switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return Promise.resolve().then(() => (init_package(), package_exports));
          case 1:
            pkg = _context.v;
            return _context.a(2, (_pkg$default$name = (_pkg$default = pkg.default) === null || _pkg$default === void 0 ? void 0 : _pkg$default.name) !== null && _pkg$default$name !== void 0 ? _pkg$default$name : "es-samples");
          case 2:
            _context.p = 2;
            _t = _context.v;
            return _context.a(2, "es-samples");
        }
    }, _callee, null, [[0, 2]]);
  }));
  return _demoImportAttributes.apply(this, arguments);
}

// ../es-samples/samples/es2025/iterator-helpers.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
function _regenerator2() {
  var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
  function i(r2, n2, o2, i2) {
    var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
    return _regeneratorDefine22(u2, "_invoke", function(r3, n3, o3) {
      var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d2(t2, r4) {
        return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
      } };
      function d(r4, n4) {
        for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
          var o4, i4 = p[t], d2 = G.p, l = i4[2];
          r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
        }
        if (o4 || r4 > 1)
          return a;
        throw y = true, n4;
      }
      return function(o4, p2, l) {
        if (f2 > 1)
          throw TypeError("Generator is already running");
        for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
          i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
          try {
            if (f2 = 2, i3) {
              if (c3 || (o4 = "next"), t = i3[o4]) {
                if (!(t = t.call(i3, u3)))
                  throw TypeError("iterator result is not an object");
                if (!t.done)
                  return t;
                u3 = t.value, c3 < 2 && (c3 = 0);
              } else
                1 === c3 && (t = i3.return) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
              i3 = e;
            } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a)
              break;
          } catch (t2) {
            i3 = e, c3 = 1, u3 = t2;
          } finally {
            f2 = 1;
          }
        }
        return { value: t, done: y };
      };
    }(r2, o2, i2), true), u2;
  }
  var a = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine22(t = {}, n, function() {
    return this;
  }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e2) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine22(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine22(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine22(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine22(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine22(u), _regeneratorDefine22(u, o, "Generator"), _regeneratorDefine22(u, n, function() {
    return this;
  }), _regeneratorDefine22(u, "toString", function() {
    return "[object Generator]";
  }), (_regenerator2 = function _regenerator4() {
    return { w: i, m: f };
  })();
}
function _regeneratorDefine22(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e2) {
    i = 0;
  }
  _regeneratorDefine22 = function _regeneratorDefine(e2, r2, n2, t2) {
    function o(r3, n3) {
      _regeneratorDefine22(e2, r3, function(e3) {
        return this._invoke(r3, n3, e3);
      });
    }
    r2 ? i ? i(e2, r2, { value: n2, enumerable: !t2, configurable: !t2, writable: !t2 }) : e2[r2] = n2 : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine22(e, r, n, t);
}
function demoIteratorHelpers() {
  var _marked = /* @__PURE__ */ _regenerator2().m(infiniteNumbers);
  function infiniteNumbers() {
    var n;
    return _regenerator2().w(function(_context) {
      while (1)
        switch (_context.n) {
          case 0:
            n = 1;
          case 1:
            if (false) {
              _context.n = 3;
              break;
            }
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
  var result = infiniteNumbers().filter(function(n) {
    return n % 2 === 0;
  }).map(function(n) {
    return n * 10;
  }).drop(1).take(3).toArray();
  return result;
}

// ../es-samples/samples/es2025/math-f16round.js
function demoMathF16round() {
  return Math.f16round(1.337);
}

// ../es-samples/samples/es2025/promise-try.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/esnext.promise.try.js";
function _regenerator3() {
  var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
  function i(r2, n2, o2, i2) {
    var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
    return _regeneratorDefine23(u2, "_invoke", function(r3, n3, o3) {
      var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d2(t2, r4) {
        return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
      } };
      function d(r4, n4) {
        for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
          var o4, i4 = p[t], d2 = G.p, l = i4[2];
          r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
        }
        if (o4 || r4 > 1)
          return a;
        throw y = true, n4;
      }
      return function(o4, p2, l) {
        if (f2 > 1)
          throw TypeError("Generator is already running");
        for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
          i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
          try {
            if (f2 = 2, i3) {
              if (c3 || (o4 = "next"), t = i3[o4]) {
                if (!(t = t.call(i3, u3)))
                  throw TypeError("iterator result is not an object");
                if (!t.done)
                  return t;
                u3 = t.value, c3 < 2 && (c3 = 0);
              } else
                1 === c3 && (t = i3.return) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
              i3 = e;
            } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a)
              break;
          } catch (t2) {
            i3 = e, c3 = 1, u3 = t2;
          } finally {
            f2 = 1;
          }
        }
        return { value: t, done: y };
      };
    }(r2, o2, i2), true), u2;
  }
  var a = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine23(t = {}, n, function() {
    return this;
  }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e2) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine23(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine23(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine23(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine23(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine23(u), _regeneratorDefine23(u, o, "Generator"), _regeneratorDefine23(u, n, function() {
    return this;
  }), _regeneratorDefine23(u, "toString", function() {
    return "[object Generator]";
  }), (_regenerator3 = function _regenerator4() {
    return { w: i, m: f };
  })();
}
function _regeneratorDefine23(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e2) {
    i = 0;
  }
  _regeneratorDefine23 = function _regeneratorDefine(e2, r2, n2, t2) {
    function o(r3, n3) {
      _regeneratorDefine23(e2, r3, function(e3) {
        return this._invoke(r3, n3, e3);
      });
    }
    r2 ? i ? i(e2, r2, { value: n2, enumerable: !t2, configurable: !t2, writable: !t2 }) : e2[r2] = n2 : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine23(e, r, n, t);
}
function asyncGeneratorStep2(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c), u = i.value;
  } catch (n2) {
    return void e(n2);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator2(n) {
  return function() {
    var t = this, e = arguments;
    return new Promise(function(r, o) {
      var a = n.apply(t, e);
      function _next(n2) {
        asyncGeneratorStep2(a, r, o, _next, _throw, "next", n2);
      }
      function _throw(n2) {
        asyncGeneratorStep2(a, r, o, _next, _throw, "throw", n2);
      }
      _next(void 0);
    });
  };
}
function demoPromiseTry() {
  return _demoPromiseTry.apply(this, arguments);
}
function _demoPromiseTry() {
  _demoPromiseTry = _asyncToGenerator2(/* @__PURE__ */ _regenerator3().m(function _callee() {
    var shouldThrowSync, possiblySyncOperation, res, _args = arguments, _t;
    return _regenerator3().w(function(_context) {
      while (1)
        switch (_context.p = _context.n) {
          case 0:
            possiblySyncOperation = function _possiblySyncOperatio() {
              if (shouldThrowSync) {
                throw new Error("Synchronous failure");
              }
              return "Success value";
            };
            shouldThrowSync = _args.length > 0 && _args[0] !== void 0 ? _args[0] : false;
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

// ../es-samples/samples/es2025/regexp-duplicate-named-capture-groups.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.symbol.replace.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.constructor.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _wrapRegExp() {
  _wrapRegExp = function _wrapRegExp2(e2, r2) {
    return new BabelRegExp(e2, void 0, r2);
  };
  var e = RegExp.prototype, r = /* @__PURE__ */ new WeakMap();
  function BabelRegExp(e2, t, p) {
    var o = RegExp(e2, t);
    return r.set(o, p || r.get(e2)), _setPrototypeOf(o, BabelRegExp.prototype);
  }
  function buildGroups(e2, t) {
    var p = r.get(t);
    return Object.keys(p).reduce(function(r2, t2) {
      var o = p[t2];
      if ("number" == typeof o)
        r2[t2] = e2[o];
      else {
        for (var i = 0; void 0 === e2[o[i]] && i + 1 < o.length; )
          i++;
        r2[t2] = e2[o[i]];
      }
      return r2;
    }, /* @__PURE__ */ Object.create(null));
  }
  return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function(r2) {
    var t = e.exec.call(this, r2);
    if (t) {
      t.groups = buildGroups(t, this);
      var p = t.indices;
      p && (p.groups = buildGroups(p, this));
    }
    return t;
  }, BabelRegExp.prototype[Symbol.replace] = function(t, p) {
    if ("string" == typeof p) {
      var o = r.get(this);
      return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)(>|$)/g, function(e2, r2, t2) {
        if ("" === t2)
          return e2;
        var p2 = o[r2];
        return Array.isArray(p2) ? "$" + p2.join("$") : "number" == typeof p2 ? "$" + p2 : "";
      }));
    }
    if ("function" == typeof p) {
      var i = this;
      return e[Symbol.replace].call(this, t, function() {
        var e2 = arguments;
        return "object" != _typeof(e2[e2.length - 1]) && (e2 = [].slice.call(e2)).push(buildGroups(e2, i)), p.apply(this, e2);
      });
    }
    return e[Symbol.replace].call(this, t, p);
  }, _wrapRegExp.apply(this, arguments);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e)
    throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}
function demoDuplicateNamedCaptureGroups() {
  var regex = /* @__PURE__ */ _wrapRegExp(/(\d{4})-[a-z]+|[a-z]+-(\d{4})/i, {
    year: [1, 2]
  });
  var match1 = regex.exec("2025-june");
  var match2 = regex.exec("june-2025");
  return {
    firstFormatYear: match1.groups.year,
    // "2025"
    secondFormatYear: match2.groups.year
    // "2025"
  };
}

// ../es-samples/samples/es2025/set-difference.js
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoSetDifference() {
  var setA = /* @__PURE__ */ new Set([1, 2, 3]);
  var setB = /* @__PURE__ */ new Set([2, 3, 4]);
  return Array.from(setA.difference(setB));
}

// ../es-samples/samples/es2025/set-intersection.js
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoSetIntersection() {
  var setA = /* @__PURE__ */ new Set([1, 2, 3]);
  var setB = /* @__PURE__ */ new Set([2, 3, 4]);
  return Array.from(setA.intersection(setB));
}

// ../es-samples/samples/es2025/set-is-disjoint-from.js
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoSetIsDisjointFrom() {
  var setA = /* @__PURE__ */ new Set([1, 2]);
  var setB = /* @__PURE__ */ new Set([3, 4]);
  return setA.isDisjointFrom(setB);
}

// ../es-samples/samples/es2025/set-is-subset-of.js
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoSetIsSubsetOf() {
  var setA = /* @__PURE__ */ new Set([1, 2]);
  var setB = /* @__PURE__ */ new Set([1, 2, 3]);
  return setA.isSubsetOf(setB);
}

// ../es-samples/samples/es2025/set-is-superset-of.js
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoSetIsSupersetOf() {
  var setA = /* @__PURE__ */ new Set([1, 2, 3]);
  var setB = /* @__PURE__ */ new Set([1, 2]);
  return setA.isSupersetOf(setB);
}

// ../es-samples/samples/es2025/set-symmetric-difference.js
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoSetSymmetricDifference() {
  var setA = /* @__PURE__ */ new Set([1, 2, 3]);
  var setB = /* @__PURE__ */ new Set([2, 3, 4]);
  return Array.from(setA.symmetricDifference(setB));
}

// ../es-samples/samples/es2025/set-union.js
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoSetUnion() {
  var setA = /* @__PURE__ */ new Set([1, 2]);
  var setB = /* @__PURE__ */ new Set([2, 3]);
  return Array.from(setA.union(setB));
}
export {
  demoDuplicateNamedCaptureGroups,
  demoFloat16Array,
  demoImportAttributes,
  demoIteratorHelpers,
  demoMathF16round,
  demoPromiseTry,
  demoSetDifference,
  demoSetIntersection,
  demoSetIsDisjointFrom,
  demoSetIsSubsetOf,
  demoSetIsSupersetOf,
  demoSetSymmetricDifference,
  demoSetUnion
};
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
//# sourceMappingURL=es2025_es5.js.101_1789571226549_ws0b4.tmp.map
