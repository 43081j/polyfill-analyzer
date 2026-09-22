"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get Animal () {
        return Animal;
    },
    get Dog () {
        return Dog;
    },
    get add () {
        return add;
    },
    get createPoint () {
        return createPoint;
    },
    get demoArrayFind () {
        return demoArrayFind;
    },
    get demoArrayFindIndex () {
        return demoArrayFindIndex;
    },
    get demoArrayFrom () {
        return demoArrayFrom;
    },
    get demoArrayOf () {
        return demoArrayOf;
    },
    get demoConst () {
        return demoConst;
    },
    get demoDefaultParameters () {
        return demoDefaultParameters;
    },
    get demoDestructuring () {
        return demoDestructuring;
    },
    get demoEnhancedObjectLiterals () {
        return demoEnhancedObjectLiterals;
    },
    get demoForOfAndIterators () {
        return demoForOfAndIterators;
    },
    get demoGenerator () {
        return demoGenerator;
    },
    get demoLet () {
        return demoLet;
    },
    get demoMap () {
        return demoMap;
    },
    get demoMathSign () {
        return demoMathSign;
    },
    get demoMathTrunc () {
        return demoMathTrunc;
    },
    get demoNumberIsInteger () {
        return demoNumberIsInteger;
    },
    get demoNumberIsNaN () {
        return demoNumberIsNaN;
    },
    get demoNumericLiterals () {
        return demoNumericLiterals;
    },
    get demoObjectAssign () {
        return demoObjectAssign;
    },
    get demoObjectIs () {
        return demoObjectIs;
    },
    get demoPromise () {
        return demoPromise;
    },
    get demoProxy () {
        return demoProxy;
    },
    get demoReflect () {
        return demoReflect;
    },
    get demoRestParameters () {
        return demoRestParameters;
    },
    get demoSet () {
        return demoSet;
    },
    get demoSpreadSyntax () {
        return demoSpreadSyntax;
    },
    get demoStringEndsWith () {
        return demoStringEndsWith;
    },
    get demoStringIncludes () {
        return demoStringIncludes;
    },
    get demoStringRepeat () {
        return demoStringRepeat;
    },
    get demoStringStartsWith () {
        return demoStringStartsWith;
    },
    get demoSymbols () {
        return demoSymbols;
    },
    get demoTemplateLiterals () {
        return demoTemplateLiterals;
    },
    get demoWeakMap () {
        return demoWeakMap;
    },
    get demoWeakSet () {
        return demoWeakSet;
    },
    get lexicalThisDemo () {
        return lexicalThisDemo;
    },
    get moduleFeatureDemo () {
        return moduleFeatureDemo;
    }
});
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-string-tag.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.of.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.json.to-string-tag.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.math.sign.js");
require("core-js/modules/es.math.to-string-tag.js");
require("core-js/modules/es.math.trunc.js");
require("core-js/modules/es.number.is-integer.js");
require("core-js/modules/es.number.is-nan.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.is.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.reflect.set.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.ends-with.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.repeat.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/es.weak-set.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
var _templateObject;
function _taggedTemplateLiteral(e, t) {
    return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
        raw: {
            value: Object.freeze(t)
        }
    }));
}
function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
            t && (r = t);
            var _n = 0, F = function F() {};
            return {
                s: F,
                n: function n() {
                    return _n >= r.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: r[_n++]
                    };
                },
                e: function e(r) {
                    throw r;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o, a = !0, u = !1;
    return {
        s: function s() {
            t = t.call(r);
        },
        n: function n() {
            var _$r = t.next();
            return a = _$r.done, _$r;
        },
        e: function e(r) {
            u = !0, o = r;
        },
        f: function f() {
            try {
                a || null == t.return || t.return();
            } finally{
                if (u) throw o;
            }
        }
    };
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _regenerator() {
    var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
    function i(r, n, o, i) {
        var c = n && _instanceof(n.prototype, Generator) ? n : Generator, u = Object.create(c.prototype);
        return _regeneratorDefine2(u, "_invoke", function(r, n, o) {
            var _$i, c, u, f = 0, p = o || [], y = !1, G = {
                p: 0,
                n: 0,
                v: e,
                a: d,
                f: d.bind(e, 4),
                d: function d(t, r) {
                    return _$i = t, c = 0, u = e, G.n = r, a;
                }
            };
            function d(r, n) {
                for(c = r, u = n, t = 0; !y && f && !_$o && t < p.length; t++){
                    var _$o, _$i = p[t], _$d = G.p, l = _$i[2];
                    r > 3 ? (_$o = l === n) && (u = _$i[(c = _$i[4]) ? 5 : (c = 3, 3)], _$i[4] = _$i[5] = e) : _$i[0] <= _$d && ((_$o = r < 2 && _$d < _$i[1]) ? (c = 0, G.v = n, G.n = _$i[1]) : _$d < l && (_$o = r < 3 || _$i[0] > n || n > l) && (_$i[4] = r, _$i[5] = n, G.n = l, c = 0));
                }
                if (_$o || r > 1) return a;
                throw y = !0, n;
            }
            return function(o, p, l) {
                if (f > 1) throw TypeError("Generator is already running");
                for(y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;){
                    _$i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
                    try {
                        if (f = 2, _$i) {
                            if (c || (o = "next"), t = _$i[o]) {
                                if (!(t = t.call(_$i, u))) throw TypeError("iterator result is not an object");
                                if (!t.done) return t;
                                u = t.value, c < 2 && (c = 0);
                            } else 1 === c && (t = _$i.return) && t.call(_$i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
                            _$i = e;
                        } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
                    } catch (t) {
                        _$i = e, c = 1, u = t;
                    } finally{
                        f = 1;
                    }
                }
                return {
                    value: t,
                    done: y
                };
            };
        }(r, o, i), !0), u;
    }
    var a = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function() {
        return this;
    }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function() {
        return this;
    }), _regeneratorDefine2(u, "toString", function() {
        return "[object Generator]";
    }), (_regenerator = function _regenerator() {
        return {
            w: i,
            m: f
        };
    })();
}
function _regeneratorDefine2(e, r, n, t) {
    var i = Object.defineProperty;
    try {
        i({}, "", {});
    } catch (e) {
        i = 0;
    }
    _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
        function o(r, n) {
            _regeneratorDefine2(e, r, function(e) {
                return this._invoke(r, n, e);
            });
        }
        r ? i ? i(e, r, {
            value: n,
            enumerable: !t,
            configurable: !t,
            writable: !t
        }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
    }, _regeneratorDefine2(e, r, n, t);
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
}
function _isNativeReflectConstruct() {
    try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
        return !!t;
    })();
}
function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
}
function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            writable: !0,
            configurable: !0
        }
    }), Object.defineProperty(t, "prototype", {
        writable: !1
    }), e && _setPrototypeOf(t, e);
}
function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
        return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
}
function _classCallCheck(a, n) {
    if (!_instanceof(a, n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
    for(var t = 0; t < r.length; t++){
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
// ../es-samples/samples/es2015/array-find-index.js
function demoArrayFindIndex() {
    return [
        10,
        20,
        30,
        40
    ].findIndex(function(val) {
        return val > 25;
    });
}
// ../es-samples/samples/es2015/array-find.js
function demoArrayFind() {
    return [
        10,
        20,
        30,
        40
    ].find(function(val) {
        return val > 25;
    });
}
// ../es-samples/samples/es2015/array-from.js
function demoArrayFrom() {
    return Array.from("ES6");
}
// ../es-samples/samples/es2015/array-of.js
function demoArrayOf() {
    return Array.of(1, 2, 3);
}
// ../es-samples/samples/es2015/arrow-functions.js
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
            return function() {
                return _this.value;
            };
        }
    };
    return context.getValueLater()();
};
// ../es-samples/samples/es2015/classes.js
var Animal = /*#__PURE__*/ function() {
    function _Animal(name) {
        _classCallCheck(this, _Animal);
        this.name = name;
    }
    return _createClass(_Animal, [
        {
            key: "speak",
            value: function speak() {
                return "".concat(this.name, " makes a noise.");
            }
        }
    ], [
        {
            key: "isAnimal",
            value: function isAnimal(obj) {
                return _instanceof(obj, _Animal);
            }
        }
    ]);
}();
var Dog = /*#__PURE__*/ function(_Animal2) {
    function Dog(name, breed) {
        var _this2;
        _classCallCheck(this, Dog);
        _this2 = _callSuper(this, Dog, [
            name
        ]);
        _this2.breed = breed;
        return _this2;
    }
    _inherits(Dog, _Animal2);
    return _createClass(Dog, [
        {
            key: "speak",
            value: function speak() {
                return "".concat(this.name, " barks.");
            }
        }
    ]);
}(Animal);
// ../es-samples/samples/es2015/const-declarations.js
function demoConst() {
    var constantValue = 42;
    return constantValue;
}
// ../es-samples/samples/es2015/default-parameters.js
function demoDefaultParameters() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
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
    var _ref = [
        10,
        20
    ], first = _ref[0], second = _ref[1], _ref$ = _ref[2], third = _ref$ === void 0 ? 3 : _ref$;
    var username = user.username, userRole = user.role, age = user.profile.age, _user$missing = user.missing, missing = _user$missing === void 0 ? "default" : _user$missing;
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
// ../es-samples/samples/es2015/enhanced-object-literals.js
function demoEnhancedObjectLiterals(id, name) {
    var dynamicKey = "status_" + id;
    return _defineProperty(_defineProperty({
        id: id,
        // property shorthand for id: id
        name: name
    }, dynamicKey, "active"), "getSummary", function getSummary() {
        return "".concat(this.name, " (").concat(this.id, ")");
    });
}
// ../es-samples/samples/es2015/generators.js
function demoGenerator() {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    return /*#__PURE__*/ _regenerator().m(function _callee() {
        var i;
        return _regenerator().w(function(_context) {
            while(1)switch(_context.n){
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
function demoForOfAndIterators() {
    var iterableObject = _defineProperty({}, Symbol.iterator, function() {
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
        for(_iterator.s(); !(_step = _iterator.n()).done;){
            var item = _step.value;
            results.push(item);
        }
    } catch (err) {
        _iterator.e(err);
    } finally{
        _iterator.f();
    }
    return results;
}
// ../es-samples/samples/es2015/let-declarations.js
function demoLet() {
    var blockScopedVar = "initial";
    if (true) {
        var blockScopedVar2 = "shadowed inside block";
    }
    return blockScopedVar;
}
// ../es-samples/samples/es2015/map.js
function demoMap() {
    var map = /* @__PURE__ */ new Map();
    var keyObj = {
        id: 1
    };
    map.set(keyObj, "metadata");
    return map.has(keyObj) && map.get(keyObj) === "metadata";
}
// ../es-samples/samples/es2015/math-sign.js
function demoMathSign() {
    return {
        pos: Math.sign(5),
        neg: Math.sign(-5),
        zero: Math.sign(0)
    };
}
// ../es-samples/samples/es2015/math-trunc.js
function demoMathTrunc() {
    return Math.trunc(42.99);
}
// ../es-samples/samples/es2015/modules.js
var moduleFeatureDemo = "This variable is exported using ES2015 module syntax.";
// ../es-samples/samples/es2015/number-is-integer.js
function demoNumberIsInteger() {
    return {
        isInt: Number.isInteger(42),
        isFloat: Number.isInteger(42.5)
    };
}
// ../es-samples/samples/es2015/number-is-nan.js
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
        binaryValue: binaryValue,
        octalValue: octalValue
    };
}
// ../es-samples/samples/es2015/object-assign.js
function demoObjectAssign() {
    return Object.assign({}, {
        a: 1
    }, {
        b: 2
    });
}
// ../es-samples/samples/es2015/object-is.js
function demoObjectIs() {
    return {
        nanCheck: Object.is(NaN, NaN),
        zeroCheck: Object.is(0, -0)
    };
}
// ../es-samples/samples/es2015/promises.js
function demoPromise() {
    var shouldResolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
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
function demoReflect() {
    var obj = {
        a: 1
    };
    Reflect.set(obj, "b", 2);
    return Reflect.get(obj, "b");
}
// ../es-samples/samples/es2015/rest-parameters.js
function demoRestParameters(first) {
    for(var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        rest[_key - 1] = arguments[_key];
    }
    return {
        first: first,
        rest: rest
    };
}
// ../es-samples/samples/es2015/set.js
function demoSet() {
    var set = /* @__PURE__ */ new Set([
        1,
        2,
        2,
        3
    ]);
    return set.size === 3 && set.has(2);
}
// ../es-samples/samples/es2015/spread-syntax.js
function demoSpreadSyntax() {
    var parts = [
        2,
        3
    ];
    return [
        1
    ].concat(parts, [
        4
    ]);
}
// ../es-samples/samples/es2015/string-ends-with.js
function demoStringEndsWith() {
    return "ECMAScript".endsWith("Script");
}
// ../es-samples/samples/es2015/string-includes.js
function demoStringIncludes() {
    return "ECMAScript".includes("Script");
}
// ../es-samples/samples/es2015/string-repeat.js
function demoStringRepeat() {
    return "abc".repeat(3);
}
// ../es-samples/samples/es2015/string-starts-with.js
function demoStringStartsWith() {
    return "ECMAScript".startsWith("ECMA");
}
// ../es-samples/samples/es2015/symbols.js
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
// ../es-samples/samples/es2015/template-literals.js
function demoTemplateLiterals() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "World";
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
    var basicTemplate = "Hello, ".concat(name, "! You have ").concat(count, " notifications.");
    function highlight(strings) {
        for(var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++){
            values[_key2 - 1] = arguments[_key2];
        }
        return strings.reduce(function(acc, str, i) {
            var val = values[i] !== void 0 ? "[".concat(values[i], "]") : "";
            return acc + str + val;
        }, "");
    }
    var taggedResult = highlight(_templateObject || (_templateObject = _taggedTemplateLiteral([
        "User ",
        " has ",
        " items."
    ])), name, count);
    return {
        basicTemplate: basicTemplate,
        taggedResult: taggedResult
    };
}
// ../es-samples/samples/es2015/weak-map.js
function demoWeakMap() {
    var weakMap = /* @__PURE__ */ new WeakMap();
    var key = {
        name: "temp"
    };
    weakMap.set(key, "data");
    return weakMap.has(key);
}
// ../es-samples/samples/es2015/weak-set.js
function demoWeakSet() {
    var weakSet = /* @__PURE__ */ new WeakSet();
    var obj = {
        name: "temp"
    };
    weakSet.add(obj);
    return weakSet.has(obj);
}
