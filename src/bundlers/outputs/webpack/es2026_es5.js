/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_require__ = {};
/******/ })();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.demoAtomicsPause = demoAtomicsPause;
exports.demoErrorIsError = demoErrorIsError;
exports.demoMathSumPrecise = demoMathSumPrecise;
exports.demoRegExpEscape = demoRegExpEscape;
exports.demoUint8ArrayBase64 = demoUint8ArrayBase64;
exports.demoUint8ArrayHex = demoUint8ArrayHex;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array-buffer.constructor.js");
require("core-js/modules/es.array-buffer.detached.js");
require("core-js/modules/es.array-buffer.transfer.js");
require("core-js/modules/es.array-buffer.transfer-to-fixed-length.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.dot-all.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.sticky.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.typed-array.uint8-array.js");
require("core-js/modules/es.typed-array.at.js");
require("core-js/modules/es.typed-array.copy-within.js");
require("core-js/modules/es.typed-array.every.js");
require("core-js/modules/es.typed-array.fill.js");
require("core-js/modules/es.typed-array.filter.js");
require("core-js/modules/es.typed-array.find.js");
require("core-js/modules/es.typed-array.find-index.js");
require("core-js/modules/es.typed-array.find-last.js");
require("core-js/modules/es.typed-array.find-last-index.js");
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
require("core-js/modules/es.typed-array.to-reversed.js");
require("core-js/modules/es.typed-array.to-sorted.js");
require("core-js/modules/es.typed-array.to-string.js");
require("core-js/modules/es.typed-array.with.js");
require("core-js/modules/esnext.math.sum-precise.js");
require("core-js/modules/esnext.regexp.escape.js");
require("core-js/modules/esnext.uint8-array.from-base64.js");
require("core-js/modules/esnext.uint8-array.from-hex.js");
require("core-js/modules/esnext.uint8-array.to-base64.js");
require("core-js/modules/esnext.uint8-array.to-hex.js");
// ../es-samples/samples/es2026/atomics-pause.js
function demoAtomicsPause() {
  var isSupported = typeof Atomics.pause === "function";
  if (isSupported) {
    Atomics.pause();
  }
  return {
    isSupported: isSupported
  };
}

// ../es-samples/samples/es2026/error-is-error.js
function demoErrorIsError() {
  var standardError = new TypeError("Test error");
  var nonError = {
    message: "Looks like error, but isn't"
  };
  if (typeof Error.isError === "function") {
    return {
      standardCheck: Error.isError(standardError),
      // true
      nonErrorCheck: Error.isError(nonError)
      // false
    };
  }
  return {
    standardCheck: standardError instanceof Error,
    nonErrorCheck: nonError instanceof Error,
    isPolyfill: true
  };
}

// ../es-samples/samples/es2026/math-sum-precise.js
function demoMathSumPrecise() {
  var numbers = [0.1, 0.2];
  if (typeof Math.sumPrecise === "function") {
    return {
      exactSum: Math.sumPrecise(numbers),
      standardSum: numbers.reduce(function (a, b) {
        return a + b;
      }, 0)
    };
  }
  return {
    standardSum: numbers.reduce(function (a, b) {
      return a + b;
    }, 0),
    note: "Math.sumPrecise not yet native in runtime; demoing standard sum comparison."
  };
}

// ../es-samples/samples/es2026/regexp-escape.js
function demoRegExpEscape() {
  var userInput = "Hello [World] (test)* +$?^|\\";
  if (typeof RegExp.escape === "function") {
    var escaped2 = RegExp.escape(userInput);
    var regex = new RegExp(escaped2);
    return {
      escaped: escaped2,
      matches: regex.test(userInput)
    };
  }
  var fallbackEscape = function fallbackEscape(str) {
    return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
  };
  var escaped = fallbackEscape(userInput);
  return {
    escaped: escaped,
    matches: new RegExp(escaped).test(userInput),
    isPolyfill: true
  };
}

// ../es-samples/samples/es2026/uint8array-base64.js
function demoUint8ArrayBase64() {
  var bytes = new Uint8Array([72, 101, 108, 108, 111]);
  if (typeof bytes.toBase64 === "function" && typeof Uint8Array.fromBase64 === "function") {
    var base64Str = bytes.toBase64();
    var decoded = Uint8Array.fromBase64(base64Str);
    return {
      base64Str: base64Str,
      decoded: Array.from(decoded)
    };
  }
  return {
    base64Str: Buffer.from(bytes).toString("base64"),
    isPolyfill: true
  };
}

// ../es-samples/samples/es2026/uint8array-hex.js
function demoUint8ArrayHex() {
  var bytes = new Uint8Array([72, 101, 108, 108, 111]);
  if (typeof bytes.toHex === "function" && typeof Uint8Array.fromHex === "function") {
    var hexStr = bytes.toHex();
    var decoded = Uint8Array.fromHex(hexStr);
    return {
      hexStr: hexStr,
      decoded: Array.from(decoded)
    };
  }
  return {
    hexStr: Buffer.from(bytes).toString("hex"),
    isPolyfill: true
  };
}