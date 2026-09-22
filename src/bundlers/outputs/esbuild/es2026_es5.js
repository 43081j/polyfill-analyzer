// ../es-samples/samples/es2026/atomics-pause.js
function demoAtomicsPause() {
  var isSupported = typeof Atomics.pause === "function";
  if (isSupported) {
    Atomics.pause();
  }
  return {
    isSupported
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
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
function demoMathSumPrecise() {
  var numbers = [0.1, 0.2];
  if (typeof Math.sumPrecise === "function") {
    return {
      exactSum: Math.sumPrecise(numbers),
      standardSum: numbers.reduce(function(a, b) {
        return a + b;
      }, 0)
    };
  }
  return {
    standardSum: numbers.reduce(function(a, b) {
      return a + b;
    }, 0),
    note: "Math.sumPrecise not yet native in runtime; demoing standard sum comparison."
  };
}

// ../es-samples/samples/es2026/regexp-escape.js
import "core-js/modules/es.regexp.constructor.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.replace.js";
function demoRegExpEscape() {
  var userInput = "Hello [World] (test)* +$?^|\\";
  if (typeof RegExp.escape === "function") {
    var _escaped = RegExp.escape(userInput);
    var regex = new RegExp(_escaped);
    return {
      escaped: _escaped,
      matches: regex.test(userInput)
    };
  }
  var fallbackEscape = function fallbackEscape2(str) {
    return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
  };
  var escaped = fallbackEscape(userInput);
  return {
    escaped,
    matches: new RegExp(escaped).test(userInput),
    isPolyfill: true
  };
}

// ../es-samples/samples/es2026/uint8array-base64.js
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.array-buffer.constructor.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.typed-array.uint8-array.js";
import "core-js/modules/es.typed-array.copy-within.js";
import "core-js/modules/es.typed-array.every.js";
import "core-js/modules/es.typed-array.fill.js";
import "core-js/modules/es.typed-array.filter.js";
import "core-js/modules/es.typed-array.find.js";
import "core-js/modules/es.typed-array.find-index.js";
import "core-js/modules/es.typed-array.for-each.js";
import "core-js/modules/es.typed-array.includes.js";
import "core-js/modules/es.typed-array.index-of.js";
import "core-js/modules/es.typed-array.iterator.js";
import "core-js/modules/es.typed-array.join.js";
import "core-js/modules/es.typed-array.last-index-of.js";
import "core-js/modules/es.typed-array.map.js";
import "core-js/modules/es.typed-array.reduce.js";
import "core-js/modules/es.typed-array.reduce-right.js";
import "core-js/modules/es.typed-array.reverse.js";
import "core-js/modules/es.typed-array.set.js";
import "core-js/modules/es.typed-array.slice.js";
import "core-js/modules/es.typed-array.some.js";
import "core-js/modules/es.typed-array.sort.js";
import "core-js/modules/es.typed-array.subarray.js";
import "core-js/modules/es.typed-array.to-locale-string.js";
import "core-js/modules/es.typed-array.to-string.js";
function demoUint8ArrayBase64() {
  var bytes = new Uint8Array([72, 101, 108, 108, 111]);
  if (typeof bytes.toBase64 === "function" && typeof Uint8Array.fromBase64 === "function") {
    var base64Str = bytes.toBase64();
    var decoded = Uint8Array.fromBase64(base64Str);
    return {
      base64Str,
      decoded: Array.from(decoded)
    };
  }
  return {
    base64Str: Buffer.from(bytes).toString("base64"),
    isPolyfill: true
  };
}

// ../es-samples/samples/es2026/uint8array-hex.js
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.array-buffer.constructor.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.typed-array.uint8-array.js";
import "core-js/modules/es.typed-array.copy-within.js";
import "core-js/modules/es.typed-array.every.js";
import "core-js/modules/es.typed-array.fill.js";
import "core-js/modules/es.typed-array.filter.js";
import "core-js/modules/es.typed-array.find.js";
import "core-js/modules/es.typed-array.find-index.js";
import "core-js/modules/es.typed-array.for-each.js";
import "core-js/modules/es.typed-array.includes.js";
import "core-js/modules/es.typed-array.index-of.js";
import "core-js/modules/es.typed-array.iterator.js";
import "core-js/modules/es.typed-array.join.js";
import "core-js/modules/es.typed-array.last-index-of.js";
import "core-js/modules/es.typed-array.map.js";
import "core-js/modules/es.typed-array.reduce.js";
import "core-js/modules/es.typed-array.reduce-right.js";
import "core-js/modules/es.typed-array.reverse.js";
import "core-js/modules/es.typed-array.set.js";
import "core-js/modules/es.typed-array.slice.js";
import "core-js/modules/es.typed-array.some.js";
import "core-js/modules/es.typed-array.sort.js";
import "core-js/modules/es.typed-array.subarray.js";
import "core-js/modules/es.typed-array.to-locale-string.js";
import "core-js/modules/es.typed-array.to-string.js";
function demoUint8ArrayHex() {
  var bytes = new Uint8Array([72, 101, 108, 108, 111]);
  if (typeof bytes.toHex === "function" && typeof Uint8Array.fromHex === "function") {
    var hexStr = bytes.toHex();
    var decoded = Uint8Array.fromHex(hexStr);
    return {
      hexStr,
      decoded: Array.from(decoded)
    };
  }
  return {
    hexStr: Buffer.from(bytes).toString("hex"),
    isPolyfill: true
  };
}
export {
  demoAtomicsPause,
  demoErrorIsError,
  demoMathSumPrecise,
  demoRegExpEscape,
  demoUint8ArrayBase64,
  demoUint8ArrayHex
};
//# sourceMappingURL=es2026_es5.js.101_1789571227894_omloe.tmp.map
