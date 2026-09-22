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
    get demoArrayBufferResize () {
        return demoArrayBufferResize;
    },
    get demoArrayBufferTransfer () {
        return demoArrayBufferTransfer;
    },
    get demoAtomicsWaitAsync () {
        return demoAtomicsWaitAsync;
    },
    get demoMapGroupBy () {
        return demoMapGroupBy;
    },
    get demoObjectGroupBy () {
        return demoObjectGroupBy;
    },
    get demoPromiseWithResolvers () {
        return demoPromiseWithResolvers;
    },
    get demoRegExpVFlag () {
        return demoRegExpVFlag;
    },
    get demoStringIsWellFormed () {
        return demoStringIsWellFormed;
    },
    get demoStringToWellFormed () {
        return demoStringToWellFormed;
    }
});
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array-buffer.constructor.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.typed-array.int32-array.js");
require("core-js/modules/es.typed-array.copy-within.js");
require("core-js/modules/es.typed-array.every.js");
require("core-js/modules/es.typed-array.fill.js");
require("core-js/modules/es.typed-array.filter.js");
require("core-js/modules/es.typed-array.find.js");
require("core-js/modules/es.typed-array.find-index.js");
require("core-js/modules/es.typed-array.for-each.js");
require("core-js/modules/es.typed-array.includes.js");
require("core-js/modules/es.typed-array.index-of.js");
require("core-js/modules/es.typed-array.iterator.js");
require("core-js/modules/es.typed-array.join.js");
require("core-js/modules/es.typed-array.last-index-of.js");
require("core-js/modules/es.typed-array.map.js");
require("core-js/modules/es.typed-array.reduce.js");
require("core-js/modules/es.typed-array.reduce-right.js");
require("core-js/modules/es.typed-array.reverse.js");
require("core-js/modules/es.typed-array.set.js");
require("core-js/modules/es.typed-array.slice.js");
require("core-js/modules/es.typed-array.some.js");
require("core-js/modules/es.typed-array.sort.js");
require("core-js/modules/es.typed-array.subarray.js");
require("core-js/modules/es.typed-array.to-locale-string.js");
require("core-js/modules/es.typed-array.to-string.js");
require("core-js/modules/esnext.map.group-by.js");
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
// ../es-samples/samples/es2024/array-buffer-resize.js
function demoArrayBufferResize() {
    var buffer = new ArrayBuffer(8, {
        maxByteLength: 32
    });
    buffer.resize(16);
    return buffer.byteLength;
}
// ../es-samples/samples/es2024/array-buffer-transfer.js
function demoArrayBufferTransfer() {
    var buffer = new ArrayBuffer(8);
    var newBuffer = buffer.transfer(16);
    return {
        isDetached: buffer.detached,
        newLength: newBuffer.byteLength
    };
}
// ../es-samples/samples/es2024/atomics-wait-async.js
function demoAtomicsWaitAsync() {
    return _demoAtomicsWaitAsync.apply(this, arguments);
} // ../es-samples/samples/es2024/map-group-by.js
function _demoAtomicsWaitAsync() {
    _demoAtomicsWaitAsync = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee() {
        var sab, int32, waitResult, outcome;
        return _regenerator().w(function(_context) {
            while(1)switch(_context.n){
                case 0:
                    sab = new SharedArrayBuffer(1024);
                    int32 = new Int32Array(sab);
                    waitResult = Atomics.waitAsync(int32, 0, 0, 50);
                    _context.n = 1;
                    return waitResult.value;
                case 1:
                    outcome = _context.v;
                    return _context.a(2, outcome);
            }
        }, _callee);
    }));
    return _demoAtomicsWaitAsync.apply(this, arguments);
}
function demoMapGroupBy() {
    var inventory = [
        {
            name: "Banana",
            quantity: 0
        },
        {
            name: "Cherries",
            quantity: 5
        }
    ];
    return Map.groupBy(inventory, function(item) {
        return item.quantity === 0 ? "restock" : "ok";
    });
}
// ../es-samples/samples/es2024/object-group-by.js
function demoObjectGroupBy() {
    var inventory = [
        {
            name: "Asparagus",
            type: "vegetable"
        },
        {
            name: "Banana",
            type: "fruit"
        }
    ];
    return Object.groupBy(inventory, function(item) {
        return item.type;
    });
}
// ../es-samples/samples/es2024/promise-with-resolvers.js
function demoPromiseWithResolvers() {
    return _demoPromiseWithResolvers.apply(this, arguments);
} // ../es-samples/samples/es2024/regexp-v-flag.js
function _demoPromiseWithResolvers() {
    _demoPromiseWithResolvers = _asyncToGenerator(/*#__PURE__*/ _regenerator().m(function _callee2() {
        var _Promise$withResolver, promise, resolve, reject, result;
        return _regenerator().w(function(_context2) {
            while(1)switch(_context2.n){
                case 0:
                    _Promise$withResolver = Promise.withResolvers(), promise = _Promise$withResolver.promise, resolve = _Promise$withResolver.resolve, reject = _Promise$withResolver.reject;
                    setTimeout(function() {
                        return resolve("Resolved via withResolvers");
                    }, 10);
                    _context2.n = 1;
                    return promise;
                case 1:
                    result = _context2.v;
                    return _context2.a(2, result);
            }
        }, _callee2);
    }));
    return _demoPromiseWithResolvers.apply(this, arguments);
}
function demoRegExpVFlag() {
    var nonAlphaGreek = new RegExp("^[\\u0370-\\u0373--\\u0375-\\u0377--\\u037A-\\u037D--\\u037F--\\u0384--\\u0386--\\u0388-\\u038A--\\u038C--\\u038E-\\u03A1--\\u03A3-\\u03E1--\\u03F0-\\u03FF--\\u1D26-\\u1D2A--\\u1D5D-\\u1D61--\\u1D66-\\u1D6A--\\u1DBF--\\u1F00-\\u1F15--\\u1F18-\\u1F1D--\\u1F20-\\u1F45--\\u1F48-\\u1F4D--\\u1F50-\\u1F57--\\u1F59--\\u1F5B--\\u1F5D--\\u1F5F-\\u1F7D--\\u1F80-\\u1FB4--\\u1FB6-\\u1FC4--\\u1FC6-\\u1FD3--\\u1FD6-\\u1FDB--\\u1FDD-\\u1FEF--\\u1FF2-\\u1FF4--\\u1FF6-\\u1FFE--\\u2126--\\uAB65--\\u{10140}-\\u{1018E}--\\u{101A0}--\\u{1D200}-\\u{1D245}--\\u03B1]+$", "v");
    var emojiFlagRegex = new RegExp("^\\p{RGI_Emoji_Flag_Sequence}$", "v");
    return {
        matchesBeta: nonAlphaGreek.test("\u03B2"),
        // true (beta)
        matchesAlpha: nonAlphaGreek.test("\u03B1"),
        // false (alpha subtracted)
        matchesFlag: emojiFlagRegex.test("\uD83C\uDDFA\uD83C\uDDF8")
    };
}
// ../es-samples/samples/es2024/string-is-well-formed.js
function demoStringIsWellFormed() {
    var wellFormed = "Hello";
    var illFormed = "Hello \uD800";
    return {
        wellFormedCheck: wellFormed.isWellFormed(),
        illFormedCheck: illFormed.isWellFormed()
    };
}
// ../es-samples/samples/es2024/string-to-well-formed.js
function demoStringToWellFormed() {
    var illFormed = "Hello \uD800 World";
    return illFormed.toWellFormed();
}
