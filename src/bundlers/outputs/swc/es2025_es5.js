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
    get demoDuplicateNamedCaptureGroups () {
        return demoDuplicateNamedCaptureGroups;
    },
    get demoFloat16Array () {
        return demoFloat16Array;
    },
    get demoImportAttributes () {
        return demoImportAttributes;
    },
    get demoIteratorHelpers () {
        return demoIteratorHelpers;
    },
    get demoMathF16round () {
        return demoMathF16round;
    },
    get demoPromiseTry () {
        return demoPromiseTry;
    },
    get demoSetDifference () {
        return demoSetDifference;
    },
    get demoSetIntersection () {
        return demoSetIntersection;
    },
    get demoSetIsDisjointFrom () {
        return demoSetIsDisjointFrom;
    },
    get demoSetIsSubsetOf () {
        return demoSetIsSubsetOf;
    },
    get demoSetIsSupersetOf () {
        return demoSetIsSupersetOf;
    },
    get demoSetSymmetricDifference () {
        return demoSetSymmetricDifference;
    },
    get demoSetUnion () {
        return demoSetUnion;
    }
});
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.replace.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-names.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.promise.try.js");
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
function _wrapRegExp() {
    _wrapRegExp = function _wrapRegExp(e, r) {
        return new BabelRegExp(e, void 0, r);
    };
    var e = RegExp.prototype, r = new WeakMap();
    function BabelRegExp(e, t, p) {
        var o = RegExp(e, t);
        return r.set(o, p || r.get(e)), _setPrototypeOf(o, BabelRegExp.prototype);
    }
    function buildGroups(e, t) {
        var p = r.get(t);
        return Object.keys(p).reduce(function(r, t) {
            var o = p[t];
            if ("number" == typeof o) r[t] = e[o];
            else {
                for(var i = 0; void 0 === e[o[i]] && i + 1 < o.length;)i++;
                r[t] = e[o[i]];
            }
            return r;
        }, Object.create(null));
    }
    return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function(r) {
        var t = e.exec.call(this, r);
        if (t) {
            t.groups = buildGroups(t, this);
            var p = t.indices;
            p && (p.groups = buildGroups(p, this));
        }
        return t;
    }, BabelRegExp.prototype[Symbol.replace] = function(t, p) {
        if ("string" == typeof p) {
            var o = r.get(this);
            return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)(>|$)/g, function(e, r, t) {
                if ("" === t) return e;
                var _$p = o[r];
                return Array.isArray(_$p) ? "$" + _$p.join("$") : "number" == typeof _$p ? "$" + _$p : "";
            }));
        }
        if ("function" == typeof p) {
            var i = this;
            return e[Symbol.replace].call(this, t, function() {
                var e = arguments;
                return "object" != _typeof(e[e.length - 1]) && (e = [].slice.call(e)).push(buildGroups(e, i)), p.apply(this, e);
            });
        }
        return e[Symbol.replace].call(this, t, p);
    }, _wrapRegExp.apply(this, arguments);
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
function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
        var i = n[a](c), u = i.value;
    } catch (n) {
        return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
    return function() {
        var t = this, e = arguments;
        return new Promise(function(r, o) {
            var a = n.apply(t, e);
            function _next(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
            }
            function _throw(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
            }
            _next(void 0);
        });
    };
}
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = function __esm(fn, res) {
    return function __init() {
        return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    };
};
var __export = function __export(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
// ../es-samples/package.json
var package_exports = {};
__export(package_exports, {
    default: function _default() {
        return package_default;
    }
});
var package_default;
var init_package = __esm({
    "../es-samples/package.json": function _esSamples_packageJson() {
        package_default = {
            name: "es-samples",
            version: "1.0.0",
            description: "ECMAScript code samples library (ES2011-ES2026)",
            type: "module",
            main: "./samples/index.js",
            exports: {
                ".": "./samples/index.js",
                "./samples": "./samples/index.js",
                "./samples/index.js": "./samples/index.js",
                "./features.json": "./features.json",
                "./features": "./features.json",
                "./samples/*": "./samples/*",
                "./*": "./samples/*"
            },
            scripts: {
                "build:features": "node scripts/build-features.js",
                test: "node scripts/build-features.js && node samples/test.js"
            },
            keywords: [
                "ecmascript",
                "javascript",
                "es5",
                "es2011",
                "es2015",
                "es2026"
            ],
            author: "",
            license: "MIT",
            dependencies: {
                "@mdn/browser-compat-data": "^8.0.6",
                "web-features": "^3.32.0"
            }
        };
    }
});
// ../es-samples/samples/es2025/float16-array.js
function demoFloat16Array() {
    var f16 = new Float16Array([
        1.5,
        2.5
    ]);
    return {
        len: f16.length,
        bytes: Float16Array.BYTES_PER_ELEMENT
    };
}
// ../es-samples/samples/es2025/import-attributes.js
function demoImportAttributes() {
    return _demoImportAttributes.apply(this, arguments);
} // ../es-samples/samples/es2025/iterator-helpers.js
function _demoImportAttributes() {
    _demoImportAttributes = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee() {
        var _pkg$default$name, _pkg$default, pkg, _t;
        return _regenerator().w(function(_context2) {
            while(1)switch(_context2.p = _context2.n){
                case 0:
                    _context2.p = 0;
                    _context2.n = 1;
                    return Promise.resolve().then(function() {
                        return init_package(), package_exports;
                    });
                case 1:
                    pkg = _context2.v;
                    return _context2.a(2, (_pkg$default$name = (_pkg$default = pkg.default) === null || _pkg$default === void 0 ? void 0 : _pkg$default.name) !== null && _pkg$default$name !== void 0 ? _pkg$default$name : "es-samples");
                case 2:
                    _context2.p = 2;
                    _t = _context2.v;
                    return _context2.a(2, "es-samples");
            }
        }, _callee, null, [
            [
                0,
                2
            ]
        ]);
    }));
    return _demoImportAttributes.apply(this, arguments);
}
function demoIteratorHelpers() {
    var _marked = /*#__PURE__*/ _regenerator().m(infiniteNumbers);
    function infiniteNumbers() {
        var n;
        return _regenerator().w(function(_context) {
            while(1)switch(_context.n){
                case 0:
                    n = 1;
                case 1:
                    if (!true) {
                        _context.n = 3;
                        break;
                    }
                    _context.n = 2;
                    return n++;
                case 2:
                    _context.n = 1;
                    break;
                case 3:
                    return _context.a(2);
            }
        }, _marked);
    }
    var result = infiniteNumbers().filter(function(n) {
        return n % 2 === 0;
    }).map(function(n) {
        return n * 10;
    }).drop(1).take(3).toArray();
    return result;
}
// ../es-samples/samples/es2025/math-f16round.js
function demoMathF16round() {
    return Math.f16round(1.337);
}
// ../es-samples/samples/es2025/promise-try.js
function demoPromiseTry() {
    return _demoPromiseTry.apply(this, arguments);
} // ../es-samples/samples/es2025/regexp-duplicate-named-capture-groups.js
function _demoPromiseTry() {
    _demoPromiseTry = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee2() {
        var shouldThrowSync, possiblySyncOperation, res, _args3 = arguments, _t2;
        return _regenerator().w(function(_context3) {
            while(1)switch(_context3.p = _context3.n){
                case 0:
                    possiblySyncOperation = function _possiblySyncOperatio() {
                        if (shouldThrowSync) {
                            throw new Error("Synchronous failure");
                        }
                        return "Success value";
                    };
                    shouldThrowSync = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;
                    _context3.p = 1;
                    _context3.n = 2;
                    return Promise.try(possiblySyncOperation);
                case 2:
                    res = _context3.v;
                    return _context3.a(2, {
                        success: res
                    });
                case 3:
                    _context3.p = 3;
                    _t2 = _context3.v;
                    return _context3.a(2, {
                        error: _t2.message
                    });
            }
        }, _callee2, null, [
            [
                1,
                3
            ]
        ]);
    }));
    return _demoPromiseTry.apply(this, arguments);
}
function demoDuplicateNamedCaptureGroups() {
    var regex = /*#__PURE__*/ _wrapRegExp(/(\d{4})-[a-z]+|[a-z]+-(\d{4})/i, {
        year: [
            1,
            2
        ]
    });
    var match1 = regex.exec("2025-june");
    var match2 = regex.exec("june-2025");
    return {
        firstFormatYear: match1.groups.year,
        // "2025"
        secondFormatYear: match2.groups.year
    };
}
// ../es-samples/samples/es2025/set-difference.js
function demoSetDifference() {
    var setA = /* @__PURE__ */ new Set([
        1,
        2,
        3
    ]);
    var setB = /* @__PURE__ */ new Set([
        2,
        3,
        4
    ]);
    return Array.from(setA.difference(setB));
}
// ../es-samples/samples/es2025/set-intersection.js
function demoSetIntersection() {
    var setA = /* @__PURE__ */ new Set([
        1,
        2,
        3
    ]);
    var setB = /* @__PURE__ */ new Set([
        2,
        3,
        4
    ]);
    return Array.from(setA.intersection(setB));
}
// ../es-samples/samples/es2025/set-is-disjoint-from.js
function demoSetIsDisjointFrom() {
    var setA = /* @__PURE__ */ new Set([
        1,
        2
    ]);
    var setB = /* @__PURE__ */ new Set([
        3,
        4
    ]);
    return setA.isDisjointFrom(setB);
}
// ../es-samples/samples/es2025/set-is-subset-of.js
function demoSetIsSubsetOf() {
    var setA = /* @__PURE__ */ new Set([
        1,
        2
    ]);
    var setB = /* @__PURE__ */ new Set([
        1,
        2,
        3
    ]);
    return setA.isSubsetOf(setB);
}
// ../es-samples/samples/es2025/set-is-superset-of.js
function demoSetIsSupersetOf() {
    var setA = /* @__PURE__ */ new Set([
        1,
        2,
        3
    ]);
    var setB = /* @__PURE__ */ new Set([
        1,
        2
    ]);
    return setA.isSupersetOf(setB);
}
// ../es-samples/samples/es2025/set-symmetric-difference.js
function demoSetSymmetricDifference() {
    var setA = /* @__PURE__ */ new Set([
        1,
        2,
        3
    ]);
    var setB = /* @__PURE__ */ new Set([
        2,
        3,
        4
    ]);
    return Array.from(setA.symmetricDifference(setB));
}
// ../es-samples/samples/es2025/set-union.js
function demoSetUnion() {
    var setA = /* @__PURE__ */ new Set([
        1,
        2
    ]);
    var setB = /* @__PURE__ */ new Set([
        2,
        3
    ]);
    return Array.from(setA.union(setB));
}
