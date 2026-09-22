// ../es-samples/samples/es2021/aggregate-error.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/esnext.aggregate-error.js";
import "core-js/modules/esnext.promise.any.js";
import "core-js/modules/web.dom-collections.iterator.js";
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
  }), (_regenerator = function _regenerator2() {
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
function demoAggregateError() {
  return _demoAggregateError.apply(this, arguments);
}
function _demoAggregateError() {
  _demoAggregateError = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee() {
    var rejections, _t;
    return _regenerator().w(function(_context) {
      while (1)
        switch (_context.p = _context.n) {
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

// ../es-samples/samples/es2021/finalization-registry.js
function demoFinalizationRegistry() {
  var registry = new FinalizationRegistry(function(heldValue) {
  });
  var target = {
    data: "valuable"
  };
  registry.register(target, "token");
  return typeof registry.register === "function";
}

// ../es-samples/samples/es2021/logical-assignment.js
function demoLogicalAssignment() {
  var a = 0;
  a || (a = 10);
  var b = "hello";
  b && (b = b.toUpperCase());
  var c = null;
  c !== null && c !== void 0 ? c : c = "default";
  return {
    a,
    b,
    c
  };
}

// ../es-samples/samples/es2021/numeric-separators.js
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
function demoNumericSeparators() {
  var oneBillion = 1e9;
  var hexBytes = 4293713502;
  var bigIntAmount = 9000000000000000n;
  return {
    oneBillion,
    hexBytes,
    bigIntAmountString: bigIntAmount.toString()
  };
}

// ../es-samples/samples/es2021/string-replace-all.js
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/esnext.string.replace-all.js";
function demoReplaceAll() {
  var quote = "To be or not to be, that is the question.";
  var replaced = quote.replaceAll("be", "code");
  return replaced;
}

// ../es-samples/samples/es2021/weak-ref.js
function demoWeakRef() {
  var target = {
    data: "valuable"
  };
  var ref = new WeakRef(target);
  var retrieved = ref.deref();
  return (retrieved === null || retrieved === void 0 ? void 0 : retrieved.data) === "valuable";
}
export {
  demoAggregateError,
  demoFinalizationRegistry,
  demoLogicalAssignment,
  demoNumericSeparators,
  demoReplaceAll,
  demoWeakRef
};
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
//# sourceMappingURL=es2021_es5.js.101_1789571220427_c3qvo.tmp.map
