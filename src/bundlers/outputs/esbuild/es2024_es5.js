// ../es-samples/samples/es2024/array-buffer-resize.js
import "core-js/modules/es.array-buffer.constructor.js";
import "core-js/modules/es.object.to-string.js";
function demoArrayBufferResize() {
  var buffer = new ArrayBuffer(8, {
    maxByteLength: 32
  });
  buffer.resize(16);
  return buffer.byteLength;
}

// ../es-samples/samples/es2024/array-buffer-transfer.js
import "core-js/modules/es.array-buffer.constructor.js";
import "core-js/modules/es.object.to-string.js";
function demoArrayBufferTransfer() {
  var buffer = new ArrayBuffer(8);
  var newBuffer = buffer.transfer(16);
  return {
    isDetached: buffer.detached,
    newLength: newBuffer.byteLength
  };
}

// ../es-samples/samples/es2024/atomics-wait-async.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.array-buffer.constructor.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.typed-array.int32-array.js";
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
  }), (_regenerator = function _regenerator3() {
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
function demoAtomicsWaitAsync() {
  return _demoAtomicsWaitAsync.apply(this, arguments);
}
function _demoAtomicsWaitAsync() {
  _demoAtomicsWaitAsync = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee() {
    var sab, int32, waitResult, outcome;
    return _regenerator().w(function(_context) {
      while (1)
        switch (_context.n) {
          case 0:
            sab = new SharedArrayBuffer(1024);
            int32 = new Int32Array(sab);
            waitResult = Atomics.waitAsync(int32, 0, 0, 50);
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

// ../es-samples/samples/es2024/map-group-by.js
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/esnext.map.group-by.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoMapGroupBy() {
  var inventory = [{
    name: "Banana",
    quantity: 0
  }, {
    name: "Cherries",
    quantity: 5
  }];
  return Map.groupBy(inventory, function(item) {
    return item.quantity === 0 ? "restock" : "ok";
  });
}

// ../es-samples/samples/es2024/object-group-by.js
function demoObjectGroupBy() {
  var inventory = [{
    name: "Asparagus",
    type: "vegetable"
  }, {
    name: "Banana",
    type: "fruit"
  }];
  return Object.groupBy(inventory, function(item) {
    return item.type;
  });
}

// ../es-samples/samples/es2024/promise-with-resolvers.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
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
  }), (_regenerator2 = function _regenerator3() {
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
function demoPromiseWithResolvers() {
  return _demoPromiseWithResolvers.apply(this, arguments);
}
function _demoPromiseWithResolvers() {
  _demoPromiseWithResolvers = _asyncToGenerator2(/* @__PURE__ */ _regenerator2().m(function _callee() {
    var _Promise$withResolver, promise, resolve, reject, result;
    return _regenerator2().w(function(_context) {
      while (1)
        switch (_context.n) {
          case 0:
            _Promise$withResolver = Promise.withResolvers(), promise = _Promise$withResolver.promise, resolve = _Promise$withResolver.resolve, reject = _Promise$withResolver.reject;
            setTimeout(function() {
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

// ../es-samples/samples/es2024/regexp-v-flag.js
import "core-js/modules/es.regexp.exec.js";
function demoRegExpVFlag() {
  var nonAlphaGreek = /^(?:[\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03B0\u03B2-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65]|\uD800[\uDD40-\uDD8E\uDDA0]|\uD834[\uDE00-\uDE45])+$/;
  var emojiFlagRegex = /^(?:🇦🇨|🇦🇩|🇦🇪|🇦🇫|🇦🇬|🇦🇮|🇦🇱|🇦🇲|🇦🇴|🇦🇶|🇦🇷|🇦🇸|🇦🇹|🇦🇺|🇦🇼|🇦🇽|🇦🇿|🇧🇦|🇧🇧|🇧🇩|🇧🇪|🇧🇫|🇧🇬|🇧🇭|🇧🇮|🇧🇯|🇧🇱|🇧🇲|🇧🇳|🇧🇴|🇧🇶|🇧🇷|🇧🇸|🇧🇹|🇧🇻|🇧🇼|🇧🇾|🇧🇿|🇨🇦|🇨🇨|🇨🇩|🇨🇫|🇨🇬|🇨🇭|🇨🇮|🇨🇰|🇨🇱|🇨🇲|🇨🇳|🇨🇴|🇨🇵|🇨🇶|🇨🇷|🇨🇺|🇨🇻|🇨🇼|🇨🇽|🇨🇾|🇨🇿|🇩🇪|🇩🇬|🇩🇯|🇩🇰|🇩🇲|🇩🇴|🇩🇿|🇪🇦|🇪🇨|🇪🇪|🇪🇬|🇪🇭|🇪🇷|🇪🇸|🇪🇹|🇪🇺|🇫🇮|🇫🇯|🇫🇰|🇫🇲|🇫🇴|🇫🇷|🇬🇦|🇬🇧|🇬🇩|🇬🇪|🇬🇫|🇬🇬|🇬🇭|🇬🇮|🇬🇱|🇬🇲|🇬🇳|🇬🇵|🇬🇶|🇬🇷|🇬🇸|🇬🇹|🇬🇺|🇬🇼|🇬🇾|🇭🇰|🇭🇲|🇭🇳|🇭🇷|🇭🇹|🇭🇺|🇮🇨|🇮🇩|🇮🇪|🇮🇱|🇮🇲|🇮🇳|🇮🇴|🇮🇶|🇮🇷|🇮🇸|🇮🇹|🇯🇪|🇯🇲|🇯🇴|🇯🇵|🇰🇪|🇰🇬|🇰🇭|🇰🇮|🇰🇲|🇰🇳|🇰🇵|🇰🇷|🇰🇼|🇰🇾|🇰🇿|🇱🇦|🇱🇧|🇱🇨|🇱🇮|🇱🇰|🇱🇷|🇱🇸|🇱🇹|🇱🇺|🇱🇻|🇱🇾|🇲🇦|🇲🇨|🇲🇩|🇲🇪|🇲🇫|🇲🇬|🇲🇭|🇲🇰|🇲🇱|🇲🇲|🇲🇳|🇲🇴|🇲🇵|🇲🇶|🇲🇷|🇲🇸|🇲🇹|🇲🇺|🇲🇻|🇲🇼|🇲🇽|🇲🇾|🇲🇿|🇳🇦|🇳🇨|🇳🇪|🇳🇫|🇳🇬|🇳🇮|🇳🇱|🇳🇴|🇳🇵|🇳🇷|🇳🇺|🇳🇿|🇴🇲|🇵🇦|🇵🇪|🇵🇫|🇵🇬|🇵🇭|🇵🇰|🇵🇱|🇵🇲|🇵🇳|🇵🇷|🇵🇸|🇵🇹|🇵🇼|🇵🇾|🇶🇦|🇷🇪|🇷🇴|🇷🇸|🇷🇺|🇷🇼|🇸🇦|🇸🇧|🇸🇨|🇸🇩|🇸🇪|🇸🇬|🇸🇭|🇸🇮|🇸🇯|🇸🇰|🇸🇱|🇸🇲|🇸🇳|🇸🇴|🇸🇷|🇸🇸|🇸🇹|🇸🇻|🇸🇽|🇸🇾|🇸🇿|🇹🇦|🇹🇨|🇹🇩|🇹🇫|🇹🇬|🇹🇭|🇹🇯|🇹🇰|🇹🇱|🇹🇲|🇹🇳|🇹🇴|🇹🇷|🇹🇹|🇹🇻|🇹🇼|🇹🇿|🇺🇦|🇺🇬|🇺🇲|🇺🇳|🇺🇸|🇺🇾|🇺🇿|🇻🇦|🇻🇨|🇻🇪|🇻🇬|🇻🇮|🇻🇳|🇻🇺|🇼🇫|🇼🇸|🇽🇰|🇾🇪|🇾🇹|🇿🇦|🇿🇲|🇿🇼)$/;
  return {
    matchesBeta: nonAlphaGreek.test("\u03B2"),
    // true (beta)
    matchesAlpha: nonAlphaGreek.test("\u03B1"),
    // false (alpha subtracted)
    matchesFlag: emojiFlagRegex.test("\u{1F1FA}\u{1F1F8}")
    // true
  };
}

// ../es-samples/samples/es2024/string-is-well-formed.js
function demoStringIsWellFormed() {
  var wellFormed = "Hello";
  var illFormed = "Hello \uD800";
  return {
    wellFormedCheck: wellFormed.isWellFormed(),
    illFormedCheck: illFormed.isWellFormed()
  };
}

// ../es-samples/samples/es2024/string-to-well-formed.js
function demoStringToWellFormed() {
  var illFormed = "Hello \uD800 World";
  return illFormed.toWellFormed();
}
export {
  demoArrayBufferResize,
  demoArrayBufferTransfer,
  demoAtomicsWaitAsync,
  demoMapGroupBy,
  demoObjectGroupBy,
  demoPromiseWithResolvers,
  demoRegExpVFlag,
  demoStringIsWellFormed,
  demoStringToWellFormed
};
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
//# sourceMappingURL=es2024_es5.js.101_1789571224577_607nk.tmp.map
