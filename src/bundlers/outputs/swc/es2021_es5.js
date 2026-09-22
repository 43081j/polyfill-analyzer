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
    get demoAggregateError () {
        return demoAggregateError;
    },
    get demoFinalizationRegistry () {
        return demoFinalizationRegistry;
    },
    get demoLogicalAssignment () {
        return demoLogicalAssignment;
    },
    get demoNumericSeparators () {
        return demoNumericSeparators;
    },
    get demoReplaceAll () {
        return demoReplaceAll;
    },
    get demoWeakRef () {
        return demoWeakRef;
    }
});
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/esnext.aggregate-error.js");
require("core-js/modules/esnext.promise.any.js");
require("core-js/modules/esnext.string.replace-all.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
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
// ../es-samples/samples/es2021/aggregate-error.js
function demoAggregateError() {
    return _demoAggregateError.apply(this, arguments);
} // ../es-samples/samples/es2021/finalization-registry.js
function _demoAggregateError() {
    _demoAggregateError = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee() {
        var rejections, _t;
        return _regenerator().w(function(_context) {
            while(1)switch(_context.p = _context.n){
                case 0:
                    rejections = [
                        Promise.reject(new Error("Fail A")),
                        Promise.reject(new Error("Fail B"))
                    ];
                    _context.p = 1;
                    _context.n = 2;
                    return Promise.any(rejections);
                case 2:
                    _context.n = 4;
                    break;
                case 3:
                    _context.p = 3;
                    _t = _context.v;
                    return _context.a(2, {
                        isAggregateError: _instanceof(_t, AggregateError),
                        errorCount: _t.errors.length
                    });
                case 4:
                    return _context.a(2);
            }
        }, _callee, null, [
            [
                1,
                3
            ]
        ]);
    }));
    return _demoAggregateError.apply(this, arguments);
}
function demoFinalizationRegistry() {
    var registry = new FinalizationRegistry(function(heldValue) {});
    var target = {
        data: "valuable"
    };
    registry.register(target, "token");
    return typeof registry.register === "function";
}
// ../es-samples/samples/es2021/logical-assignment.js
function demoLogicalAssignment() {
    var a = 0;
    a || (a = 10);
    var b = "hello";
    b && (b = b.toUpperCase());
    var c = null;
    c !== null && c !== void 0 ? c : c = "default";
    return {
        a: a,
        b: b,
        c: c
    };
}
// ../es-samples/samples/es2021/numeric-separators.js
function demoNumericSeparators() {
    var oneBillion = 1e9;
    var hexBytes = 4293713502;
    var bigIntAmount = 9000000000000000n;
    return {
        oneBillion: oneBillion,
        hexBytes: hexBytes,
        bigIntAmountString: bigIntAmount.toString()
    };
}
// ../es-samples/samples/es2021/string-replace-all.js
function demoReplaceAll() {
    var quote = "To be or not to be, that is the question.";
    var replaced = quote.replaceAll("be", "code");
    return replaced;
}
// ../es-samples/samples/es2021/weak-ref.js
function demoWeakRef() {
    var target = {
        data: "valuable"
    };
    var ref = new WeakRef(target);
    var retrieved = ref.deref();
    return (retrieved === null || retrieved === void 0 ? void 0 : retrieved.data) === "valuable";
}
