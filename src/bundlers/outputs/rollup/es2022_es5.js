var SampleBundle = (function (exports) {
  'use strict';

  /**
   * ECMAScript 2022 (13th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/13.0/
   */

  /*
   * .at() Method on Indexable Objects (Array, String, TypedArray)
   * Takes an integer value and returns the item at that index, allowing positive integers for indexing from the start
   * and negative integers for relative indexing from the end (e.g., `-1` for the last element).
   * Spec (Array): https://262.ecma-international.org/13.0/#sec-array.prototype.at
   * Spec (String): https://262.ecma-international.org/13.0/#sec-string.prototype.at
   */
  function demoAtMethod() {
    var letters = ["A", "B", "C", "D"];
    var word = "ECMAScript";
    return {
      lastLetter: letters.at(-1),
      // "D"
      secondToLast: letters.at(-2),
      // "C"
      firstChar: word.at(0),
      // "E"
      lastChar: word.at(-1) // "t"
    };
  }

  function _typeof$3(o) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$3(o); }
  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.symbol.iterator.js");
  require("core-js/modules/es.symbol.to-primitive.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.date.to-primitive.js");
  require("core-js/modules/es.function.name.js");
  require("core-js/modules/es.number.constructor.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/es.weak-map.js");
  require("core-js/modules/es.weak-set.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  function _classCallCheck$2(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
  function _defineProperties$2(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$2(o.key), o); } }
  function _createClass$2(e, r, t) { return r && _defineProperties$2(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
  function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration$1(e, a), a.add(e); }
  function _classPrivateFieldInitSpec$1(e, t, a) { _checkPrivateRedeclaration$1(e, t), t.set(e, a); }
  function _checkPrivateRedeclaration$1(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
  function _defineProperty$1(e, r, t) { return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
  function _toPropertyKey$2(t) { var i = _toPrimitive$2(t, "string"); return "symbol" == _typeof$3(i) ? i : i + ""; }
  function _toPrimitive$2(t, r) { if ("object" != _typeof$3(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$3(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand$1(s, a), r), r; }
  function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand$1(s, a)); }
  function _assertClassBrand$1(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
  var _count = /*#__PURE__*/new WeakMap();
  var _Counter_brand = /*#__PURE__*/new WeakSet();
  /**
   * ECMAScript 2022 (13th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/13.0/
   */

  /*
   * Class Fields (Public/Private Instance & Static Fields, Private Methods)
   * Extends classes with declarative instance and static fields without requiring constructor initialization, along with
   * truly private members (fields and methods) prefixed with `#` that cannot be accessed outside the class body.
   * Spec: https://262.ecma-international.org/13.0/#sec-class-definitions
   * Spec (Private Identifiers): https://262.ecma-international.org/13.0/#sec-private-bound-identifiers
   */
  var Counter = /*#__PURE__*/function () {
    function Counter(name) {
      _classCallCheck$2(this, Counter);
      // Private method
      _classPrivateMethodInitSpec(this, _Counter_brand);
      // Public instance field
      _defineProperty$1(this, "name", "Default Counter");
      // Private instance field
      _classPrivateFieldInitSpec$1(this, _count, 0);
      if (name) this.name = name;
      Counter.totalCounters++;
    }
    return _createClass$2(Counter, [{
      key: "increment",
      value: function increment() {
        var _this$count;
        _classPrivateFieldSet(_count, this, (_this$count = _classPrivateFieldGet(_count, this), _this$count++, _this$count));
        _assertClassBrand$1(_Counter_brand, this, _log).call(this);
      }
    }, {
      key: "getCount",
      value: function getCount() {
        return _classPrivateFieldGet(_count, this);
      }
    }]);
  }();
  function _log() {
    // Internal logging
  }
  // Public static field
  _defineProperty$1(Counter, "totalCounters", 0);

  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.symbol.iterator.js");
  require("core-js/modules/es.symbol.to-primitive.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.date.to-primitive.js");
  require("core-js/modules/es.number.constructor.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
  var _ConfigManager;
  require("core-js/modules/es.array.slice.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.regexp.to-string.js");
  function _classCallCheck$1(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
  function _defineProperties$1(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$1(o.key), o); } }
  function _createClass$1(e, r, t) { return t && _defineProperties$1(e, t), Object.defineProperty(e, "prototype", { writable: false }), e; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
  function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$2(i) ? i : i + ""; }
  function _toPrimitive$1(t, r) { if ("object" != _typeof$2(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$2(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
  /**
   * ECMAScript 2022 (13th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/13.0/
   */

  /*
   * Class Static Initialization Blocks
   * Introduces `static { ... }` blocks within class bodies to evaluate complex static initialization logic with access
   * to private static/instance fields of the class.
   * Spec: https://262.ecma-international.org/13.0/#sec-class-static-initialization-blocks
   */
  var ConfigManager = /*#__PURE__*/function () {
    function ConfigManager() {
      _classCallCheck$1(this, ConfigManager);
    }
    return _createClass$1(ConfigManager, null, [{
      key: "getSecretLength",
      value: function getSecretLength() {
        var _assertClassBrand$_$l, _assertClassBrand$_;
        return (_assertClassBrand$_$l = (_assertClassBrand$_ = _assertClassBrand(ConfigManager, this, _secretKey)._) === null || _assertClassBrand$_ === void 0 ? void 0 : _assertClassBrand$_.length) !== null && _assertClassBrand$_$l !== void 0 ? _assertClassBrand$_$l : 0;
      }
    }]);
  }();
  _ConfigManager = ConfigManager;
  var _secretKey = {
    _: void 0
  };
  _defineProperty(ConfigManager, "isInitialized", false);
  (function () {
    try {
      _secretKey._ = _assertClassBrand(_ConfigManager, _ConfigManager, "INIT_KEY_" + Math.random().toString(36).slice(2, 6));
      _ConfigManager.isInitialized = true;
    } catch (_unused) {
      _ConfigManager.isInitialized = false;
    }
  })();

  /**
   * ECMAScript 2022 (13th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/13.0/
   */

  /*
   * Error Cause (Error.prototype.cause)
   * Allows specifying an underlying error cause via the `{ cause: err }` options object passed to Error constructors,
   * aiding error chaining and debugging across async architectural layers.
   * Spec: https://262.ecma-international.org/13.0/#sec-error-message-options
   */
  function demoErrorCause() {
    try {
      throw new TypeError("Database timeout");
    } catch (originalError) {
      var wrappedError = new Error("Failed to load user profile", {
        cause: originalError
      });
      return {
        message: wrappedError.message,
        causeMessage: wrappedError.cause.message
      };
    }
  }

  /**
   * ECMAScript 2022 (13th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/13.0/
   */

  /*
   * Object.hasOwn()
   * A static method that returns true if the specified object has the indicated property as its own property.
   * Serves as a safer, more concise alternative to `Object.prototype.hasOwnProperty.call(obj, prop)`.
   * Spec: https://262.ecma-international.org/13.0/#sec-object.hasown
   */
  function demoObjectHasOwn() {
    var obj = Object.create({
      inheritedProp: "parent"
    });
    obj.ownProp = "child";
    return {
      hasOwnProp: Object.hasOwn(obj, "ownProp"),
      // true
      hasInheritedProp: Object.hasOwn(obj, "inheritedProp"),
      // false
      hasToString: Object.hasOwn(obj, "toString") // false
    };
  }

  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.symbol.iterator.js");
  require("core-js/modules/es.symbol.to-primitive.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.date.to-primitive.js");
  require("core-js/modules/es.number.constructor.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/es.weak-map.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
  function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
  function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
  function _createClass(e, r, t) { return t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof$1(i) ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return (String )(t); }
  function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
  function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
  function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? _typeof$1(e) : "null")); return e; }
  var _token = /*#__PURE__*/new WeakMap();
  /**
   * ECMAScript 2022 (13th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/13.0/
   */

  /*
   * Private Field Check Syntax (#field in object)
   * Allows checking whether a specific private field or method is present on an object using the `in` operator,
   * without throwing a TypeError when checking arbitrary objects.
   * Spec: https://262.ecma-international.org/13.0/#sec-relational-operators
   */
  var SecureBox = /*#__PURE__*/function () {
    function SecureBox() {
      _classCallCheck(this, SecureBox);
      _classPrivateFieldInitSpec(this, _token, "secret");
    }
    return _createClass(SecureBox, null, [{
      key: "hasToken",
      value: function hasToken(obj) {
        return _token.has(_checkInRHS(obj));
      }
    }]);
  }();

  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.symbol.iterator.js");
  require("core-js/modules/es.symbol.replace.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.array.join.js");
  require("core-js/modules/es.array.slice.js");
  require("core-js/modules/es.object.keys.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.regexp.constructor.js");
  require("core-js/modules/es.regexp.exec.js");
  require("core-js/modules/es.regexp.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/es.string.replace.js");
  require("core-js/modules/es.weak-map.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(e, r) { return new BabelRegExp(e, void 0, r); }; var e = RegExp.prototype, r = new WeakMap(); function BabelRegExp(e, t, p) { var o = RegExp(e, t); return r.set(o, p || r.get(e)), _setPrototypeOf(o, BabelRegExp.prototype); } function buildGroups(e, t) { var p = r.get(t); return Object.keys(p).reduce(function (r, t) { var o = p[t]; if ("number" == typeof o) r[t] = e[o];else { for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length;) i++; r[t] = e[o[i]]; } return r; }, Object.create(null)); } return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (r) { var t = e.exec.call(this, r); if (t) { t.groups = buildGroups(t, this); var p = t.indices; p && (p.groups = buildGroups(p, this)); } return t; }, BabelRegExp.prototype[Symbol.replace] = function (t, p) { if ("string" == typeof p) { var o = r.get(this); return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)(>|$)/g, function (e, r, t) { if ("" === t) return e; var p = o[r]; return Array.isArray(p) ? "$" + p.join("$") : "number" == typeof p ? "$" + p : ""; })); } if ("function" == typeof p) { var i = this; return e[Symbol.replace].call(this, t, function () { var e = arguments; return "object" != _typeof(e[e.length - 1]) && (e = [].slice.call(e)).push(buildGroups(e, i)), p.apply(this, e); }); } return e[Symbol.replace].call(this, t, p); }, _wrapRegExp.apply(this, arguments); }
  function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e); }
  function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
  /**
   * ECMAScript 2022 (13th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/13.0/
   */

  /*
   * RegExp Match Indices (d flag)
   * Introduces the `/.../d` regex flag, which instructs regex execution methods (`exec`, `matchAll`) to include an `indices`
   * array property on the match object detailing the start and end character positions of each matched group.
   * Spec: https://262.ecma-international.org/13.0/#sec-get-regexp.prototype.hasindices
   */
  function demoMatchIndices() {
    var regex = /*#__PURE__*/_wrapRegExp(/foo(bar)?/d, {
      bar: 1
    });
    var match = regex.exec("foo bar foobar");
    return {
      fullMatchBounds: match.indices[0],
      // [8, 14] for "foobar"
      groupBounds: match.indices[1],
      // [11, 14] for "bar"
      namedGroupBounds: match.indices.groups.bar // [11, 14]
    };
  }

  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.promise.js");
  /**
   * ECMAScript 2022 (13th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/13.0/
   */

  /*
   * Top-Level Await
   * Enables the use of `await` directly at the top level of an ES module outside of any async function, pausing module evaluation
   * and dependency graph resolution until the awaited Promise settles.
   * Spec: https://262.ecma-international.org/13.0/#sec-module-evaluation
   */
  var topLevelAwaitDemo = Promise.resolve("Resolved at top level in ES module");

  exports.ConfigManager = ConfigManager;
  exports.Counter = Counter;
  exports.SecureBox = SecureBox;
  exports.demoAtMethod = demoAtMethod;
  exports.demoErrorCause = demoErrorCause;
  exports.demoMatchIndices = demoMatchIndices;
  exports.demoObjectHasOwn = demoObjectHasOwn;
  exports.topLevelAwaitDemo = topLevelAwaitDemo;

  return exports;

})({});
//# sourceMappingURL=es2022_es5.js.101_1789571221160_onfup.tmp.map
