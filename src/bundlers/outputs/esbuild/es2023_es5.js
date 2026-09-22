// ../es-samples/samples/es2023/array-find-last-index.js
function demoArrayFindLastIndex() {
  var numbers = [5, 12, 50, 130, 44, 130];
  return numbers.findLastIndex(function(n) {
    return n > 100;
  });
}

// ../es-samples/samples/es2023/array-find-last.js
function demoArrayFindLast() {
  var numbers = [5, 12, 50, 130, 44, 130];
  return numbers.findLast(function(n) {
    return n > 100;
  });
}

// ../es-samples/samples/es2023/array-to-reversed.js
function demoArrayToReversed() {
  var original = [1, 2, 3];
  var reversed = original.toReversed();
  return {
    original,
    reversed
  };
}

// ../es-samples/samples/es2023/array-to-sorted.js
import "core-js/modules/es.array.sort.js";
function demoArrayToSorted() {
  var original = [3, 1, 2];
  var sorted = original.toSorted(function(a, b) {
    return a - b;
  });
  return {
    original,
    sorted
  };
}

// ../es-samples/samples/es2023/array-to-spliced.js
function demoArrayToSpliced() {
  var original = [1, 2, 3, 4];
  var spliced = original.toSpliced(1, 2, 99);
  return {
    original,
    spliced
  };
}

// ../es-samples/samples/es2023/array-with.js
function demoArrayWith() {
  var original = ["a", "b", "c"];
  var replaced = original.with(1, "z");
  return {
    original,
    replaced
  };
}

// ../es-samples/samples/es2023/hashbang.js
var hashbangDemo = "This file begins with a valid ES2023 hashbang comment on line 1.";

// ../es-samples/samples/es2023/symbols-as-weak-keys.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
function demoSymbolsAsWeakKeys() {
  var weakMap = /* @__PURE__ */ new WeakMap();
  var keySymbol = Symbol("weakKey");
  weakMap.set(keySymbol, "associated metadata");
  return {
    hasKey: weakMap.has(keySymbol),
    value: weakMap.get(keySymbol)
  };
}
export {
  demoArrayFindLast,
  demoArrayFindLastIndex,
  demoArrayToReversed,
  demoArrayToSorted,
  demoArrayToSpliced,
  demoArrayWith,
  demoSymbolsAsWeakKeys,
  hashbangDemo
};
//# sourceMappingURL=es2023_es5.js.101_1789571223321_98gzm.tmp.map
