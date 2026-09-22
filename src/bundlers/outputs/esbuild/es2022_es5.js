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
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.symbol.to-primitive.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.date.to-primitive.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/es.weak-set.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
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
function _classPrivateMethodInitSpec(e, a) {
  _checkPrivateRedeclaration(e, a), a.add(e);
}
function _classPrivateFieldInitSpec(e, t, a) {
  _checkPrivateRedeclaration(e, t), t.set(e, a);
}
function _checkPrivateRedeclaration(e, t) {
  if (t.has(e))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
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
function _classPrivateFieldSet(s, a, r) {
  return s.set(_assertClassBrand(s, a), r), r;
}
function _classPrivateFieldGet(s, a) {
  return s.get(_assertClassBrand(s, a));
}
function _assertClassBrand(e, t, n) {
  if ("function" == typeof e ? e === t : e.has(t))
    return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
var _count = /* @__PURE__ */ new WeakMap();
var _Counter_brand = /* @__PURE__ */ new WeakSet();
var Counter = /* @__PURE__ */ function() {
  function Counter2(name) {
    _classCallCheck(this, Counter2);
    _classPrivateMethodInitSpec(this, _Counter_brand);
    _defineProperty(this, "name", "Default Counter");
    _classPrivateFieldInitSpec(this, _count, 0);
    if (name)
      this.name = name;
    Counter2.totalCounters++;
  }
  return _createClass(Counter2, [{
    key: "increment",
    value: function increment() {
      var _this$count, _this$count2;
      _classPrivateFieldSet(_count, this, (_this$count = _classPrivateFieldGet(_count, this), _this$count2 = _this$count++, _this$count)), _this$count2;
      _assertClassBrand(_Counter_brand, this, _log).call(this);
    }
  }, {
    key: "getCount",
    value: function getCount() {
      return _classPrivateFieldGet(_count, this);
    }
  }]);
}();
function _log() {
}
_defineProperty(Counter, "totalCounters", 0);

// ../es-samples/samples/es2022/class-static-initialization-blocks.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.symbol.to-primitive.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.date.to-primitive.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
var _ConfigManager;
function _classCallCheck2(a, n) {
  if (!(a instanceof n))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties2(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey2(o.key), o);
  }
}
function _createClass2(e, r, t) {
  return r && _defineProperties2(e.prototype, r), t && _defineProperties2(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _defineProperty2(e, r, t) {
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
function _assertClassBrand2(e, t, n) {
  if ("function" == typeof e ? e === t : e.has(t))
    return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
var ConfigManager = /* @__PURE__ */ function() {
  function ConfigManager2() {
    _classCallCheck2(this, ConfigManager2);
  }
  return _createClass2(ConfigManager2, null, [{
    key: "getSecretLength",
    value: function getSecretLength() {
      var _assertClassBrand$_$l, _assertClassBrand$_;
      return (_assertClassBrand$_$l = (_assertClassBrand$_ = _assertClassBrand2(ConfigManager2, this, _secretKey)._) === null || _assertClassBrand$_ === void 0 ? void 0 : _assertClassBrand$_.length) !== null && _assertClassBrand$_$l !== void 0 ? _assertClassBrand$_$l : 0;
    }
  }]);
}();
_ConfigManager = ConfigManager;
var _secretKey = {
  _: void 0
};
_defineProperty2(ConfigManager, "isInitialized", false);
(function() {
  try {
    _secretKey._ = _assertClassBrand2(_ConfigManager, _ConfigManager, "INIT_KEY_" + Math.random().toString(36).slice(2, 6));
    _ConfigManager.isInitialized = true;
  } catch (_unused) {
    _ConfigManager.isInitialized = false;
  }
})();

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
  var obj = /* @__PURE__ */ Object.create({
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
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.symbol.to-primitive.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.date.to-primitive.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _typeof3(o) {
  "@babel/helpers - typeof";
  return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof3(o);
}
function _classCallCheck3(a, n) {
  if (!(a instanceof n))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties3(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey3(o.key), o);
  }
}
function _createClass3(e, r, t) {
  return r && _defineProperties3(e.prototype, r), t && _defineProperties3(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
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
function _classPrivateFieldInitSpec2(e, t, a) {
  _checkPrivateRedeclaration2(e, t), t.set(e, a);
}
function _checkPrivateRedeclaration2(e, t) {
  if (t.has(e))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _checkInRHS(e) {
  if (Object(e) !== e)
    throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? _typeof3(e) : "null"));
  return e;
}
var _token = /* @__PURE__ */ new WeakMap();
var SecureBox = /* @__PURE__ */ function() {
  function SecureBox2() {
    _classCallCheck3(this, SecureBox2);
    _classPrivateFieldInitSpec2(this, _token, "secret");
  }
  return _createClass3(SecureBox2, null, [{
    key: "hasToken",
    value: function hasToken(obj) {
      return _token.has(_checkInRHS(obj));
    }
  }]);
}();

// ../es-samples/samples/es2022/regexp-match-indices.js
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
function _typeof4(o) {
  "@babel/helpers - typeof";
  return _typeof4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof4(o);
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
        return "object" != _typeof4(e2[e2.length - 1]) && (e2 = [].slice.call(e2)).push(buildGroups(e2, i)), p.apply(this, e2);
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
function demoMatchIndices() {
  var regex = /* @__PURE__ */ _wrapRegExp(/foo(bar)?/d, {
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
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
var topLevelAwaitDemo = Promise.resolve("Resolved at top level in ES module");
export {
  ConfigManager,
  Counter,
  SecureBox,
  demoAtMethod,
  demoErrorCause,
  demoMatchIndices,
  demoObjectHasOwn,
  topLevelAwaitDemo
};
//# sourceMappingURL=es2022_es5.js.101_1789571222012_f9v73.tmp.map
