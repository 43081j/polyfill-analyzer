/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_require__ = {};
/******/ })();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.demoArrayFindLast = demoArrayFindLast;
exports.demoArrayFindLastIndex = demoArrayFindLastIndex;
exports.demoArrayToReversed = demoArrayToReversed;
exports.demoArrayToSorted = demoArrayToSorted;
exports.demoArrayToSpliced = demoArrayToSpliced;
exports.demoArrayWith = demoArrayWith;
exports.demoSymbolsAsWeakKeys = demoSymbolsAsWeakKeys;
exports.hashbangDemo = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.find-last.js");
require("core-js/modules/es.array.find-last-index.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.to-reversed.js");
require("core-js/modules/es.array.to-sorted.js");
require("core-js/modules/es.array.to-spliced.js");
require("core-js/modules/es.array.with.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
// ../es-samples/samples/es2023/array-find-last-index.js
function demoArrayFindLastIndex() {
  var numbers = [5, 12, 50, 130, 44, 130];
  return numbers.findLastIndex(function (n) {
    return n > 100;
  });
}

// ../es-samples/samples/es2023/array-find-last.js
function demoArrayFindLast() {
  var numbers = [5, 12, 50, 130, 44, 130];
  return numbers.findLast(function (n) {
    return n > 100;
  });
}

// ../es-samples/samples/es2023/array-to-reversed.js
function demoArrayToReversed() {
  var original = [1, 2, 3];
  var reversed = original.toReversed();
  return {
    original: original,
    reversed: reversed
  };
}

// ../es-samples/samples/es2023/array-to-sorted.js
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

// ../es-samples/samples/es2023/array-to-spliced.js
function demoArrayToSpliced() {
  var original = [1, 2, 3, 4];
  var spliced = original.toSpliced(1, 2, 99);
  return {
    original: original,
    spliced: spliced
  };
}

// ../es-samples/samples/es2023/array-with.js
function demoArrayWith() {
  var original = ["a", "b", "c"];
  var replaced = original.with(1, "z");
  return {
    original: original,
    replaced: replaced
  };
}

// ../es-samples/samples/es2023/hashbang.js
var hashbangDemo = exports.hashbangDemo = "This file begins with a valid ES2023 hashbang comment on line 1.";

// ../es-samples/samples/es2023/symbols-as-weak-keys.js
function demoSymbolsAsWeakKeys() {
  var weakMap = /* @__PURE__ */new WeakMap();
  var keySymbol = Symbol("weakKey");
  weakMap.set(keySymbol, "associated metadata");
  return {
    hasKey: weakMap.has(keySymbol),
    value: weakMap.get(keySymbol)
  };
}