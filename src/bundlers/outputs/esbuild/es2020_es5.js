var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../es-samples/samples/es2015/array-find-index.js
import "core-js/modules/es.array.find-index.js";
function demoArrayFindIndex() {
  return [10, 20, 30, 40].findIndex(function(val) {
    return val > 25;
  });
}
var init_array_find_index = __esm({
  "../es-samples/samples/es2015/array-find-index.js"() {
  }
});

// ../es-samples/samples/es2015/array-find.js
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.to-string.js";
function demoArrayFind() {
  return [10, 20, 30, 40].find(function(val) {
    return val > 25;
  });
}
var init_array_find = __esm({
  "../es-samples/samples/es2015/array-find.js"() {
  }
});

// ../es-samples/samples/es2015/array-from.js
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
function demoArrayFrom() {
  return Array.from("ES6");
}
var init_array_from = __esm({
  "../es-samples/samples/es2015/array-from.js"() {
  }
});

// ../es-samples/samples/es2015/array-of.js
import "core-js/modules/es.array.of.js";
function demoArrayOf() {
  return Array.of(1, 2, 3);
}
var init_array_of = __esm({
  "../es-samples/samples/es2015/array-of.js"() {
  }
});

// ../es-samples/samples/es2015/arrow-functions.js
var add, createPoint, lexicalThisDemo;
var init_arrow_functions = __esm({
  "../es-samples/samples/es2015/arrow-functions.js"() {
    add = function add2(a, b) {
      return a + b;
    };
    createPoint = function createPoint2(x, y) {
      return {
        x,
        y
      };
    };
    lexicalThisDemo = function lexicalThisDemo2() {
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
  }
});

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
var Animal, Dog;
var init_classes = __esm({
  "../es-samples/samples/es2015/classes.js"() {
    Animal = /* @__PURE__ */ function() {
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
    Dog = /* @__PURE__ */ function(_Animal) {
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
  }
});

// ../es-samples/samples/es2015/const-declarations.js
function demoConst() {
  var constantValue = 42;
  return constantValue;
}
var init_const_declarations = __esm({
  "../es-samples/samples/es2015/const-declarations.js"() {
  }
});

// ../es-samples/samples/es2015/default-parameters.js
function demoDefaultParameters() {
  var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
  var b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 20;
  return a + b;
}
var init_default_parameters = __esm({
  "../es-samples/samples/es2015/default-parameters.js"() {
  }
});

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
var init_destructuring = __esm({
  "../es-samples/samples/es2015/destructuring.js"() {
  }
});

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
var init_enhanced_object_literals = __esm({
  "../es-samples/samples/es2015/enhanced-object-literals.js"() {
  }
});

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
var init_generators = __esm({
  "../es-samples/samples/es2015/generators.js"() {
  }
});

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
var init_iterators_and_for_of = __esm({
  "../es-samples/samples/es2015/iterators-and-for-of.js"() {
  }
});

// ../es-samples/samples/es2015/let-declarations.js
function demoLet() {
  var blockScopedVar = "initial";
  if (true) {
    var _blockScopedVar = "shadowed inside block";
  }
  return blockScopedVar;
}
var init_let_declarations = __esm({
  "../es-samples/samples/es2015/let-declarations.js"() {
  }
});

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
var init_map = __esm({
  "../es-samples/samples/es2015/map.js"() {
  }
});

// ../es-samples/samples/es2015/math-sign.js
import "core-js/modules/es.math.sign.js";
function demoMathSign() {
  return {
    pos: Math.sign(5),
    neg: Math.sign(-5),
    zero: Math.sign(0)
  };
}
var init_math_sign = __esm({
  "../es-samples/samples/es2015/math-sign.js"() {
  }
});

// ../es-samples/samples/es2015/math-trunc.js
import "core-js/modules/es.math.trunc.js";
function demoMathTrunc() {
  return Math.trunc(42.99);
}
var init_math_trunc = __esm({
  "../es-samples/samples/es2015/math-trunc.js"() {
  }
});

// ../es-samples/samples/es2015/modules.js
var moduleFeatureDemo;
var init_modules = __esm({
  "../es-samples/samples/es2015/modules.js"() {
    moduleFeatureDemo = "This variable is exported using ES2015 module syntax.";
  }
});

// ../es-samples/samples/es2015/number-is-integer.js
import "core-js/modules/es.number.is-integer.js";
function demoNumberIsInteger() {
  return {
    isInt: Number.isInteger(42),
    isFloat: Number.isInteger(42.5)
  };
}
var init_number_is_integer = __esm({
  "../es-samples/samples/es2015/number-is-integer.js"() {
  }
});

// ../es-samples/samples/es2015/number-is-nan.js
import "core-js/modules/es.number.is-nan.js";
function demoNumberIsNaN() {
  return {
    isNaNNumber: Number.isNaN(NaN),
    isNotNaNStr: Number.isNaN("NaN")
  };
}
var init_number_is_nan = __esm({
  "../es-samples/samples/es2015/number-is-nan.js"() {
  }
});

// ../es-samples/samples/es2015/numeric-literals.js
function demoNumericLiterals() {
  var binaryValue = 10;
  var octalValue = 493;
  return {
    binaryValue,
    octalValue
  };
}
var init_numeric_literals = __esm({
  "../es-samples/samples/es2015/numeric-literals.js"() {
  }
});

// ../es-samples/samples/es2015/object-assign.js
import "core-js/modules/es.object.assign.js";
function demoObjectAssign() {
  return Object.assign({}, {
    a: 1
  }, {
    b: 2
  });
}
var init_object_assign = __esm({
  "../es-samples/samples/es2015/object-assign.js"() {
  }
});

// ../es-samples/samples/es2015/object-is.js
import "core-js/modules/es.object.is.js";
function demoObjectIs() {
  return {
    nanCheck: Object.is(NaN, NaN),
    zeroCheck: Object.is(0, -0)
  };
}
var init_object_is = __esm({
  "../es-samples/samples/es2015/object-is.js"() {
  }
});

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
var init_promises = __esm({
  "../es-samples/samples/es2015/promises.js"() {
  }
});

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
var init_proxy = __esm({
  "../es-samples/samples/es2015/proxy.js"() {
  }
});

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
var init_reflect = __esm({
  "../es-samples/samples/es2015/reflect.js"() {
  }
});

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
var init_rest_parameters = __esm({
  "../es-samples/samples/es2015/rest-parameters.js"() {
  }
});

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
var init_set = __esm({
  "../es-samples/samples/es2015/set.js"() {
  }
});

// ../es-samples/samples/es2015/spread-syntax.js
import "core-js/modules/es.array.concat.js";
function demoSpreadSyntax() {
  var parts = [2, 3];
  return [1].concat(parts, [4]);
}
var init_spread_syntax = __esm({
  "../es-samples/samples/es2015/spread-syntax.js"() {
  }
});

// ../es-samples/samples/es2015/string-ends-with.js
import "core-js/modules/es.string.ends-with.js";
function demoStringEndsWith() {
  return "ECMAScript".endsWith("Script");
}
var init_string_ends_with = __esm({
  "../es-samples/samples/es2015/string-ends-with.js"() {
  }
});

// ../es-samples/samples/es2015/string-includes.js
import "core-js/modules/es.string.includes.js";
function demoStringIncludes() {
  return "ECMAScript".includes("Script");
}
var init_string_includes = __esm({
  "../es-samples/samples/es2015/string-includes.js"() {
  }
});

// ../es-samples/samples/es2015/string-repeat.js
import "core-js/modules/es.string.repeat.js";
function demoStringRepeat() {
  return "abc".repeat(3);
}
var init_string_repeat = __esm({
  "../es-samples/samples/es2015/string-repeat.js"() {
  }
});

// ../es-samples/samples/es2015/string-starts-with.js
import "core-js/modules/es.string.starts-with.js";
function demoStringStartsWith() {
  return "ECMAScript".startsWith("ECMA");
}
var init_string_starts_with = __esm({
  "../es-samples/samples/es2015/string-starts-with.js"() {
  }
});

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
var init_symbols = __esm({
  "../es-samples/samples/es2015/symbols.js"() {
  }
});

// ../es-samples/samples/es2015/template-literals.js
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
import "core-js/modules/es.object.to-string.js";
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
var _templateObject;
var init_template_literals = __esm({
  "../es-samples/samples/es2015/template-literals.js"() {
  }
});

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
var init_weak_map = __esm({
  "../es-samples/samples/es2015/weak-map.js"() {
  }
});

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
var init_weak_set = __esm({
  "../es-samples/samples/es2015/weak-set.js"() {
  }
});

// ../es-samples/samples/es2015.js
var es2015_exports = {};
__export(es2015_exports, {
  Animal: () => Animal,
  Dog: () => Dog,
  add: () => add,
  createPoint: () => createPoint,
  demoArrayFind: () => demoArrayFind,
  demoArrayFindIndex: () => demoArrayFindIndex,
  demoArrayFrom: () => demoArrayFrom,
  demoArrayOf: () => demoArrayOf,
  demoConst: () => demoConst,
  demoDefaultParameters: () => demoDefaultParameters,
  demoDestructuring: () => demoDestructuring,
  demoEnhancedObjectLiterals: () => demoEnhancedObjectLiterals,
  demoForOfAndIterators: () => demoForOfAndIterators,
  demoGenerator: () => demoGenerator,
  demoLet: () => demoLet,
  demoMap: () => demoMap,
  demoMathSign: () => demoMathSign,
  demoMathTrunc: () => demoMathTrunc,
  demoNumberIsInteger: () => demoNumberIsInteger,
  demoNumberIsNaN: () => demoNumberIsNaN,
  demoNumericLiterals: () => demoNumericLiterals,
  demoObjectAssign: () => demoObjectAssign,
  demoObjectIs: () => demoObjectIs,
  demoPromise: () => demoPromise,
  demoProxy: () => demoProxy,
  demoReflect: () => demoReflect,
  demoRestParameters: () => demoRestParameters,
  demoSet: () => demoSet,
  demoSpreadSyntax: () => demoSpreadSyntax,
  demoStringEndsWith: () => demoStringEndsWith,
  demoStringIncludes: () => demoStringIncludes,
  demoStringRepeat: () => demoStringRepeat,
  demoStringStartsWith: () => demoStringStartsWith,
  demoSymbols: () => demoSymbols,
  demoTemplateLiterals: () => demoTemplateLiterals,
  demoWeakMap: () => demoWeakMap,
  demoWeakSet: () => demoWeakSet,
  lexicalThisDemo: () => lexicalThisDemo,
  moduleFeatureDemo: () => moduleFeatureDemo
});
var init_es2015 = __esm({
  "../es-samples/samples/es2015.js"() {
    init_array_find_index();
    init_array_find();
    init_array_from();
    init_array_of();
    init_arrow_functions();
    init_classes();
    init_const_declarations();
    init_default_parameters();
    init_destructuring();
    init_enhanced_object_literals();
    init_generators();
    init_iterators_and_for_of();
    init_let_declarations();
    init_map();
    init_math_sign();
    init_math_trunc();
    init_modules();
    init_number_is_integer();
    init_number_is_nan();
    init_numeric_literals();
    init_object_assign();
    init_object_is();
    init_promises();
    init_proxy();
    init_reflect();
    init_rest_parameters();
    init_set();
    init_spread_syntax();
    init_string_ends_with();
    init_string_includes();
    init_string_repeat();
    init_string_starts_with();
    init_symbols();
    init_template_literals();
    init_weak_map();
    init_weak_set();
  }
});

// ../es-samples/samples/es2020/bigint.js
import "core-js/modules/es.number.max-safe-integer.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
function demoBigInt() {
  var maxSafe = BigInt(Number.MAX_SAFE_INTEGER);
  var largeInteger = 9007199254740991n + 10n;
  var product = largeInteger * 2n;
  return {
    largeIntegerString: largeInteger.toString(),
    productString: product.toString(),
    isBigInt: typeof largeInteger === "bigint"
  };
}

// ../es-samples/samples/es2020/dynamic-import.js
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
function demoDynamicImport() {
  return _demoDynamicImport.apply(this, arguments);
}
function _demoDynamicImport() {
  _demoDynamicImport = _asyncToGenerator(/* @__PURE__ */ _regenerator2().m(function _callee() {
    var es2015Module;
    return _regenerator2().w(function(_context) {
      while (1)
        switch (_context.n) {
          case 0:
            _context.n = 1;
            return Promise.resolve().then(() => (init_es2015(), es2015_exports));
          case 1:
            es2015Module = _context.v;
            return _context.a(2, typeof es2015Module.add === "function");
        }
    }, _callee);
  }));
  return _demoDynamicImport.apply(this, arguments);
}

// ../es-samples/samples/es2020/global-this.js
import "core-js/modules/esnext.global-this.js";
function demoGlobalThis() {
  return typeof globalThis !== "undefined" && globalThis === Object(globalThis);
}

// ../es-samples/samples/es2020/import-meta.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _typeof5(o) {
  "@babel/helpers - typeof";
  return _typeof5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof5(o);
}
function demoImportMeta() {
  return _typeof5(import.meta) === "object" && typeof import.meta.url === "string";
}

// ../es-samples/samples/es2020/namespace-exports.js
init_es2015();

// ../es-samples/samples/es2020/nullish-coalescing.js
function demoNullishCoalescing() {
  var count = 0;
  var text = "";
  var missing = null;
  return {
    countResult: count !== null && count !== void 0 ? count : 10,
    // 0 (whereas count || 10 is 10)
    textResult: text !== null && text !== void 0 ? text : "default",
    // "" (whereas text || "default" is "default")
    missingResult: missing !== null && missing !== void 0 ? missing : "N/A"
    // "N/A"
  };
}

// ../es-samples/samples/es2020/optional-chaining.js
function demoOptionalChaining(user) {
  var _user$address, _user$address2, _user$address2$getZip, _user$orders;
  var street = user === null || user === void 0 || (_user$address = user.address) === null || _user$address === void 0 ? void 0 : _user$address.street;
  var zipCode = user === null || user === void 0 || (_user$address2 = user.address) === null || _user$address2 === void 0 || (_user$address2$getZip = _user$address2.getZipCode) === null || _user$address2$getZip === void 0 ? void 0 : _user$address2$getZip.call(_user$address2);
  var firstItem = user === null || user === void 0 || (_user$orders = user.orders) === null || _user$orders === void 0 ? void 0 : _user$orders[0];
  return {
    street,
    zipCode,
    firstItem
  };
}

// ../es-samples/samples/es2020/promise-all-settled.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/esnext.promise.all-settled.js";
import "core-js/modules/web.dom-collections.iterator.js";
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
function demoPromiseAllSettled() {
  return _demoPromiseAllSettled.apply(this, arguments);
}
function _demoPromiseAllSettled() {
  _demoPromiseAllSettled = _asyncToGenerator2(/* @__PURE__ */ _regenerator3().m(function _callee() {
    var promises, results;
    return _regenerator3().w(function(_context) {
      while (1)
        switch (_context.n) {
          case 0:
            promises = [Promise.resolve("Success 1"), Promise.reject("Error 1"), Promise.resolve("Success 2")];
            _context.n = 1;
            return Promise.allSettled(promises);
          case 1:
            results = _context.v;
            return _context.a(2, results);
        }
    }, _callee);
  }));
  return _demoPromiseAllSettled.apply(this, arguments);
}

// ../es-samples/samples/es2020/string-match-all.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/esnext.string.match-all.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray2(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(r, a) {
  if (r) {
    if ("string" == typeof r)
      return _arrayLikeToArray2(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray2(r, a) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"])
    return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r))
    return _arrayLikeToArray2(r);
}
function _arrayLikeToArray2(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++)
    n[e] = r[e];
  return n;
}
function demoMatchAll() {
  var regex = /test(\d+)/g;
  var str = "test1 and test2 and test3";
  var matches = _toConsumableArray(str.matchAll(regex));
  return matches.map(function(m) {
    return {
      fullMatch: m[0],
      group: m[1],
      index: m.index
    };
  });
}
export {
  demoBigInt,
  demoDynamicImport,
  demoGlobalThis,
  demoImportMeta,
  demoMatchAll,
  demoNullishCoalescing,
  demoOptionalChaining,
  demoPromiseAllSettled,
  es2015_exports as es2015Namespace
};
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
//# sourceMappingURL=es2020_es5.js.101_1789571213401_pwgm1.tmp.map
