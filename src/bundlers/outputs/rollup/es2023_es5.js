var SampleBundle = (function (exports) {
  'use strict';

  /**
   * ECMAScript 2023 (14th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/14.0/
   */

  /*
   * Array.prototype.findLastIndex()
   * Iterates through an array in reverse order to find the index of the first element satisfying the predicate.
   * Spec: https://262.ecma-international.org/14.0/#sec-array.prototype.findlastindex
   */
  function demoArrayFindLastIndex() {
    var numbers = [5, 12, 50, 130, 44, 130];
    return numbers.findLastIndex(function (n) {
      return n > 100;
    }); // 5
  }

  /**
   * ECMAScript 2023 (14th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/14.0/
   */

  /*
   * Array.prototype.findLast()
   * Iterates through an array in reverse order to find the value of the first element satisfying the predicate.
   * Spec: https://262.ecma-international.org/14.0/#sec-array.prototype.findlast
   */
  function demoArrayFindLast() {
    var numbers = [5, 12, 50, 130, 44, 130];
    return numbers.findLast(function (n) {
      return n > 100;
    }); // 130
  }

  /**
   * ECMAScript 2023 (14th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/14.0/
   */

  /*
   * Array.prototype.toReversed
   * Returns a new array with the elements in reversed order without mutating the original array.
   * Spec: https://262.ecma-international.org/14.0/#sec-array.prototype.toreversed
   */
  function demoArrayToReversed() {
    var original = [1, 2, 3];
    var reversed = original.toReversed();
    return {
      original: original,
      reversed: reversed
    };
  }

  require("core-js/modules/es.array.sort.js");
  /**
   * ECMAScript 2023 (14th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/14.0/
   */

  /*
   * Array.prototype.toSorted
   * Returns a new array with the elements sorted in ascending order without mutating the original array.
   * Spec: https://262.ecma-international.org/14.0/#sec-array.prototype.tosorted
   */
  function demoArrayToSorted() {
    var original = [3, 1, 2];
    var sorted = original.toSorted(function (a, b) {
      return a - b;
    });
    return {
      original: original,
      sorted: sorted
    };
  }

  /**
   * ECMAScript 2023 (14th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/14.0/
   */

  /*
   * Array.prototype.toSpliced
   * Returns a new array with some elements removed and/or replaced at a given index without mutating the original array.
   * Spec: https://262.ecma-international.org/14.0/#sec-array.prototype.tospliced
   */
  function demoArrayToSpliced() {
    var original = [1, 2, 3, 4];
    var spliced = original.toSpliced(1, 2, 99);
    return {
      original: original,
      spliced: spliced
    };
  }

  /**
   * ECMAScript 2023 (14th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/14.0/
   */

  /*
   * Array.prototype.with
   * Returns a new array with the element at the given index replaced with the given value without mutating the original array.
   * Spec: https://262.ecma-international.org/14.0/#sec-array.prototype.with
   */
  function demoArrayWith() {
    var original = ["a", "b", "c"];
    var replaced = original.with(1, "z");
    return {
      original: original,
      replaced: replaced
    };
  }

  /**
   * ECMAScript 2023 (14th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/14.0/
   */

  /*
   * Hashbang Grammar (#!)
   * Standardizes syntax stripping for executable scripts starting with `#!` (hashbang/shebang) on the very first line
   * of a source file, allowing JavaScript files to run directly in Unix-like CLI environments without syntax errors.
   * Note: Notice the `#!/usr/bin/env node` at line 1 of this file demonstrating this syntax!
   * Spec: https://262.ecma-international.org/14.0/#sec-hashbang
   */
  var hashbangDemo = "This file begins with a valid ES2023 hashbang comment on line 1.";

  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.string.iterator.js");
  require("core-js/modules/es.weak-map.js");
  require("core-js/modules/web.dom-collections.iterator.js");
  /**
   * ECMAScript 2023 (14th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/14.0/
   */

  /*
   * Symbols as WeakMap and WeakSet Keys
   * Expands `WeakMap` keys and `WeakSet` values to allow non-registered Symbol primitives (symbols created with `Symbol()`
   * rather than `Symbol.for()`) in addition to object references, since non-registered symbols have unique identities.
   * Spec: https://262.ecma-international.org/14.0/#sec-weakmap-objects
   */
  function demoSymbolsAsWeakKeys() {
    var weakMap = new WeakMap();
    var keySymbol = Symbol("weakKey");
    weakMap.set(keySymbol, "associated metadata");
    return {
      hasKey: weakMap.has(keySymbol),
      value: weakMap.get(keySymbol)
    };
  }

  exports.demoArrayFindLast = demoArrayFindLast;
  exports.demoArrayFindLastIndex = demoArrayFindLastIndex;
  exports.demoArrayToReversed = demoArrayToReversed;
  exports.demoArrayToSorted = demoArrayToSorted;
  exports.demoArrayToSpliced = demoArrayToSpliced;
  exports.demoArrayWith = demoArrayWith;
  exports.demoSymbolsAsWeakKeys = demoSymbolsAsWeakKeys;
  exports.hashbangDemo = hashbangDemo;

  return exports;

})({});
//# sourceMappingURL=es2023_es5.js.101_1789571223024_6f7qi.tmp.map
