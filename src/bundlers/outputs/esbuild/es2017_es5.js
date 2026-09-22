// ../es-samples/samples/es2017/async-await.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
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
function demoAsyncAwait() {
  return _demoAsyncAwait.apply(this, arguments);
}
function _demoAsyncAwait() {
  _demoAsyncAwait = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee() {
    var shouldSucceed, fetchData, response, _args = arguments, _t;
    return _regenerator().w(function(_context) {
      while (1)
        switch (_context.p = _context.n) {
          case 0:
            fetchData = function _fetchData() {
              return new Promise(function(resolve) {
                return setTimeout(function() {
                  return resolve({
                    data: "ES2017 payload"
                  });
                }, 10);
              });
            };
            shouldSucceed = _args.length > 0 && _args[0] !== void 0 ? _args[0] : true;
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

// ../es-samples/samples/es2017/atomics.js
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.array-buffer.constructor.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.typed-array.uint8-array.js";
import "core-js/modules/es.typed-array.copy-within.js";
import "core-js/modules/es.typed-array.every.js";
import "core-js/modules/es.typed-array.fill.js";
import "core-js/modules/es.typed-array.filter.js";
import "core-js/modules/es.typed-array.find.js";
import "core-js/modules/es.typed-array.find-index.js";
import "core-js/modules/es.typed-array.for-each.js";
import "core-js/modules/es.typed-array.includes.js";
import "core-js/modules/es.typed-array.index-of.js";
import "core-js/modules/es.typed-array.iterator.js";
import "core-js/modules/es.typed-array.join.js";
import "core-js/modules/es.typed-array.last-index-of.js";
import "core-js/modules/es.typed-array.map.js";
import "core-js/modules/es.typed-array.reduce.js";
import "core-js/modules/es.typed-array.reduce-right.js";
import "core-js/modules/es.typed-array.reverse.js";
import "core-js/modules/es.typed-array.set.js";
import "core-js/modules/es.typed-array.slice.js";
import "core-js/modules/es.typed-array.some.js";
import "core-js/modules/es.typed-array.sort.js";
import "core-js/modules/es.typed-array.subarray.js";
import "core-js/modules/es.typed-array.to-locale-string.js";
import "core-js/modules/es.typed-array.to-string.js";
function demoAtomics() {
  var buffer = new SharedArrayBuffer(16);
  var uint8 = new Uint8Array(buffer);
  Atomics.store(uint8, 0, 42);
  return Atomics.load(uint8, 0);
}

// ../es-samples/samples/es2017/get-own-property-descriptors.js
import "core-js/modules/es.object.get-own-property-descriptors.js";
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
import "core-js/modules/es.object.entries.js";
function demoObjectEntries() {
  var user = {
    name: "Bob",
    role: "Developer",
    experience: 5
  };
  return Object.entries(user);
}

// ../es-samples/samples/es2017/object-values.js
import "core-js/modules/es.object.values.js";
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
import "core-js/modules/es.string.pad-end.js";
function demoStringPadEnd() {
  var tableCell = "Total";
  return tableCell.padEnd(10, ".");
}

// ../es-samples/samples/es2017/string-pad-start.js
import "core-js/modules/es.string.pad-start.js";
function demoStringPadStart() {
  var cardNumber = "1234";
  return cardNumber.padStart(16, "*");
}

// ../es-samples/samples/es2017/trailing-commas.js
function demoTrailingCommas(param1, param2, param3) {
  return [
    param1,
    param2,
    param3
    // trailing comma in array formatting/call argument
  ];
}
export {
  demoAsyncAwait,
  demoAtomics,
  demoGetOwnPropertyDescriptors,
  demoObjectEntries,
  demoObjectValues,
  demoSharedArrayBuffer,
  demoStringPadEnd,
  demoStringPadStart,
  demoTrailingCommas
};
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
//# sourceMappingURL=es2017_es5.js.101_1789571206214_rpaju.tmp.map
