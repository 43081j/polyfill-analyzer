// ../es-samples/samples/es2018/async-iteration.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.async-iterator.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
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
function _asyncIterator(r) {
  var n, t, o, e = 2;
  for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--; ) {
    if (t && null != (n = r[t]))
      return n.call(r);
    if (o && null != (n = r[o]))
      return new AsyncFromSyncIterator(n.call(r));
    t = "@@asyncIterator", o = "@@iterator";
  }
  throw new TypeError("Object is not async iterable");
}
function AsyncFromSyncIterator(r) {
  function AsyncFromSyncIteratorContinuation(r2) {
    if (Object(r2) !== r2)
      return Promise.reject(new TypeError(r2 + " is not an object."));
    var n = r2.done;
    return Promise.resolve(r2.value).then(function(r3) {
      return { value: r3, done: n };
    });
  }
  return AsyncFromSyncIterator = function AsyncFromSyncIterator2(r2) {
    this.s = r2, this.n = r2.next;
  }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() {
    return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
  }, return: function _return(r2) {
    var n = this.s.return;
    return void 0 === n ? Promise.resolve({ value: r2, done: true }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
  }, throw: function _throw(r2) {
    var n = this.s.return;
    return void 0 === n ? Promise.reject(r2) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
  } }, new AsyncFromSyncIterator(r);
}
function _awaitAsyncGenerator(e) {
  return new _OverloadYield(e, 0);
}
function _wrapAsyncGenerator(e) {
  return function() {
    return new AsyncGenerator(e.apply(this, arguments));
  };
}
function AsyncGenerator(e) {
  var t, n;
  function resume(t2, n2) {
    try {
      var r = e[t2](n2), o = r.value, u = o instanceof _OverloadYield;
      Promise.resolve(u ? o.v : o).then(function(n3) {
        if (u) {
          var i = "return" === t2 && o.k ? t2 : "next";
          if (!o.k || n3.done)
            return resume(i, n3);
          n3 = e[i](n3).value;
        }
        settle(!!r.done, n3);
      }, function(e2) {
        resume("throw", e2);
      });
    } catch (e2) {
      settle(2, e2);
    }
  }
  function settle(e2, r) {
    2 === e2 ? t.reject(r) : t.resolve({ value: r, done: e2 }), (t = t.next) ? resume(t.key, t.arg) : n = null;
  }
  this._invoke = function(e2, r) {
    return new Promise(function(o, u) {
      var i = { key: e2, arg: r, resolve: o, reject: u, next: null };
      n ? n = n.next = i : (t = n = i, resume(e2, r));
    });
  }, "function" != typeof e.return && (this.return = void 0);
}
AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
  return this;
}, AsyncGenerator.prototype.next = function(e) {
  return this._invoke("next", e);
}, AsyncGenerator.prototype.throw = function(e) {
  return this._invoke("throw", e);
}, AsyncGenerator.prototype.return = function(e) {
  return this._invoke("return", e);
};
function _OverloadYield(e, d) {
  this.v = e, this.k = d;
}
function demoAsyncGenerator() {
  return _demoAsyncGenerator.apply(this, arguments);
}
function _demoAsyncGenerator() {
  _demoAsyncGenerator = _wrapAsyncGenerator(/* @__PURE__ */ _regenerator().m(function _callee() {
    var data, _i, _data, item;
    return _regenerator().w(function(_context) {
      while (1)
        switch (_context.n) {
          case 0:
            data = ["first", "second", "third"];
            _i = 0, _data = data;
          case 1:
            if (!(_i < _data.length)) {
              _context.n = 4;
              break;
            }
            item = _data[_i];
            _context.n = 2;
            return _awaitAsyncGenerator(new Promise(function(resolve) {
              return setTimeout(resolve, 5);
            }));
          case 2:
            _context.n = 3;
            return item.toUpperCase();
          case 3:
            _i++;
            _context.n = 1;
            break;
          case 4:
            return _context.a(2);
        }
    }, _callee);
  }));
  return _demoAsyncGenerator.apply(this, arguments);
}
function demoAsyncIteration() {
  return _demoAsyncIteration.apply(this, arguments);
}
function _demoAsyncIteration() {
  _demoAsyncIteration = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee2() {
    var results, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, val, _t;
    return _regenerator().w(function(_context2) {
      while (1)
        switch (_context2.p = _context2.n) {
          case 0:
            results = [];
            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context2.p = 1;
            _iterator = _asyncIterator(demoAsyncGenerator());
          case 2:
            _context2.n = 3;
            return _iterator.next();
          case 3:
            if (!(_iteratorAbruptCompletion = !(_step = _context2.v).done)) {
              _context2.n = 5;
              break;
            }
            val = _step.value;
            results.push(val);
          case 4:
            _iteratorAbruptCompletion = false;
            _context2.n = 2;
            break;
          case 5:
            _context2.n = 7;
            break;
          case 6:
            _context2.p = 6;
            _t = _context2.v;
            _didIteratorError = true;
            _iteratorError = _t;
          case 7:
            _context2.p = 7;
            _context2.p = 8;
            if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
              _context2.n = 9;
              break;
            }
            _context2.n = 9;
            return _iterator.return();
          case 9:
            _context2.p = 9;
            if (!_didIteratorError) {
              _context2.n = 10;
              break;
            }
            throw _iteratorError;
          case 10:
            return _context2.f(9);
          case 11:
            return _context2.f(7);
          case 12:
            return _context2.a(2, results);
        }
    }, _callee2, null, [[8, , 9, 11], [1, 6, 7, 12]]);
  }));
  return _demoAsyncIteration.apply(this, arguments);
}

// ../es-samples/samples/es2018/object-rest-spread.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.symbol.to-primitive.js";
import "core-js/modules/es.date.to-primitive.js";
import "core-js/modules/es.number.constructor.js";
var _excluded = ["host"];
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _objectWithoutProperties(e, t) {
  if (null == e)
    return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++)
      o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r)
    return {};
  var t = {};
  for (var n in r)
    if ({}.hasOwnProperty.call(r, n)) {
      if (-1 !== e.indexOf(n))
        continue;
      t[n] = r[n];
    }
  return t;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function demoObjectRestSpread() {
  var defaults = {
    host: "localhost",
    port: 8080,
    secure: false
  };
  var userConfig = {
    port: 3e3,
    secure: true
  };
  var merged = _objectSpread(_objectSpread({}, defaults), userConfig);
  var host = merged.host, remainingConfig = _objectWithoutProperties(merged, _excluded);
  return {
    merged,
    host,
    remainingConfig
  };
}

// ../es-samples/samples/es2018/promise-finally.js
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.promise.finally.js";
function demoPromiseFinally() {
  var cleanupRun = false;
  return new Promise(function(resolve) {
    resolve("success");
  }).finally(function() {
    cleanupRun = true;
  }).then(function(res) {
    return {
      result: res,
      cleanupRun
    };
  });
}

// ../es-samples/samples/es2018/regexp-dot-all-flag.js
import "core-js/modules/es.regexp.exec.js";
function demoDotAllFlag() {
  var text = "first line\nsecond line";
  var withoutDotAll = /first line.second line/.test(text);
  var withDotAll = /first line[^]second line/.test(text);
  return {
    withoutDotAll,
    withDotAll
  };
}

// ../es-samples/samples/es2018/regexp-lookbehind-assertions.js
import "core-js/modules/es.regexp.exec.js";
function demoLookbehindAssertions() {
  var positiveLookbehind = /(?<=\$)\d+/;
  var negativeLookbehind = /(?<!\$)\b\d+/;
  var price = positiveLookbehind.exec("Cost is $100");
  var quantity = negativeLookbehind.exec("Bought 50 items");
  return {
    price: price[0],
    quantity: quantity[0]
  };
}

// ../es-samples/samples/es2018/regexp-named-capture-groups.js
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
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
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
        return "object" != _typeof2(e2[e2.length - 1]) && (e2 = [].slice.call(e2)).push(buildGroups(e2, i)), p.apply(this, e2);
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
function demoNamedCaptureGroups() {
  var regex = /* @__PURE__ */ _wrapRegExp(/(\d{4})-(\d{2})-(\d{2})/, {
    year: 1,
    month: 2,
    day: 3
  });
  var match = regex.exec("2018-06-15");
  return {
    year: match.groups.year,
    month: match.groups.month,
    day: match.groups.day
  };
}

// ../es-samples/samples/es2018/regexp-unicode-property-escapes.js
import "core-js/modules/es.regexp.exec.js";
function demoUnicodePropertyEscapes() {
  var greekRegex = /^(?:[\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65]|\uD800[\uDD40-\uDD8E\uDDA0]|\uD834[\uDE00-\uDE45])+$/;
  var emojiRegex = /(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED8\uDEDC-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8])/;
  return {
    isGreek: greekRegex.test("\u03A7\u03B1\u03AF\u03C1\u03B5\u03C4\u03B5"),
    hasEmoji: emojiRegex.test("Hello \u{1F30D}")
  };
}

// ../es-samples/samples/es2018/template-literal-revision.js
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
var _templateObject;
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function demoTemplateLiteralRevision() {
  function tag(strings) {
    return {
      cooked: strings[0],
      raw: strings.raw[0]
    };
  }
  return tag(_templateObject || (_templateObject = _taggedTemplateLiteral([void 0], ["\\unicode and \\u{54}"])));
}
export {
  demoAsyncGenerator,
  demoAsyncIteration,
  demoDotAllFlag,
  demoLookbehindAssertions,
  demoNamedCaptureGroups,
  demoObjectRestSpread,
  demoPromiseFinally,
  demoTemplateLiteralRevision,
  demoUnicodePropertyEscapes
};
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
//# sourceMappingURL=es2018_es5.js.101_1789571208290_cui76.tmp.map
