var SampleBundle = (function (exports) {
  'use strict';

  require("core-js/modules/es.array.flat-map.js");
  require("core-js/modules/es.array.unscopables.flat-map.js");
  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 2019 (10th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/10.0/
   */

  /*
   * Array.prototype.flatMap()
   * Maps each element using a mapping function, then flattens the result into a new array by depth 1.
   * Spec: https://262.ecma-international.org/10.0/#sec-array.prototype.flatmap
   */
  function demoArrayFlatMap() {
    var sentences = ["hello world", "ECMAScript 2019"];
    return sentences.flatMap(function (s) {
      return s.split(" ");
    }); // ["hello", "world", "ECMAScript", "2019"]
  }

  require("core-js/modules/es.array.flat.js");
  require("core-js/modules/es.array.unscopables.flat.js");
  /**
   * ECMAScript 2019 (10th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/10.0/
   */

  /*
   * Array.prototype.flat()
   * Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
   * Spec: https://262.ecma-international.org/10.0/#sec-array.prototype.flat
   */
  function demoArrayFlat() {
    var nested = [1, [2, [3, [4]]]];
    return nested.flat(2); // [1, 2, 3, [4]]
  }

  require("core-js/modules/es.object.to-string.js");
  require("core-js/modules/es.regexp.to-string.js");
  /**
   * ECMAScript 2019 (10th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/10.0/
   */

  /*
   * Function.prototype.toString() Revision
   * Requires `Function.prototype.toString()` to return the exact source code text slice used to define the function,
   * preserving whitespace, comments, and syntax.
   * Spec: https://262.ecma-international.org/10.0/#sec-function.prototype.tostring
   */
  function demoFunctionToString() {
    function /* comment inside */sample() {
      return 1;
    }
    return sample.toString();
  }

  require("core-js/modules/es.array.filter.js");
  require("core-js/modules/es.array.iterator.js");
  require("core-js/modules/es.object.entries.js");
  require("core-js/modules/es.object.from-entries.js");
  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 2019 (10th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/10.0/
   */

  /*
   * Object.fromEntries()
   * Transforms a list of key-value pairs (such as a Map or an array of `[key, value]` arrays) into an object.
   * Acts as the inverse of `Object.entries()`.
   * Spec: https://262.ecma-international.org/10.0/#sec-object.fromentries
   */
  function demoObjectFromEntries() {
    var entries = [["name", "Alice"], ["age", 28], ["city", "Seattle"]];
    var obj = Object.fromEntries(entries);

    // Filtering an object using Object.entries and Object.fromEntries
    var scores = {
      math: 95,
      history: 80,
      science: 92
    };
    var highScores = Object.fromEntries(Object.entries(scores).filter(function (entry) {
      return entry[1] >= 90;
    }));
    return {
      obj: obj,
      highScores: highScores
    };
  }

  require("core-js/modules/es.object.keys.js");
  /**
   * ECMAScript 2019 (10th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/10.0/
   */

  /*
   * Optional Catch Binding
   * Allows omitting the exception binding variable in `catch` blocks when the thrown error object is not needed.
   * Spec: https://262.ecma-international.org/10.0/#sec-try-statement
   */
  function demoOptionalCatchBinding(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (_unused) {
      // No error parameter required
      return {
        error: "Invalid JSON format"
      };
    }
  }

  require("core-js/modules/es.array.map.js");
  require("core-js/modules/es.array.sort.js");
  require("core-js/modules/es.function.name.js");
  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 2019 (10th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/10.0/
   */

  /*
   * Stable Array.prototype.sort()
   * Mandates that `Array.prototype.sort()` be stable, ensuring that array elements comparing equal retain their original order.
   * Spec: https://262.ecma-international.org/10.0/#sec-array.prototype.sort
   */
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
    items.sort(function (a, b) {
      return a.val - b.val;
    });
    // "Second" always precedes "Fourth", and "First" always precedes "Third"
    return items.map(function (i) {
      return i.name;
    });
  }

  require("core-js/modules/es.string.trim-end.js");
  /**
   * ECMAScript 2019 (10th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/10.0/
   */

  /*
   * String.prototype.trimEnd()
   * Removes whitespace from the end of a string.
   * Spec: https://262.ecma-international.org/10.0/#sec-string.prototype.trimend
   */
  function demoStringTrimEnd() {
    var padded = "   ECMAScript 2019   ";
    return padded.trimEnd();
  }

  require("core-js/modules/es.string.trim-start.js");
  /**
   * ECMAScript 2019 (10th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/10.0/
   */

  /*
   * String.prototype.trimStart()
   * Removes whitespace from the beginning (start) of a string.
   * Spec: https://262.ecma-international.org/10.0/#sec-string.prototype.trimstart
   */
  function demoStringTrimStart() {
    var padded = "   ECMAScript 2019   ";
    return padded.trimStart();
  }

  require("core-js/modules/es.symbol.js");
  require("core-js/modules/es.symbol.description.js");
  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 2019 (10th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/10.0/
   */

  /*
   * Symbol.prototype.description
   * A read-only property returning the optional string description specified when creating a Symbol object, directly
   * without requiring `.toString()` conversion.
   * Spec: https://262.ecma-international.org/10.0/#sec-symbol.prototype.description
   */
  function demoSymbolDescription() {
    var sym = Symbol("custom identifier");
    return sym.description; // "custom identifier"
  }

  /**
   * ECMAScript 2019 (10th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/10.0/
   */

  /*
   * Well-Formed JSON.stringify()
   * Prevents `JSON.stringify` from returning ill-formed UTF-16 strings when encountering lone surrogate code points (U+D800 to U+DFFF),
   * representing them instead as JSON escape sequences (e.g., `\ud800`).
   * Spec: https://262.ecma-international.org/10.0/#sec-json.stringify
   */
  function demoWellFormedJSON() {
    // Lone surrogate \uD800
    var serialized = JSON.stringify("\uD800");
    return serialized; // '"\\ud800"'
  }

  exports.demoArrayFlat = demoArrayFlat;
  exports.demoArrayFlatMap = demoArrayFlatMap;
  exports.demoFunctionToString = demoFunctionToString;
  exports.demoObjectFromEntries = demoObjectFromEntries;
  exports.demoOptionalCatchBinding = demoOptionalCatchBinding;
  exports.demoStableSort = demoStableSort;
  exports.demoStringTrimEnd = demoStringTrimEnd;
  exports.demoStringTrimStart = demoStringTrimStart;
  exports.demoSymbolDescription = demoSymbolDescription;
  exports.demoWellFormedJSON = demoWellFormedJSON;

  return exports;

})({});
//# sourceMappingURL=es2019_es5.js.101_1789571210187_zdq6b.tmp.map
