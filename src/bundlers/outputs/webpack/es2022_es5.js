/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_require__ = {};
/******/ })();
"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.replace.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.dot-all.js");
require("core-js/modules/es.regexp.sticky.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecureBox = exports.Counter = exports.ConfigManager = void 0;
exports.demoAtMethod = demoAtMethod;
exports.demoErrorCause = demoErrorCause;
exports.demoMatchIndices = demoMatchIndices;
exports.demoObjectHasOwn = demoObjectHasOwn;
exports.topLevelAwaitDemo = void 0;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.at.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.has-own.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.at-alternative.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/es.weak-set.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _Counter2, _count, _Counter2_brand, _Class, _secretKey, _token;
function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(e, r) { return new BabelRegExp(e, void 0, r); }; var e = RegExp.prototype, r = new WeakMap(); function BabelRegExp(e, t, p) { var o = RegExp(e, t); return r.set(o, p || r.get(e)), _setPrototypeOf(o, BabelRegExp.prototype); } function buildGroups(e, t) { var p = r.get(t); return Object.keys(p).reduce(function (r, t) { var o = p[t]; if ("number" == typeof o) r[t] = e[o];else { for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length;) i++; r[t] = e[o[i]]; } return r; }, Object.create(null)); } return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (r) { var t = e.exec.call(this, r); if (t) { t.groups = buildGroups(t, this); var p = t.indices; p && (p.groups = buildGroups(p, this)); } return t; }, BabelRegExp.prototype[Symbol.replace] = function (t, p) { if ("string" == typeof p) { var o = r.get(this); return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)(>|$)/g, function (e, r, t) { if ("" === t) return e; var p = o[r]; return Array.isArray(p) ? "$" + p.join("$") : "number" == typeof p ? "$" + p : ""; })); } if ("function" == typeof p) { var i = this; return e[Symbol.replace].call(this, t, function () { var e = arguments; return "object" != _typeof(e[e.length - 1]) && (e = [].slice.call(e)).push(buildGroups(e, i)), p.apply(this, e); }); } return e[Symbol.replace].call(this, t, p); }, _wrapRegExp.apply(this, arguments); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? _typeof(e) : "null")); return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
// ../es-samples/samples/es2022/at-method.js
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
    lastChar: word.at(-1)
    // "t"
  };
}

// ../es-samples/samples/es2022/class-fields.js
var Counter = exports.Counter = (_count = /*#__PURE__*/new WeakMap(), _Counter2_brand = /*#__PURE__*/new WeakSet(), _Counter2 = /*#__PURE__*/function () {
  function _Counter(name) {
    _classCallCheck(this, _Counter);
    // Private method
    _classPrivateMethodInitSpec(this, _Counter2_brand);
    // Public instance field
    _defineProperty(this, "name", "Default Counter");
    // Private instance field
    _classPrivateFieldInitSpec(this, _count, 0);
    if (name) this.name = name;
    _Counter.totalCounters++;
  }
  return _createClass(_Counter, [{
    key: "increment",
    value: function increment() {
      var _this$count, _this$count2;
      _classPrivateFieldSet(_count, this, (_this$count = _classPrivateFieldGet(_count, this), _this$count2 = _this$count++, _this$count)), _this$count2;
      _assertClassBrand(_Counter2_brand, this, _log).call(this);
    }
  }, {
    key: "getCount",
    value: function getCount() {
      return _classPrivateFieldGet(_count, this);
    }
  }]);
}(), _defineProperty(_Counter2, "totalCounters", 0), _Counter2);

// ../es-samples/samples/es2022/class-static-initialization-blocks.js
function _log() {}
var ConfigManager = exports.ConfigManager = (_Class = /*#__PURE__*/function () {
  function ConfigManager() {
    _classCallCheck(this, ConfigManager);
  }
  return _createClass(ConfigManager, null, [{
    key: "getSecretLength",
    value: function getSecretLength() {
      var _assertClassBrand$_$l, _assertClassBrand$_;
      return (_assertClassBrand$_$l = (_assertClassBrand$_ = _assertClassBrand(_Class, this, _secretKey)._) === null || _assertClassBrand$_ === void 0 ? void 0 : _assertClassBrand$_.length) !== null && _assertClassBrand$_$l !== void 0 ? _assertClassBrand$_$l : 0;
    }
  }]);
}(), _secretKey = {
  _: void 0
}, _defineProperty(_Class, "isInitialized", false), function () {
  try {
    _secretKey._ = _assertClassBrand(_Class, _Class, "INIT_KEY_" + Math.random().toString(36).slice(2, 6));
    _Class.isInitialized = true;
  } catch (_unused) {
    _Class.isInitialized = false;
  }
}(), _Class);

// ../es-samples/samples/es2022/error-cause.js
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

// ../es-samples/samples/es2022/object-has-own.js
function demoObjectHasOwn() {
  var obj = /* @__PURE__ */Object.create({
    inheritedProp: "parent"
  });
  obj.ownProp = "child";
  return {
    hasOwnProp: Object.hasOwn(obj, "ownProp"),
    // true
    hasInheritedProp: Object.hasOwn(obj, "inheritedProp"),
    // false
    hasToString: Object.hasOwn(obj, "toString")
    // false
  };
}

// ../es-samples/samples/es2022/private-field-check.js
var SecureBox = exports.SecureBox = (_token = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function () {
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
}());

// ../es-samples/samples/es2022/regexp-match-indices.js
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
    namedGroupBounds: match.indices.groups.bar
    // [11, 14]
  };
}

// ../es-samples/samples/es2022/top-level-await.js
var topLevelAwaitDemo = exports.topLevelAwaitDemo = Promise.resolve("Resolved at top level in ES module");