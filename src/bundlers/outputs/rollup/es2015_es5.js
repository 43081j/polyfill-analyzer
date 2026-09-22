var SampleBundle = (function (exports) {
  'use strict';

  require("core-js/modules/es.array.find-index.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Array.prototype.findIndex
   * Returns the index of the first element in an array that satisfies the provided testing function.
   * Spec: https://262.ecma-international.org/6.0/#sec-array.prototype.findindex
   */
  function demoArrayFindIndex() {
    return [10, 20, 30, 40].findIndex(function (val) {
      return val > 25;
    });
  }

  require("core-js/modules/es.array.find.js");
  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Array.prototype.find
   * Returns the first element in the provided array that satisfies the provided testing function.
   * Spec: https://262.ecma-international.org/6.0/#sec-array.prototype.find
   */
  function demoArrayFind() {
    return [10, 20, 30, 40].find(function (val) {
      return val > 25;
    });
  }

  require("core-js/modules/es.array.from.js");
  require("core-js/modules/es.string.iterator.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Array.from
   * Creates a new, shallow-copied Array instance from an iterable or array-like object.
   * Spec: https://262.ecma-international.org/6.0/#sec-array.from
   */
  function demoArrayFrom() {
    return Array.from("ES6");
  }

  require("core-js/modules/es.array.of.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Array.of
   * Creates a new Array instance from a variable number of arguments, regardless of number or type of arguments.
   * Spec: https://262.ecma-international.org/6.0/#sec-array.of
   */
  function demoArrayOf() {
    return Array.of(1, 2, 3);
  }

  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Arrow Function Definitions
   * Provides a concise syntax for anonymous functions using the `=>` token. Arrow functions lexically bind
   * `this`, `arguments`, `super`, and `new.target` from their enclosing scope rather than defining their own.
   * Spec: https://262.ecma-international.org/6.0/#sec-arrow-function-definitions
   */
  var add = function add(a, b) {
    return a + b;
  };
  var createPoint = function createPoint(x, y) {
    return {
      x: x,
      y: y
    };
  };
  var lexicalThisDemo = function lexicalThisDemo() {
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

  function _typeof$3(o) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$3(o); }
  function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
  function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof$3(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
  function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
  function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e); }
  function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.symbol.iterator.js");
  require("core-js/modules/es.symbol.to-primitive.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.date.to-primitive.js");
  require("core-js/modules/es.function.name.js");
  require("core-js/modules/es.number.constructor.js");
  require("core-js/modules/es.object.get-prototype-of.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.reflect.construct.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
  function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$3(o.key), o); } }
  function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e; }
  function _toPropertyKey$3(t) { var i = _toPrimitive$3(t, "string"); return "symbol" == _typeof$3(i) ? i : i + ""; }
  function _toPrimitive$3(t, r) { if ("object" != _typeof$3(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$3(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Class Definitions and Inheritance
   * Introduces class syntax as syntactic sugar over prototype-based inheritance, including constructors,
   * instance methods, static methods, and `extends`/`super` for subclassing.
   * Spec: https://262.ecma-international.org/6.0/#sec-class-definitions
   */
  var Animal = /*#__PURE__*/function () {
    function Animal(name) {
      _classCallCheck(this, Animal);
      this.name = name;
    }
    return _createClass(Animal, [{
      key: "speak",
      value: function speak() {
        return "".concat(this.name, " makes a noise.");
      }
    }], [{
      key: "isAnimal",
      value: function isAnimal(obj) {
        return obj instanceof Animal;
      }
    }]);
  }();
  var Dog = /*#__PURE__*/function (_Animal) {
    function Dog(name, breed) {
      var _this;
      _classCallCheck(this, Dog);
      _this = _callSuper(this, Dog, [name]);
      _this.breed = breed;
      return _this;
    }
    _inherits(Dog, _Animal);
    return _createClass(Dog, [{
      key: "speak",
      value: function speak() {
        return "".concat(this.name, " barks.");
      }
    }]);
  }(Animal);

  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * const Declarations
   * Block-scoped read-only constant declaration.
   * Spec: https://262.ecma-international.org/6.0/#sec-let-and-const-declarations
   */
  function demoConst() {
    var constantValue = 42;
    return constantValue;
  }

  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Default Parameters
   * Allows formal parameters to be initialized with default values if no value or undefined is passed.
   * Spec: https://262.ecma-international.org/6.0/#sec-parameter-lists
   */
  function demoDefaultParameters() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    return a + b;
  }

  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Destructuring Assignment
   * Syntax allowing extraction of values from arrays or properties from objects into distinct variables,
   * supporting default fallback values and nested destructuring.
   * Spec: https://262.ecma-international.org/6.0/#sec-destructuring-assignment
   */
  function demoDestructuring() {
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

  function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
  function _defineProperty$2(e, r, t) { return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
  function _toPropertyKey$2(t) { var i = _toPrimitive$2(t, "string"); return "symbol" == _typeof$2(i) ? i : i + ""; }
  function _toPrimitive$2(t, r) { if ("object" != _typeof$2(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$2(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.symbol.iterator.js");
  require("core-js/modules/es.symbol.to-primitive.js");
  require("core-js/modules/es.array.concat.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.date.to-primitive.js");
  require("core-js/modules/es.function.name.js");
  require("core-js/modules/es.number.constructor.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Enhanced Object Literals
   * Syntactic enhancements for object initializers including property value shorthand, method definition shorthand,
   * and computed property names.
   * Spec: https://262.ecma-international.org/6.0/#sec-object-initializer
   */
  function demoEnhancedObjectLiterals(id, name) {
    var dynamicKey = "status_" + id;
    return _defineProperty$2(_defineProperty$2({
      id: id,
      // property shorthand for id: id
      name: name
    }, dynamicKey, "active"), "getSummary", function getSummary() {
      // method shorthand for getSummary: function()
      return "".concat(this.name, " (").concat(this.id, ")");
    });
  }

  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.object.get-prototype-of.js");
  require("core-js/modules/es.object.to-string.js");
  function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = true, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), true), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
  function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Generator Functions and yield Statement
   * Functions defined with `function*` that can be paused and resumed using the `yield` keyword, returning a Generator object
   * that conforms to both the iterable and iterator protocols.
   * Spec: https://262.ecma-international.org/6.0/#sec-generator-function-definitions
   */
  function demoGenerator() {
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

  function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
  function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _defineProperty$1(e, r, t) { return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
  function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : i + ""; }
  function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.symbol.iterator.js");
  require("core-js/modules/es.symbol.to-primitive.js");
  require("core-js/modules/es.array.from.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.array.slice.js");
  require("core-js/modules/es.date.to-primitive.js");
  require("core-js/modules/es.function.name.js");
  require("core-js/modules/es.number.constructor.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.regexp.exec.js");
  require("core-js/modules/es.regexp.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Iterators and for...of Statement
   * Protocol for iterable objects (implementing `Symbol.iterator`) and the `for...of` loop to traverse iterable elements.
   * Spec: https://262.ecma-international.org/6.0/#sec-for-in-and-for-of-statements
   */
  function demoForOfAndIterators() {
    var iterableObject = _defineProperty$1({}, Symbol.iterator, function () {
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
            value: undefined,
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

  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * let Declarations
   * Block-scoped variable declaration. Resides in the Temporal Dead Zone until evaluation.
   * Spec: https://262.ecma-international.org/6.0/#sec-let-and-const-declarations
   */
  function demoLet() {
    var blockScopedVar = "initial";
    return blockScopedVar;
  }

  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.map.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Map Object
   * Key-value collection supporting arbitrary key types including objects and primitives.
   * Spec: https://262.ecma-international.org/6.0/#sec-map-objects
   */
  function demoMap() {
    var map = new Map();
    var keyObj = {
      id: 1
    };
    map.set(keyObj, "metadata");
    return map.has(keyObj) && map.get(keyObj) === "metadata";
  }

  require("core-js/modules/es.math.sign.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Math.sign
   * Returns the sign of a number, indicating whether the number is positive, negative or zero.
   * Spec: https://262.ecma-international.org/6.0/#sec-math.sign
   */
  function demoMathSign() {
    return {
      pos: Math.sign(5),
      neg: Math.sign(-5),
      zero: Math.sign(0)
    };
  }

  require("core-js/modules/es.math.trunc.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Math.trunc
   * Returns the integer part of a number by removing any fractional digits.
   * Spec: https://262.ecma-international.org/6.0/#sec-math.trunc
   */
  function demoMathTrunc() {
    return Math.trunc(42.99);
  }

  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * ES Modules (Export and Import syntax)
   * Native syntax for modular programming using `export` and `import` declarations.
   * Note: Since this entire file is an ES module using `export`, this feature is natively exemplified by the module structure itself.
   * Spec: https://262.ecma-international.org/6.0/#sec-exports-and-imports
   */
  var moduleFeatureDemo = "This variable is exported using ES2015 module syntax.";

  require("core-js/modules/es.number.is-integer.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Number.isInteger
   * Determines whether the passed value is an integer.
   * Spec: https://262.ecma-international.org/6.0/#sec-number.isinteger
   */
  function demoNumberIsInteger() {
    return {
      isInt: Number.isInteger(42.0),
      isFloat: Number.isInteger(42.5)
    };
  }

  require("core-js/modules/es.number.is-nan.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Number.isNaN
   * Determines whether the passed value is NaN without type coercion.
   * Spec: https://262.ecma-international.org/6.0/#sec-number.isnan
   */
  function demoNumberIsNaN() {
    return {
      isNaNNumber: Number.isNaN(NaN),
      isNotNaNStr: Number.isNaN("NaN")
    };
  }

  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Binary and Octal Numeric Literals
   * Direct syntax for binary literals (`0b` or `0B` prefix) and octal literals (`0o` or `0O` prefix).
   * Spec: https://262.ecma-international.org/6.0/#sec-literals-numeric-literals
   */
  function demoNumericLiterals() {
    var binaryValue = 10; // 10 in decimal
    var octalValue = 493; // 493 in decimal
    return {
      binaryValue: binaryValue,
      octalValue: octalValue
    };
  }

  require("core-js/modules/es.object.assign.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Object.assign
   * Copies all enumerable own properties from one or more source objects to a target object.
   * Spec: https://262.ecma-international.org/6.0/#sec-object.assign
   */
  function demoObjectAssign() {
    return Object.assign({}, {
      a: 1
    }, {
      b: 2
    });
  }

  require("core-js/modules/es.object.is.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Object.is
   * Determines whether two values are the same value, correctly evaluating NaN and signed zeros.
   * Spec: https://262.ecma-international.org/6.0/#sec-object.is
   */
  function demoObjectIs() {
    return {
      nanCheck: Object.is(NaN, NaN),
      zeroCheck: Object.is(0, -0)
    };
  }

  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.promise.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Promise Objects
   * A built-in object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.
   * Spec: https://262.ecma-international.org/6.0/#sec-promise-objects
   */
  function demoPromise() {
    var shouldResolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return new Promise(function (resolve, reject) {
      if (shouldResolve) {
        resolve("Promise resolved successfully");
      } else {
        reject(new Error("Promise rejected"));
      }
    });
  }

  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Proxy Object
   * Enables creation of a proxy for another object, intercepting and customizing fundamental operations.
   * Spec: https://262.ecma-international.org/6.0/#sec-proxy-objects
   */
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

  require("core-js/modules/es.reflect.get.js");
  require("core-js/modules/es.reflect.set.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Reflect Object
   * Built-in object providing methods for interceptable JavaScript operations mirroring Proxy handlers.
   * Spec: https://262.ecma-international.org/6.0/#sec-reflect-object
   */
  function demoReflect() {
    var obj = {
      a: 1
    };
    Reflect.set(obj, "b", 2);
    return Reflect.get(obj, "b");
  }

  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Rest Parameters
   * Allows a function to accept an indefinite number of arguments as an array.
   * Spec: https://262.ecma-international.org/6.0/#sec-rest-parameters
   */
  function demoRestParameters(first) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    return {
      first: first,
      rest: rest
    };
  }

  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.set.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Set Object
   * Collection of unique values of any type.
   * Spec: https://262.ecma-international.org/6.0/#sec-set-objects
   */
  function demoSet() {
    var set = new Set([1, 2, 2, 3]);
    return set.size === 3 && set.has(2);
  }

  require("core-js/modules/es.array.concat.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Spread Syntax
   * Allows an iterable such as an array expression to be expanded in places where zero or more arguments or elements are expected.
   * Spec: https://262.ecma-international.org/6.0/#sec-array-initializer
   */
  function demoSpreadSyntax() {
    var parts = [2, 3];
    return [1].concat(parts, [4]);
  }

  require("core-js/modules/es.string.ends-with.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * String.prototype.endsWith
   * Determines whether a string ends with the characters of a specified string.
   * Spec: https://262.ecma-international.org/6.0/#sec-string.prototype.endswith
   */
  function demoStringEndsWith() {
    return "ECMAScript".endsWith("Script");
  }

  require("core-js/modules/es.string.includes.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * String.prototype.includes
   * Performs a case-sensitive search to determine whether one string may be found within another string.
   * Spec: https://262.ecma-international.org/6.0/#sec-string.prototype.includes
   */
  function demoStringIncludes() {
    return "ECMAScript".includes("Script");
  }

  require("core-js/modules/es.string.repeat.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * String.prototype.repeat
   * Constructs and returns a new string which contains the specified number of copies of the string on which it was called.
   * Spec: https://262.ecma-international.org/6.0/#sec-string.prototype.repeat
   */
  function demoStringRepeat() {
    return "abc".repeat(3);
  }

  require("core-js/modules/es.string.starts-with.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * String.prototype.startsWith
   * Determines whether a string begins with the characters of a specified string.
   * Spec: https://262.ecma-international.org/6.0/#sec-string.prototype.startswith
   */
  function demoStringStartsWith() {
    return "ECMAScript".startsWith("ECMA");
  }

  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.symbol.iterator.js");
  require("core-js/modules/es.symbol.to-primitive.js");
  require("core-js/modules/es.symbol.to-string-tag.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.date.to-primitive.js");
  require("core-js/modules/es.json.to-string-tag.js");
  require("core-js/modules/es.math.to-string-tag.js");
  require("core-js/modules/es.number.constructor.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.regexp.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Symbol Primitive Type
   * A unique and immutable primitive value that can be used as the key of an object property to avoid naming collisions.
   * Also introduces well-known symbols like `Symbol.iterator` and `Symbol.toStringTag`.
   * Spec: https://262.ecma-international.org/6.0/#sec-symbol-objects
   */
  function demoSymbols() {
    var sym1 = Symbol("description");
    var sym2 = Symbol("description");
    var obj = _defineProperty(_defineProperty({}, sym1, "secret value"), Symbol.toStringTag, "CustomObject");
    return {
      areSymbolsEqual: sym1 === sym2,
      symbolPropertyValue: obj[sym1],
      toStringTag: Object.prototype.toString.call(obj)
    };
  }

  var _templateObject;
  function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
  require("core-js/modules/es.array.concat.js");
  require("core-js/modules/es.array.slice.js");
  require("core-js/modules/es.object.freeze.js");
  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * Template Literals and Tagged Templates
   * Multi-line string literals allowing embedded expressions via `${expression}` syntax, and tagged template
   * functions that allow custom parsing and formatting of template literals.
   * Spec: https://262.ecma-international.org/6.0/#sec-template-literals
   */
  function demoTemplateLiterals() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "World";
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
    var basicTemplate = "Hello, ".concat(name, "! You have ").concat(count, " notifications.");

    // Tagged template example
    function highlight(strings) {
      for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }
      return strings.reduce(function (acc, str, i) {
        var val = values[i] !== undefined ? "[".concat(values[i], "]") : "";
        return acc + str + val;
      }, "");
    }
    var taggedResult = highlight(_templateObject || (_templateObject = _taggedTemplateLiteral(["User ", " has ", " items."])), name, count);
    return {
      basicTemplate: basicTemplate,
      taggedResult: taggedResult
    };
  }

  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/es.weak-map.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * WeakMap Object
   * Collection of key/value pairs in which keys must be objects or non-registered symbols and are held weakly.
   * Spec: https://262.ecma-international.org/6.0/#sec-weakmap-objects
   */
  function demoWeakMap() {
    var weakMap = new WeakMap();
    var key = {
      name: "temp"
    };
    weakMap.set(key, "data");
    return weakMap.has(key);
  }

  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/es.weak-set.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2015 (6th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/6.0/
   */

  /*
   * WeakSet Object
   * Collection of garbage-collectable objects held weakly.
   * Spec: https://262.ecma-international.org/6.0/#sec-weakset-objects
   */
  function demoWeakSet() {
    var weakSet = new WeakSet();
    var obj = {
      name: "temp"
    };
    weakSet.add(obj);
    return weakSet.has(obj);
  }

  exports.Animal = Animal;
  exports.Dog = Dog;
  exports.add = add;
  exports.createPoint = createPoint;
  exports.demoArrayFind = demoArrayFind;
  exports.demoArrayFindIndex = demoArrayFindIndex;
  exports.demoArrayFrom = demoArrayFrom;
  exports.demoArrayOf = demoArrayOf;
  exports.demoConst = demoConst;
  exports.demoDefaultParameters = demoDefaultParameters;
  exports.demoDestructuring = demoDestructuring;
  exports.demoEnhancedObjectLiterals = demoEnhancedObjectLiterals;
  exports.demoForOfAndIterators = demoForOfAndIterators;
  exports.demoGenerator = demoGenerator;
  exports.demoLet = demoLet;
  exports.demoMap = demoMap;
  exports.demoMathSign = demoMathSign;
  exports.demoMathTrunc = demoMathTrunc;
  exports.demoNumberIsInteger = demoNumberIsInteger;
  exports.demoNumberIsNaN = demoNumberIsNaN;
  exports.demoNumericLiterals = demoNumericLiterals;
  exports.demoObjectAssign = demoObjectAssign;
  exports.demoObjectIs = demoObjectIs;
  exports.demoPromise = demoPromise;
  exports.demoProxy = demoProxy;
  exports.demoReflect = demoReflect;
  exports.demoRestParameters = demoRestParameters;
  exports.demoSet = demoSet;
  exports.demoSpreadSyntax = demoSpreadSyntax;
  exports.demoStringEndsWith = demoStringEndsWith;
  exports.demoStringIncludes = demoStringIncludes;
  exports.demoStringRepeat = demoStringRepeat;
  exports.demoStringStartsWith = demoStringStartsWith;
  exports.demoSymbols = demoSymbols;
  exports.demoTemplateLiterals = demoTemplateLiterals;
  exports.demoWeakMap = demoWeakMap;
  exports.demoWeakSet = demoWeakSet;
  exports.lexicalThisDemo = lexicalThisDemo;
  exports.moduleFeatureDemo = moduleFeatureDemo;

  return exports;

})({});
//# sourceMappingURL=es2015_es5.js.101_1789571200608_jk3hf.tmp.map
