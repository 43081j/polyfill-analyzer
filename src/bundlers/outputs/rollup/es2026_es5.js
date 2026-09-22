var SampleBundle = (function (exports) {
  'use strict';

  /**
   * ECMAScript 2026 (17th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/17.0/
   */

  /*
   * Atomics.pause()
   * A micro-architectural CPU instruction hint for spinlocks and busy-waiting loops in multithreaded environments.
   * Signals to the processor that the thread is in a spin-wait loop, reducing power consumption and memory bus contention.
   * Spec: https://tc39.es/ecma262/#sec-atomics.pause
   */
  function demoAtomicsPause() {
    var isSupported = typeof Atomics.pause === "function";
    if (isSupported) {
      // In a real spin-lock loop: while(!flag) { Atomics.pause(); }
      Atomics.pause();
    }
    return {
      isSupported: isSupported
    };
  }

  /**
   * ECMAScript 2026 (17th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/17.0/
   */

  /*
   * Error.isError()
   * A static method that reliably detects whether a value is an Error instance (including built-in errors, custom subclasses,
   * and DOMException objects), working across different realms (iframes, worker threads, VM contexts) where `instanceof Error` fails.
   * Spec: https://tc39.es/ecma262/#sec-error.iserror
   */
  function demoErrorIsError() {
    var standardError = new TypeError("Test error");
    var nonError = {
      message: "Looks like error, but isn't"
    };
    if (typeof Error.isError === "function") {
      return {
        standardCheck: Error.isError(standardError),
        // true
        nonErrorCheck: Error.isError(nonError) // false
      };
    }
    return {
      standardCheck: standardError instanceof Error,
      nonErrorCheck: nonError instanceof Error,
      isPolyfill: true
    };
  }

  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 2026 (17th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/17.0/
   */

  /*
   * Math.sumPrecise()
   * Computes the exact floating-point sum of an iterable of numbers without losing precision from intermediate floating-point
   * rounding errors, implementing compensated summation techniques.
   * Spec: https://tc39.es/ecma262/#sec-math.sumprecise
   */
  function demoMathSumPrecise() {
    // A classic floating point rounding error: 0.1 + 0.2 != 0.3
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

  require("core-js/modules/es.regexp.constructor.js");
  require("core-js/modules/es.regexp.exec.js");
  require("core-js/modules/es.regexp.to-string.js");
  require("core-js/modules/es.string.replace.js");
  /**
   * ECMAScript 2026 (17th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/17.0/
   */

  /*
   * RegExp.escape()
   * A static method that escapes special regular expression syntax characters within a string, allowing user-supplied
   * literal text to be safely incorporated into dynamically constructed regular expressions without regex injection risks.
   * Spec: https://tc39.es/ecma262/#sec-regexp.escape
   */
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

    // Demonstrating the pattern behavior if polyfilled or running on older runtime
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

  require("core-js/modules/es.array.from.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.array-buffer.constructor.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.regexp.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/es.typed-array.uint8-array.js");
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
  /**
   * ECMAScript 2026 (17th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/17.0/
   */

  /*
   * Uint8Array Base64 Encoding/Decoding
   * Methods on Uint8Array to encode bytes to Base64 (toBase64) and parse Base64 strings to bytes (fromBase64).
   * Spec: https://tc39.es/ecma262/#sec-uint8array.prototype.tobase64
   */
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

  require("core-js/modules/es.array.from.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.array-buffer.constructor.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.regexp.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/es.typed-array.uint8-array.js");
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
  /**
   * ECMAScript 2026 (17th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/17.0/
   */

  /*
   * Uint8Array Hexadecimal Encoding/Decoding
   * Methods on Uint8Array to encode bytes to hexadecimal (toHex) and parse hex strings to bytes (fromHex).
   * Spec: https://tc39.es/ecma262/#sec-uint8array.prototype.tohex
   */
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

  exports.demoAtomicsPause = demoAtomicsPause;
  exports.demoErrorIsError = demoErrorIsError;
  exports.demoMathSumPrecise = demoMathSumPrecise;
  exports.demoRegExpEscape = demoRegExpEscape;
  exports.demoUint8ArrayBase64 = demoUint8ArrayBase64;
  exports.demoUint8ArrayHex = demoUint8ArrayHex;

  return exports;

})({});
//# sourceMappingURL=es2026_es5.js.101_1789571227644_tug39.tmp.map
