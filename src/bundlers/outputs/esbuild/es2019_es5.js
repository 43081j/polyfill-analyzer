// ../es-samples/samples/es2019/array-flat-map.js
import "core-js/modules/es.array.flat-map.js";
import "core-js/modules/es.array.unscopables.flat-map.js";
import "core-js/modules/es.object.to-string.js";
function demoArrayFlatMap() {
  var sentences = ["hello world", "ECMAScript 2019"];
  return sentences.flatMap(function(s) {
    return s.split(" ");
  });
}

// ../es-samples/samples/es2019/array-flat.js
import "core-js/modules/es.array.flat.js";
import "core-js/modules/es.array.unscopables.flat.js";
function demoArrayFlat() {
  var nested = [1, [2, [3, [4]]]];
  return nested.flat(2);
}

// ../es-samples/samples/es2019/function-to-string.js
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
function demoFunctionToString() {
  function sample() {
    return 1;
  }
  return sample.toString();
}

// ../es-samples/samples/es2019/object-from-entries.js
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.object.from-entries.js";
import "core-js/modules/es.object.to-string.js";
function demoObjectFromEntries() {
  var entries = [["name", "Alice"], ["age", 28], ["city", "Seattle"]];
  var obj = Object.fromEntries(entries);
  var scores = {
    math: 95,
    history: 80,
    science: 92
  };
  var highScores = Object.fromEntries(Object.entries(scores).filter(function(entry) {
    return entry[1] >= 90;
  }));
  return {
    obj,
    highScores
  };
}

// ../es-samples/samples/es2019/optional-catch-binding.js
import "core-js/modules/es.object.keys.js";
function demoOptionalCatchBinding(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (_unused) {
    return {
      error: "Invalid JSON format"
    };
  }
}

// ../es-samples/samples/es2019/stable-sort.js
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.sort.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
function demoStableSort() {
  var items = [{
    name: "First",
    val: 5
  }, {
    name: "Second",
    val: 2
  }, {
    name: "Third",
    val: 5
  }, {
    name: "Fourth",
    val: 2
  }];
  items.sort(function(a, b) {
    return a.val - b.val;
  });
  return items.map(function(i) {
    return i.name;
  });
}

// ../es-samples/samples/es2019/string-trim-end.js
import "core-js/modules/es.string.trim-end.js";
function demoStringTrimEnd() {
  var padded = "   ECMAScript 2019   ";
  return padded.trimEnd();
}

// ../es-samples/samples/es2019/string-trim-start.js
import "core-js/modules/es.string.trim-start.js";
function demoStringTrimStart() {
  var padded = "   ECMAScript 2019   ";
  return padded.trimStart();
}

// ../es-samples/samples/es2019/symbol-description.js
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
function demoSymbolDescription() {
  var sym = Symbol("custom identifier");
  return sym.description;
}

// ../es-samples/samples/es2019/well-formed-json.js
function demoWellFormedJSON() {
  var serialized = JSON.stringify("\uD800");
  return serialized;
}
export {
  demoArrayFlat,
  demoArrayFlatMap,
  demoFunctionToString,
  demoObjectFromEntries,
  demoOptionalCatchBinding,
  demoStableSort,
  demoStringTrimEnd,
  demoStringTrimStart,
  demoSymbolDescription,
  demoWellFormedJSON
};
//# sourceMappingURL=es2019_es5.js.101_1789571210545_k0erb.tmp.map
