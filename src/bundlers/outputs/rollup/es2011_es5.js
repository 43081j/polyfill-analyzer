var SampleBundle = (function (exports) {
  'use strict';

  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Array.prototype.every
   * Tests whether all elements in the array pass the test implemented by the provided function.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.4.4.16
   */
  function demoArrayEvery() {
    var numbers = [1, 2, 3, 4];
    return numbers.every(function (n) {
      return n > 0;
    });
  }

  require("core-js/modules/es.array.filter.js");
  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Array.prototype.filter
   * Creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.4.4.20
   */
  function demoArrayFilter() {
    var numbers = [1, 2, 3, 4, 5];
    return numbers.filter(function (n) {
      return n % 2 === 0;
    });
  }

  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Array.prototype.forEach
   * Executes a provided function once for each array element.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.4.4.18
   */
  function demoArrayForEach() {
    var items = ["a", "b", "c"];
    var result = [];
    items.forEach(function (item) {
      return result.push(item.toUpperCase());
    });
    return result;
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Array.prototype.indexOf
   * Returns the first index at which a given element can be found in the array, or -1 if it is not present.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.4.4.14
   */
  function demoArrayIndexof() {
    var fruits = ["apple", "banana", "cherry"];
    return fruits.indexOf("banana");
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Array.isArray
   * Determines whether the passed value is an Array.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.4.3.2
   */
  function demoArrayIsArray() {
    return {
      isArray: Array.isArray([1, 2, 3]),
      isNotArray: Array.isArray({
        a: 1
      })
    };
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Array.prototype.lastIndexOf
   * Returns the last index at which a given element can be found in the array, or -1 if it is not present.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.4.4.15
   */
  function demoArrayLastIndexOf() {
    var numbers = [1, 2, 3, 2, 1];
    return numbers.lastIndexOf(2);
  }

  require("core-js/modules/es.array.map.js");
  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Array.prototype.map
   * Creates a new array populated with the results of calling a provided function on every element in the calling array.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.4.4.19
   */
  function demoArrayMap() {
    var numbers = [1, 2, 3];
    return numbers.map(function (n) {
      return n * 2;
    });
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Array.prototype.reduceRight
   * Applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.4.4.22
   */
  function demoArrayReduceRight() {
    var words = ["a", "b", "c"];
    return words.reduceRight(function (acc, curr) {
      return acc + curr;
    }, "");
  }

  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Array.prototype.reduce
   * Executes a user-supplied reducer callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.4.4.21
   */
  function demoArrayReduce() {
    var numbers = [1, 2, 3, 4];
    return numbers.reduce(function (acc, curr) {
      return acc + curr;
    }, 0);
  }

  require("core-js/modules/es.object.to-string.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Array.prototype.some
   * Tests whether at least one element in the array passes the test implemented by the provided function.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.4.4.17
   */
  function demoArraySome() {
    var numbers = [1, 2, 3, 4];
    return numbers.some(function (n) {
      return n > 3;
    });
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Date.now()
   * Returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.9.4.4
   */
  function demoDateNow() {
    var timestamp = Date.now();
    return typeof timestamp === "number" && timestamp > 0;
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Date.prototype.toISOString
   * Returns a string in simplified extended ISO format (ISO 8601), formatted as YYYY-MM-THH:mm:ss.sssZ.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.9.5.43
   */
  function demoDateToISOString() {
    var date = new Date("2026-01-01T00:00:00Z");
    return date.toISOString();
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Date.prototype.toJSON
   * Returns a string representation of the Date object used for JSON serialization.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.9.5.44
   */
  function demoDateToJSON() {
    var date = new Date("2026-01-01T00:00:00Z");
    return date.toJSON();
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Function.prototype.bind()
   * Creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence
   * of arguments preceding any provided when the new function is called.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.3.4.5
   */
  function demoFunctionBind() {
    var moduleObj = {
      x: 42,
      getX: function getX() {
        return this.x;
      }
    };
    var unboundGetX = moduleObj.getX;
    // unboundGetX() in global scope would fail or return undefined; bind ties `this` to moduleObj
    var boundGetX = unboundGetX.bind(moduleObj);
    return {
      boundResult: boundGetX()
    };
  }

  require("core-js/modules/es.array.concat.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Object Literal Getters and Setters
   * Introduces syntax for binding an object property to a function that will be invoked when that property is looked up (`get`)
   * or assigned to (`set`).
   * Spec: https://262.ecma-international.org/5.1/#sec-11.1.5
   */
  function demoGettersAndSetters() {
    var user = {
      firstName: "John",
      lastName: "Doe",
      get fullName() {
        return "".concat(this.firstName, " ").concat(this.lastName);
      },
      set fullName(name) {
        var parts = name.split(" ");
        this.firstName = parts[0];
        this.lastName = parts[1] || "";
      }
    };
    var initial = user.fullName; // "John Doe"
    user.fullName = "Jane Smith";
    return {
      initial: initial,
      updated: user.fullName,
      firstName: user.firstName
    };
  }

  require("core-js/modules/es.object.keys.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Native JSON Parsing and Serialization (JSON.parse and JSON.stringify)
   * Standardizes a built-in `JSON` object for parsing JSON text strings into JavaScript objects and serializing
   * values into JSON formatted strings without relying on `eval()`.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.12
   */
  function demoJSON() {
    var data = {
      name: "ES5.1",
      year: 2011,
      features: ["JSON", "Strict Mode"]
    };
    var serialized = JSON.stringify(data);
    var parsed = JSON.parse(serialized);
    return {
      serialized: serialized,
      year: parsed.year
    };
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Object.create
   * Creates a new object, using an existing object as the prototype of the newly created object.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.2.3.5
   */
  function demoObjectCreate() {
    var proto = {
      greeting: "hello"
    };
    var obj = Object.create(proto);
    return obj.greeting;
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Object.defineProperty
   * Defines a new property directly on an object, or modifies an existing property on an object, and returns the object.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.2.3.6
   */
  function demoObjectDefineProperty() {
    var obj = {};
    Object.defineProperty(obj, "readOnlyProp", {
      value: "cannot change",
      writable: false,
      enumerable: true,
      configurable: false
    });
    return obj.readOnlyProp;
  }

  require("core-js/modules/es.object.freeze.js");
  require("core-js/modules/es.object.is-frozen.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Object.freeze
   * Freezes an object, preventing new properties from being added and existing properties from being modified or removed.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.2.3.9
   */
  function demoObjectFreeze() {
    var obj = Object.freeze({
      status: "locked"
    });
    return Object.isFrozen(obj);
  }

  require("core-js/modules/es.object.keys.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Object.keys
   * Returns an array of a given object's own enumerable property names.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.2.3.14
   */
  function demoObjectKeys() {
    var obj = {
      a: 1,
      b: 2,
      c: 3
    };
    return Object.keys(obj);
  }

  require("core-js/modules/es.object.is-extensible.js");
  require("core-js/modules/es.object.prevent-extensions.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Object.preventExtensions
   * Prevents new properties from ever being added to an object.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.2.3.10
   */
  function demoObjectPreventExtensions() {
    var obj = Object.preventExtensions({
      key: "val"
    });
    return !Object.isExtensible(obj);
  }

  require("core-js/modules/es.object.is-sealed.js");
  require("core-js/modules/es.object.seal.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Object.seal
   * Seals an object, preventing new properties from being added and marking all existing properties as non-configurable.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.2.3.8
   */
  function demoObjectSeal() {
    var obj = Object.seal({
      status: "sealed"
    });
    return Object.isSealed(obj);
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * Strict Mode ("use strict")
   * Introduces a restricted variant of JavaScript that eliminates silent errors by throwing exceptions, disables features
   * that are confusing or poorly thought out, and simplifies variable resolution (e.g., forbidding implicit global creation).
   * Spec: https://262.ecma-international.org/5.1/#sec-10.1.1
   */
  function demoStrictMode() {

    try {
      // In strict mode, assigning to an undeclared variable throws a ReferenceError instead of creating a global
      eval("undeclaredGlobalVar = 42;");
      return false;
    } catch (error) {
      return error instanceof ReferenceError;
    }
  }

  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * String Property Access (Bracket Notation)
   * Standardizes character access via square bracket notation (str[index]) as an alternative to charAt(index).
   * Spec: https://262.ecma-international.org/5.1/#sec-15.5.5.2
   */
  function demoStringIndexing() {
    var str = "ES5.1";
    return str[0]; // "E"
  }

  require("core-js/modules/es.string.trim.js");
  /**
   * ECMAScript 5.1 (2011 Standard / ISO/IEC 16262:2011) Code Samples
   * Standard Specification: https://262.ecma-international.org/5.1/
   */

  /*
   * String.prototype.trim()
   * Strips leading and trailing whitespace from strings.
   * Spec: https://262.ecma-international.org/5.1/#sec-15.5.4.20
   */
  function demoStringTrim() {
    var raw = "   ES5.1 String   ";
    return raw.trim(); // "ES5.1 String"
  }

  exports.demoArrayEvery = demoArrayEvery;
  exports.demoArrayFilter = demoArrayFilter;
  exports.demoArrayForEach = demoArrayForEach;
  exports.demoArrayIndexof = demoArrayIndexof;
  exports.demoArrayIsArray = demoArrayIsArray;
  exports.demoArrayLastIndexOf = demoArrayLastIndexOf;
  exports.demoArrayMap = demoArrayMap;
  exports.demoArrayReduce = demoArrayReduce;
  exports.demoArrayReduceRight = demoArrayReduceRight;
  exports.demoArraySome = demoArraySome;
  exports.demoDateNow = demoDateNow;
  exports.demoDateToISOString = demoDateToISOString;
  exports.demoDateToJSON = demoDateToJSON;
  exports.demoFunctionBind = demoFunctionBind;
  exports.demoGettersAndSetters = demoGettersAndSetters;
  exports.demoJSON = demoJSON;
  exports.demoObjectCreate = demoObjectCreate;
  exports.demoObjectDefineProperty = demoObjectDefineProperty;
  exports.demoObjectFreeze = demoObjectFreeze;
  exports.demoObjectKeys = demoObjectKeys;
  exports.demoObjectPreventExtensions = demoObjectPreventExtensions;
  exports.demoObjectSeal = demoObjectSeal;
  exports.demoStrictMode = demoStrictMode;
  exports.demoStringIndexing = demoStringIndexing;
  exports.demoStringTrim = demoStringTrim;

  return exports;

})({});
//# sourceMappingURL=es2011_es5.js.101_1789571196953_vbpou.tmp.map
