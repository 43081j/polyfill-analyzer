/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_require__ = {};
/******/ })();
"use strict";

require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.test.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.demoBigInt = demoBigInt;
exports.demoDynamicImport = demoDynamicImport;
exports.demoGlobalThis = demoGlobalThis;
exports.demoImportMeta = demoImportMeta;
exports.demoMatchAll = demoMatchAll;
exports.demoNullishCoalescing = demoNullishCoalescing;
exports.demoOptionalChaining = demoOptionalChaining;
exports.demoPromiseAllSettled = demoPromiseAllSettled;
exports.es2015Namespace = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-string-tag.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.of.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.global-this.js");
require("core-js/modules/es.json.to-string-tag.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.math.sign.js");
require("core-js/modules/es.math.to-string-tag.js");
require("core-js/modules/es.math.trunc.js");
require("core-js/modules/es.number.is-integer.js");
require("core-js/modules/es.number.is-nan.js");
require("core-js/modules/es.number.max-safe-integer.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-names.js");
require("core-js/modules/es.object.is.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.all-settled.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.reflect.set.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.set.difference.v2.js");
require("core-js/modules/es.set.intersection.v2.js");
require("core-js/modules/es.set.is-disjoint-from.v2.js");
require("core-js/modules/es.set.is-subset-of.v2.js");
require("core-js/modules/es.set.is-superset-of.v2.js");
require("core-js/modules/es.set.symmetric-difference.v2.js");
require("core-js/modules/es.set.union.v2.js");
require("core-js/modules/es.string.ends-with.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.match-all.js");
require("core-js/modules/es.string.repeat.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/es.weak-set.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/esnext.iterator.reduce.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _templateObject;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = function __esm(fn, res) {
  return function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
};
var __export = function __export(target, all) {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};

// ../es-samples/samples/es2015/array-find-index.js
function _demoArrayFindIndex() {
  return [10, 20, 30, 40].findIndex(function (val) {
    return val > 25;
  });
}
var init_array_find_index = __esm({
  "../es-samples/samples/es2015/array-find-index.js": function _esSamples_samples_es2015_arrayFindIndexJs() {}
});

// ../es-samples/samples/es2015/array-find.js
function _demoArrayFind() {
  return [10, 20, 30, 40].find(function (val) {
    return val > 25;
  });
}
var init_array_find = __esm({
  "../es-samples/samples/es2015/array-find.js": function _esSamples_samples_es2015_arrayFindJs() {}
});

// ../es-samples/samples/es2015/array-from.js
function _demoArrayFrom() {
  return Array.from("ES6");
}
var init_array_from = __esm({
  "../es-samples/samples/es2015/array-from.js": function _esSamples_samples_es2015_arrayFromJs() {}
});

// ../es-samples/samples/es2015/array-of.js
function _demoArrayOf() {
  return Array.of(1, 2, 3);
}
var init_array_of = __esm({
  "../es-samples/samples/es2015/array-of.js": function _esSamples_samples_es2015_arrayOfJs() {}
});

// ../es-samples/samples/es2015/arrow-functions.js
var _add, _createPoint, _lexicalThisDemo;
var init_arrow_functions = __esm({
  "../es-samples/samples/es2015/arrow-functions.js": function _esSamples_samples_es2015_arrowFunctionsJs() {
    _add = function add(a, b) {
      return a + b;
    };
    _createPoint = function createPoint(x, y) {
      return {
        x: x,
        y: y
      };
    };
    _lexicalThisDemo = function lexicalThisDemo() {
      var context = {
        value: 100,
        getValueLater: function getValueLater() {
          var _this = this;
          return function () {
            return _this.value;
          };
        }
      };
      return context.getValueLater()();
    };
  }
});

// ../es-samples/samples/es2015/classes.js
var _Animal3, _Dog;
var init_classes = __esm({
  "../es-samples/samples/es2015/classes.js": function _esSamples_samples_es2015_classesJs() {
    _Animal3 = /*#__PURE__*/function () {
      function _Animal(name) {
        _classCallCheck(this, _Animal);
        this.name = name;
      }
      return _createClass(_Animal, [{
        key: "speak",
        value: function speak() {
          return "".concat(this.name, " makes a noise.");
        }
      }], [{
        key: "isAnimal",
        value: function isAnimal(obj) {
          return obj instanceof _Animal;
        }
      }]);
    }();
    _Dog = /*#__PURE__*/function (_Animal2) {
      function Dog(name, breed) {
        var _this2;
        _classCallCheck(this, Dog);
        _this2 = _callSuper(this, Dog, [name]);
        _this2.breed = breed;
        return _this2;
      }
      _inherits(Dog, _Animal2);
      return _createClass(Dog, [{
        key: "speak",
        value: function speak() {
          return "".concat(this.name, " barks.");
        }
      }]);
    }(_Animal3);
  }
});

// ../es-samples/samples/es2015/const-declarations.js
function _demoConst() {
  var constantValue = 42;
  return constantValue;
}
var init_const_declarations = __esm({
  "../es-samples/samples/es2015/const-declarations.js": function _esSamples_samples_es2015_constDeclarationsJs() {}
});

// ../es-samples/samples/es2015/default-parameters.js
function _demoDefaultParameters() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  return a + b;
}
var init_default_parameters = __esm({
  "../es-samples/samples/es2015/default-parameters.js": function _esSamples_samples_es2015_defaultParametersJs() {}
});

// ../es-samples/samples/es2015/destructuring.js
function _demoDestructuring() {
  var user = {
    username: "alice",
    role: "admin",
    profile: {
      age: 30
    }
  };
  var _ref = [10, 20],
    first = _ref[0],
    second = _ref[1],
    _ref$ = _ref[2],
    third = _ref$ === void 0 ? 3 : _ref$;
  var username = user.username,
    userRole = user.role,
    age = user.profile.age,
    _user$missing = user.missing,
    missing = _user$missing === void 0 ? "default" : _user$missing;
  return {
    first: first,
    second: second,
    third: third,
    username: username,
    userRole: userRole,
    age: age,
    missing: missing
  };
}
var init_destructuring = __esm({
  "../es-samples/samples/es2015/destructuring.js": function _esSamples_samples_es2015_destructuringJs() {}
});

// ../es-samples/samples/es2015/enhanced-object-literals.js
function _demoEnhancedObjectLiterals(id, name) {
  var dynamicKey = "status_" + id;
  return _defineProperty(_defineProperty({
    id: id,
    // property shorthand for id: id
    name: name
  }, dynamicKey, "active"), "getSummary", function getSummary() {
    return "".concat(this.name, " (").concat(this.id, ")");
  });
}
var init_enhanced_object_literals = __esm({
  "../es-samples/samples/es2015/enhanced-object-literals.js": function _esSamples_samples_es2015_enhancedObjectLiteralsJs() {}
});

// ../es-samples/samples/es2015/generators.js
function _demoGenerator() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  return /*#__PURE__*/_regenerator().m(function _callee() {
    var i;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
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
  "../es-samples/samples/es2015/generators.js": function _esSamples_samples_es2015_generatorsJs() {}
});

// ../es-samples/samples/es2015/iterators-and-for-of.js
function _demoForOfAndIterators() {
  var iterableObject = _defineProperty({}, Symbol.iterator, function () {
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
  var _iterator = _createForOfIteratorHelper(iterableObject),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
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
  "../es-samples/samples/es2015/iterators-and-for-of.js": function _esSamples_samples_es2015_iteratorsAndForOfJs() {}
});

// ../es-samples/samples/es2015/let-declarations.js
function _demoLet() {
  var blockScopedVar = "initial";
  if (true) {
    var blockScopedVar2 = "shadowed inside block";
  }
  return blockScopedVar;
}
var init_let_declarations = __esm({
  "../es-samples/samples/es2015/let-declarations.js": function _esSamples_samples_es2015_letDeclarationsJs() {}
});

// ../es-samples/samples/es2015/map.js
function _demoMap() {
  var map = /* @__PURE__ */new Map();
  var keyObj = {
    id: 1
  };
  map.set(keyObj, "metadata");
  return map.has(keyObj) && map.get(keyObj) === "metadata";
}
var init_map = __esm({
  "../es-samples/samples/es2015/map.js": function _esSamples_samples_es2015_mapJs() {}
});

// ../es-samples/samples/es2015/math-sign.js
function _demoMathSign() {
  return {
    pos: Math.sign(5),
    neg: Math.sign(-5),
    zero: Math.sign(0)
  };
}
var init_math_sign = __esm({
  "../es-samples/samples/es2015/math-sign.js": function _esSamples_samples_es2015_mathSignJs() {}
});

// ../es-samples/samples/es2015/math-trunc.js
function _demoMathTrunc() {
  return Math.trunc(42.99);
}
var init_math_trunc = __esm({
  "../es-samples/samples/es2015/math-trunc.js": function _esSamples_samples_es2015_mathTruncJs() {}
});

// ../es-samples/samples/es2015/modules.js
var _moduleFeatureDemo;
var init_modules = __esm({
  "../es-samples/samples/es2015/modules.js": function _esSamples_samples_es2015_modulesJs() {
    _moduleFeatureDemo = "This variable is exported using ES2015 module syntax.";
  }
});

// ../es-samples/samples/es2015/number-is-integer.js
function _demoNumberIsInteger() {
  return {
    isInt: Number.isInteger(42),
    isFloat: Number.isInteger(42.5)
  };
}
var init_number_is_integer = __esm({
  "../es-samples/samples/es2015/number-is-integer.js": function _esSamples_samples_es2015_numberIsIntegerJs() {}
});

// ../es-samples/samples/es2015/number-is-nan.js
function _demoNumberIsNaN() {
  return {
    isNaNNumber: Number.isNaN(NaN),
    isNotNaNStr: Number.isNaN("NaN")
  };
}
var init_number_is_nan = __esm({
  "../es-samples/samples/es2015/number-is-nan.js": function _esSamples_samples_es2015_numberIsNanJs() {}
});

// ../es-samples/samples/es2015/numeric-literals.js
function _demoNumericLiterals() {
  var binaryValue = 10;
  var octalValue = 493;
  return {
    binaryValue: binaryValue,
    octalValue: octalValue
  };
}
var init_numeric_literals = __esm({
  "../es-samples/samples/es2015/numeric-literals.js": function _esSamples_samples_es2015_numericLiteralsJs() {}
});

// ../es-samples/samples/es2015/object-assign.js
function _demoObjectAssign() {
  return Object.assign({}, {
    a: 1
  }, {
    b: 2
  });
}
var init_object_assign = __esm({
  "../es-samples/samples/es2015/object-assign.js": function _esSamples_samples_es2015_objectAssignJs() {}
});

// ../es-samples/samples/es2015/object-is.js
function _demoObjectIs() {
  return {
    nanCheck: Object.is(NaN, NaN),
    zeroCheck: Object.is(0, -0)
  };
}
var init_object_is = __esm({
  "../es-samples/samples/es2015/object-is.js": function _esSamples_samples_es2015_objectIsJs() {}
});

// ../es-samples/samples/es2015/promises.js
function _demoPromise() {
  var shouldResolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return new Promise(function (resolve, reject) {
    if (shouldResolve) {
      resolve("Promise resolved successfully");
    } else {
      reject(new Error("Promise rejected"));
    }
  });
}
var init_promises = __esm({
  "../es-samples/samples/es2015/promises.js": function _esSamples_samples_es2015_promisesJs() {}
});

// ../es-samples/samples/es2015/proxy.js
function _demoProxy() {
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
  "../es-samples/samples/es2015/proxy.js": function _esSamples_samples_es2015_proxyJs() {}
});

// ../es-samples/samples/es2015/reflect.js
function _demoReflect() {
  var obj = {
    a: 1
  };
  Reflect.set(obj, "b", 2);
  return Reflect.get(obj, "b");
}
var init_reflect = __esm({
  "../es-samples/samples/es2015/reflect.js": function _esSamples_samples_es2015_reflectJs() {}
});

// ../es-samples/samples/es2015/rest-parameters.js
function _demoRestParameters(first) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }
  return {
    first: first,
    rest: rest
  };
}
var init_rest_parameters = __esm({
  "../es-samples/samples/es2015/rest-parameters.js": function _esSamples_samples_es2015_restParametersJs() {}
});

// ../es-samples/samples/es2015/set.js
function _demoSet() {
  var set = /* @__PURE__ */new Set([1, 2, 2, 3]);
  return set.size === 3 && set.has(2);
}
var init_set = __esm({
  "../es-samples/samples/es2015/set.js": function _esSamples_samples_es2015_setJs() {}
});

// ../es-samples/samples/es2015/spread-syntax.js
function _demoSpreadSyntax() {
  var parts = [2, 3];
  return [1].concat(parts, [4]);
}
var init_spread_syntax = __esm({
  "../es-samples/samples/es2015/spread-syntax.js": function _esSamples_samples_es2015_spreadSyntaxJs() {}
});

// ../es-samples/samples/es2015/string-ends-with.js
function _demoStringEndsWith() {
  return "ECMAScript".endsWith("Script");
}
var init_string_ends_with = __esm({
  "../es-samples/samples/es2015/string-ends-with.js": function _esSamples_samples_es2015_stringEndsWithJs() {}
});

// ../es-samples/samples/es2015/string-includes.js
function _demoStringIncludes() {
  return "ECMAScript".includes("Script");
}
var init_string_includes = __esm({
  "../es-samples/samples/es2015/string-includes.js": function _esSamples_samples_es2015_stringIncludesJs() {}
});

// ../es-samples/samples/es2015/string-repeat.js
function _demoStringRepeat() {
  return "abc".repeat(3);
}
var init_string_repeat = __esm({
  "../es-samples/samples/es2015/string-repeat.js": function _esSamples_samples_es2015_stringRepeatJs() {}
});

// ../es-samples/samples/es2015/string-starts-with.js
function _demoStringStartsWith() {
  return "ECMAScript".startsWith("ECMA");
}
var init_string_starts_with = __esm({
  "../es-samples/samples/es2015/string-starts-with.js": function _esSamples_samples_es2015_stringStartsWithJs() {}
});

// ../es-samples/samples/es2015/symbols.js
function _demoSymbols() {
  var sym1 = Symbol("description");
  var sym2 = Symbol("description");
  var obj = _defineProperty(_defineProperty({}, sym1, "secret value"), Symbol.toStringTag, "CustomObject");
  return {
    areSymbolsEqual: sym1 === sym2,
    symbolPropertyValue: obj[sym1],
    toStringTag: Object.prototype.toString.call(obj)
  };
}
var init_symbols = __esm({
  "../es-samples/samples/es2015/symbols.js": function _esSamples_samples_es2015_symbolsJs() {}
});

// ../es-samples/samples/es2015/template-literals.js
function _demoTemplateLiterals() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "World";
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  var basicTemplate = "Hello, ".concat(name, "! You have ").concat(count, " notifications.");
  function highlight(strings) {
    for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      values[_key2 - 1] = arguments[_key2];
    }
    return strings.reduce(function (acc, str, i) {
      var val = values[i] !== void 0 ? "[".concat(values[i], "]") : "";
      return acc + str + val;
    }, "");
  }
  var taggedResult = highlight(_templateObject || (_templateObject = _taggedTemplateLiteral(["User ", " has ", " items."])), name, count);
  return {
    basicTemplate: basicTemplate,
    taggedResult: taggedResult
  };
}
var init_template_literals = __esm({
  "../es-samples/samples/es2015/template-literals.js": function _esSamples_samples_es2015_templateLiteralsJs() {}
});

// ../es-samples/samples/es2015/weak-map.js
function _demoWeakMap() {
  var weakMap = /* @__PURE__ */new WeakMap();
  var key = {
    name: "temp"
  };
  weakMap.set(key, "data");
  return weakMap.has(key);
}
var init_weak_map = __esm({
  "../es-samples/samples/es2015/weak-map.js": function _esSamples_samples_es2015_weakMapJs() {}
});

// ../es-samples/samples/es2015/weak-set.js
function _demoWeakSet() {
  var weakSet = /* @__PURE__ */new WeakSet();
  var obj = {
    name: "temp"
  };
  weakSet.add(obj);
  return weakSet.has(obj);
}
var init_weak_set = __esm({
  "../es-samples/samples/es2015/weak-set.js": function _esSamples_samples_es2015_weakSetJs() {}
});

// ../es-samples/samples/es2015.js
var es2015_exports = exports.es2015Namespace = {};
__export(es2015_exports, {
  Animal: function Animal() {
    return _Animal3;
  },
  Dog: function Dog() {
    return _Dog;
  },
  add: function add() {
    return _add;
  },
  createPoint: function createPoint() {
    return _createPoint;
  },
  demoArrayFind: function demoArrayFind() {
    return _demoArrayFind;
  },
  demoArrayFindIndex: function demoArrayFindIndex() {
    return _demoArrayFindIndex;
  },
  demoArrayFrom: function demoArrayFrom() {
    return _demoArrayFrom;
  },
  demoArrayOf: function demoArrayOf() {
    return _demoArrayOf;
  },
  demoConst: function demoConst() {
    return _demoConst;
  },
  demoDefaultParameters: function demoDefaultParameters() {
    return _demoDefaultParameters;
  },
  demoDestructuring: function demoDestructuring() {
    return _demoDestructuring;
  },
  demoEnhancedObjectLiterals: function demoEnhancedObjectLiterals() {
    return _demoEnhancedObjectLiterals;
  },
  demoForOfAndIterators: function demoForOfAndIterators() {
    return _demoForOfAndIterators;
  },
  demoGenerator: function demoGenerator() {
    return _demoGenerator;
  },
  demoLet: function demoLet() {
    return _demoLet;
  },
  demoMap: function demoMap() {
    return _demoMap;
  },
  demoMathSign: function demoMathSign() {
    return _demoMathSign;
  },
  demoMathTrunc: function demoMathTrunc() {
    return _demoMathTrunc;
  },
  demoNumberIsInteger: function demoNumberIsInteger() {
    return _demoNumberIsInteger;
  },
  demoNumberIsNaN: function demoNumberIsNaN() {
    return _demoNumberIsNaN;
  },
  demoNumericLiterals: function demoNumericLiterals() {
    return _demoNumericLiterals;
  },
  demoObjectAssign: function demoObjectAssign() {
    return _demoObjectAssign;
  },
  demoObjectIs: function demoObjectIs() {
    return _demoObjectIs;
  },
  demoPromise: function demoPromise() {
    return _demoPromise;
  },
  demoProxy: function demoProxy() {
    return _demoProxy;
  },
  demoReflect: function demoReflect() {
    return _demoReflect;
  },
  demoRestParameters: function demoRestParameters() {
    return _demoRestParameters;
  },
  demoSet: function demoSet() {
    return _demoSet;
  },
  demoSpreadSyntax: function demoSpreadSyntax() {
    return _demoSpreadSyntax;
  },
  demoStringEndsWith: function demoStringEndsWith() {
    return _demoStringEndsWith;
  },
  demoStringIncludes: function demoStringIncludes() {
    return _demoStringIncludes;
  },
  demoStringRepeat: function demoStringRepeat() {
    return _demoStringRepeat;
  },
  demoStringStartsWith: function demoStringStartsWith() {
    return _demoStringStartsWith;
  },
  demoSymbols: function demoSymbols() {
    return _demoSymbols;
  },
  demoTemplateLiterals: function demoTemplateLiterals() {
    return _demoTemplateLiterals;
  },
  demoWeakMap: function demoWeakMap() {
    return _demoWeakMap;
  },
  demoWeakSet: function demoWeakSet() {
    return _demoWeakSet;
  },
  lexicalThisDemo: function lexicalThisDemo() {
    return _lexicalThisDemo;
  },
  moduleFeatureDemo: function moduleFeatureDemo() {
    return _moduleFeatureDemo;
  }
});
var init_es2015 = __esm({
  "../es-samples/samples/es2015.js": function _esSamples_samples_es2015Js() {
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
function demoDynamicImport() {
  return _demoDynamicImport.apply(this, arguments);
} // ../es-samples/samples/es2020/global-this.js
function _demoDynamicImport() {
  _demoDynamicImport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var es2015Module;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return Promise.resolve().then(function () {
            return init_es2015(), es2015_exports;
          });
        case 1:
          es2015Module = _context2.v;
          return _context2.a(2, typeof es2015Module.add === "function");
      }
    }, _callee2);
  }));
  return _demoDynamicImport.apply(this, arguments);
}
function demoGlobalThis() {
  return typeof globalThis !== "undefined" && globalThis === Object(globalThis);
}

// ../es-samples/samples/es2020/import-meta.js
function demoImportMeta() {
  return _typeof(import.meta) === "object" && typeof import.meta.url === "string";
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
    street: street,
    zipCode: zipCode,
    firstItem: firstItem
  };
}

// ../es-samples/samples/es2020/promise-all-settled.js
function demoPromiseAllSettled() {
  return _demoPromiseAllSettled.apply(this, arguments);
} // ../es-samples/samples/es2020/string-match-all.js
function _demoPromiseAllSettled() {
  _demoPromiseAllSettled = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var promises, results;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          promises = [Promise.resolve("Success 1"), Promise.reject("Error 1"), Promise.resolve("Success 2")];
          _context3.n = 1;
          return Promise.allSettled(promises);
        case 1:
          results = _context3.v;
          return _context3.a(2, results);
      }
    }, _callee3);
  }));
  return _demoPromiseAllSettled.apply(this, arguments);
}
function demoMatchAll() {
  var regex = /test(\d+)/g;
  var str = "test1 and test2 and test3";
  var matches = _toConsumableArray(str.matchAll(regex));
  return matches.map(function (m) {
    return {
      fullMatch: m[0],
      group: m[1],
      index: m.index
    };
  });
}