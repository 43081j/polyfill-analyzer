// ../es-samples/samples/es2015/array-find-index.js
import "core-js/modules/es.array.find-index.js";
function demoArrayFindIndex() {
  return [10, 20, 30, 40].findIndex(function(val) {
    return val > 25;
  });
}

// ../es-samples/samples/es2015/array-find.js
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.to-string.js";
function demoArrayFind() {
  return [10, 20, 30, 40].find(function(val) {
    return val > 25;
  });
}

// ../es-samples/samples/es2015/array-from.js
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
function demoArrayFrom() {
  return Array.from("ES6");
}

// ../es-samples/samples/es2015/array-of.js
import "core-js/modules/es.array.of.js";
function demoArrayOf() {
  return Array.of(1, 2, 3);
}

// ../es-samples/samples/es2015/arrow-functions.js
var add = function add2(a, b) {
  return a + b;
};
var createPoint = function createPoint2(x, y) {
  return {
    x,
    y
  };
};
var lexicalThisDemo = function lexicalThisDemo2() {
  var context = {
    value: 100,
    getValueLater: function getValueLater() {
      var _this = this;
      return function() {
        return _this.value;
      };
    }
  };
  return context.getValueLater()();
};

// ../es-samples/samples/es2015/classes.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.symbol.to-primitive.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.date.to-primitive.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e))
    return e;
  if (void 0 !== e)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf(t);
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
function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
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
var Animal = /* @__PURE__ */ function() {
  function Animal2(name) {
    _classCallCheck(this, Animal2);
    this.name = name;
  }
  return _createClass(Animal2, [{
    key: "speak",
    value: function speak() {
      return "".concat(this.name, " makes a noise.");
    }
  }], [{
    key: "isAnimal",
    value: function isAnimal(obj) {
      return obj instanceof Animal2;
    }
  }]);
}();
var Dog = /* @__PURE__ */ function(_Animal) {
  function Dog2(name, breed) {
    var _this;
    _classCallCheck(this, Dog2);
    _this = _callSuper(this, Dog2, [name]);
    _this.breed = breed;
    return _this;
  }
  _inherits(Dog2, _Animal);
  return _createClass(Dog2, [{
    key: "speak",
    value: function speak() {
      return "".concat(this.name, " barks.");
    }
  }]);
}(Animal);

// ../es-samples/samples/es2015/const-declarations.js
function demoConst() {
  var constantValue = 42;
  return constantValue;
}

// ../es-samples/samples/es2015/default-parameters.js
function demoDefaultParameters() {
  var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
  var b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 20;
  return a + b;
}

// ../es-samples/samples/es2015/destructuring.js
function demoDestructuring() {
  var user = {
    username: "alice",
    role: "admin",
    profile: {
      age: 30
    }
  };
  var _ref = [10, 20], first = _ref[0], second = _ref[1], _ref$ = _ref[2], third = _ref$ === void 0 ? 3 : _ref$;
  var username = user.username, userRole = user.role, age = user.profile.age, _user$missing = user.missing, missing = _user$missing === void 0 ? "default" : _user$missing;
  return {
    first,
    second,
    third,
    username,
    userRole,
    age,
    missing
  };
}

// ../es-samples/samples/es2015/enhanced-object-literals.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.symbol.to-primitive.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.date.to-primitive.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey2(t) {
  var i = _toPrimitive2(t, "string");
  return "symbol" == _typeof2(i) ? i : i + "";
}
function _toPrimitive2(t, r) {
  if ("object" != _typeof2(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof2(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function demoEnhancedObjectLiterals(id, name) {
  var dynamicKey = "status_" + id;
  return _defineProperty(_defineProperty({
    id,
    // property shorthand for id: id
    name
  }, dynamicKey, "active"), "getSummary", function getSummary() {
    return "".concat(this.name, " (").concat(this.id, ")");
  });
}

// ../es-samples/samples/es2015/generators.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
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
function demoGenerator() {
  var start = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
  var end = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
  return /* @__PURE__ */ _regenerator().m(function _callee() {
    var i;
    return _regenerator().w(function(_context) {
      while (1)
        switch (_context.n) {
          case 0:
            i = start;
          case 1:
            if (!(i <= end)) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return i * 10;
          case 2:
            i++;
            _context.n = 1;
            break;
          case 3:
            return _context.a(2);
        }
    }, _callee);
  })();
}

// ../es-samples/samples/es2015/iterators-and-for-of.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.symbol.to-primitive.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.date.to-primitive.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _typeof3(o) {
  "@babel/helpers - typeof";
  return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof3(o);
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0, F = function F2() {
      };
      return { s: F, n: function n() {
        return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
      }, e: function e2(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return { s: function s() {
    t = t.call(r);
  }, n: function n() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function e2(r2) {
    u = true, o = r2;
  }, f: function f() {
    try {
      a || null == t.return || t.return();
    } finally {
      if (u)
        throw o;
    }
  } };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r)
      return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++)
    n[e] = r[e];
  return n;
}
function _defineProperty2(e, r, t) {
  return (r = _toPropertyKey3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey3(t) {
  var i = _toPrimitive3(t, "string");
  return "symbol" == _typeof3(i) ? i : i + "";
}
function _toPrimitive3(t, r) {
  if ("object" != _typeof3(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof3(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function demoForOfAndIterators() {
  var iterableObject = _defineProperty2({}, Symbol.iterator, function() {
    var step = 0;
    return {
      next: function next() {
        step++;
        if (step <= 3) {
          return {
            value: "step-".concat(step),
            done: false
          };
        }
        return {
          value: void 0,
          done: true
        };
      }
    };
  });
  var results = [];
  var _iterator = _createForOfIteratorHelper(iterableObject), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var item = _step.value;
      results.push(item);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return results;
}

// ../es-samples/samples/es2015/let-declarations.js
function demoLet() {
  var blockScopedVar = "initial";
  if (true) {
    var _blockScopedVar = "shadowed inside block";
  }
  return blockScopedVar;
}

// ../es-samples/samples/es2015/map.js
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoMap() {
  var map = /* @__PURE__ */ new Map();
  var keyObj = {
    id: 1
  };
  map.set(keyObj, "metadata");
  return map.has(keyObj) && map.get(keyObj) === "metadata";
}

// ../es-samples/samples/es2015/math-sign.js
import "core-js/modules/es.math.sign.js";
function demoMathSign() {
  return {
    pos: Math.sign(5),
    neg: Math.sign(-5),
    zero: Math.sign(0)
  };
}

// ../es-samples/samples/es2015/math-trunc.js
import "core-js/modules/es.math.trunc.js";
function demoMathTrunc() {
  return Math.trunc(42.99);
}

// ../es-samples/samples/es2015/modules.js
var moduleFeatureDemo = "This variable is exported using ES2015 module syntax.";

// ../es-samples/samples/es2015/number-is-integer.js
import "core-js/modules/es.number.is-integer.js";
function demoNumberIsInteger() {
  return {
    isInt: Number.isInteger(42),
    isFloat: Number.isInteger(42.5)
  };
}

// ../es-samples/samples/es2015/number-is-nan.js
import "core-js/modules/es.number.is-nan.js";
function demoNumberIsNaN() {
  return {
    isNaNNumber: Number.isNaN(NaN),
    isNotNaNStr: Number.isNaN("NaN")
  };
}

// ../es-samples/samples/es2015/numeric-literals.js
function demoNumericLiterals() {
  var binaryValue = 10;
  var octalValue = 493;
  return {
    binaryValue,
    octalValue
  };
}

// ../es-samples/samples/es2015/object-assign.js
import "core-js/modules/es.object.assign.js";
function demoObjectAssign() {
  return Object.assign({}, {
    a: 1
  }, {
    b: 2
  });
}

// ../es-samples/samples/es2015/object-is.js
import "core-js/modules/es.object.is.js";
function demoObjectIs() {
  return {
    nanCheck: Object.is(NaN, NaN),
    zeroCheck: Object.is(0, -0)
  };
}

// ../es-samples/samples/es2015/promises.js
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
function demoPromise() {
  var shouldResolve = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
  return new Promise(function(resolve, reject) {
    if (shouldResolve) {
      resolve("Promise resolved successfully");
    } else {
      reject(new Error("Promise rejected"));
    }
  });
}

// ../es-samples/samples/es2015/proxy.js
function demoProxy() {
  var target = {
    message: "hello"
  };
  var proxy = new Proxy(target, {
    get: function get(obj, prop) {
      return prop in obj ? obj[prop].toUpperCase() : "default";
    }
  });
  return proxy.message;
}

// ../es-samples/samples/es2015/reflect.js
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.reflect.set.js";
function demoReflect() {
  var obj = {
    a: 1
  };
  Reflect.set(obj, "b", 2);
  return Reflect.get(obj, "b");
}

// ../es-samples/samples/es2015/rest-parameters.js
function demoRestParameters(first) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }
  return {
    first,
    rest
  };
}

// ../es-samples/samples/es2015/set.js
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoSet() {
  var set = /* @__PURE__ */ new Set([1, 2, 2, 3]);
  return set.size === 3 && set.has(2);
}

// ../es-samples/samples/es2015/spread-syntax.js
import "core-js/modules/es.array.concat.js";
function demoSpreadSyntax() {
  var parts = [2, 3];
  return [1].concat(parts, [4]);
}

// ../es-samples/samples/es2015/string-ends-with.js
import "core-js/modules/es.string.ends-with.js";
function demoStringEndsWith() {
  return "ECMAScript".endsWith("Script");
}

// ../es-samples/samples/es2015/string-includes.js
import "core-js/modules/es.string.includes.js";
function demoStringIncludes() {
  return "ECMAScript".includes("Script");
}

// ../es-samples/samples/es2015/string-repeat.js
import "core-js/modules/es.string.repeat.js";
function demoStringRepeat() {
  return "abc".repeat(3);
}

// ../es-samples/samples/es2015/string-starts-with.js
import "core-js/modules/es.string.starts-with.js";
function demoStringStartsWith() {
  return "ECMAScript".startsWith("ECMA");
}

// ../es-samples/samples/es2015/symbols.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.symbol.to-primitive.js";
import "core-js/modules/es.symbol.to-string-tag.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.date.to-primitive.js";
import "core-js/modules/es.json.to-string-tag.js";
import "core-js/modules/es.math.to-string-tag.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _typeof4(o) {
  "@babel/helpers - typeof";
  return _typeof4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof4(o);
}
function _defineProperty3(e, r, t) {
  return (r = _toPropertyKey4(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey4(t) {
  var i = _toPrimitive4(t, "string");
  return "symbol" == _typeof4(i) ? i : i + "";
}
function _toPrimitive4(t, r) {
  if ("object" != _typeof4(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof4(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function demoSymbols() {
  var sym1 = Symbol("description");
  var sym2 = Symbol("description");
  var obj = _defineProperty3(_defineProperty3({}, sym1, "secret value"), Symbol.toStringTag, "CustomObject");
  return {
    areSymbolsEqual: sym1 === sym2,
    symbolPropertyValue: obj[sym1],
    toStringTag: Object.prototype.toString.call(obj)
  };
}

// ../es-samples/samples/es2015/template-literals.js
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
import "core-js/modules/es.object.to-string.js";
var _templateObject;
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
function demoTemplateLiterals() {
  var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "World";
  var count = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
  var basicTemplate = "Hello, ".concat(name, "! You have ").concat(count, " notifications.");
  function highlight(strings) {
    for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }
    return strings.reduce(function(acc, str, i) {
      var val = values[i] !== void 0 ? "[".concat(values[i], "]") : "";
      return acc + str + val;
    }, "");
  }
  var taggedResult = highlight(_templateObject || (_templateObject = _taggedTemplateLiteral(["User ", " has ", " items."])), name, count);
  return {
    basicTemplate,
    taggedResult
  };
}

// ../es-samples/samples/es2015/weak-map.js
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoWeakMap() {
  var weakMap = /* @__PURE__ */ new WeakMap();
  var key = {
    name: "temp"
  };
  weakMap.set(key, "data");
  return weakMap.has(key);
}

// ../es-samples/samples/es2015/weak-set.js
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-set.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoWeakSet() {
  var weakSet = /* @__PURE__ */ new WeakSet();
  var obj = {
    name: "temp"
  };
  weakSet.add(obj);
  return weakSet.has(obj);
}
export {
  Animal,
  Dog,
  add,
  createPoint,
  demoArrayFind,
  demoArrayFindIndex,
  demoArrayFrom,
  demoArrayOf,
  demoConst,
  demoDefaultParameters,
  demoDestructuring,
  demoEnhancedObjectLiterals,
  demoForOfAndIterators,
  demoGenerator,
  demoLet,
  demoMap,
  demoMathSign,
  demoMathTrunc,
  demoNumberIsInteger,
  demoNumberIsNaN,
  demoNumericLiterals,
  demoObjectAssign,
  demoObjectIs,
  demoPromise,
  demoProxy,
  demoReflect,
  demoRestParameters,
  demoSet,
  demoSpreadSyntax,
  demoStringEndsWith,
  demoStringIncludes,
  demoStringRepeat,
  demoStringStartsWith,
  demoSymbols,
  demoTemplateLiterals,
  demoWeakMap,
  demoWeakSet,
  lexicalThisDemo,
  moduleFeatureDemo
};
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
//# sourceMappingURL=es2015_es5.js.101_1789571202046_7on88.tmp.map
