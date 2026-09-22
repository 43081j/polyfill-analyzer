var SampleBundle = (function (exports) {
  'use strict';

  require("core-js/modules/es.array.includes.js");
  /**
   * ECMAScript 2016 (7th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/7.0/
   */

  /*
   * Array.prototype.includes()
   * Determines whether an array includes a certain value among its entries, returning true or false.
   * Unlike `indexOf() !== -1`, `includes()` correctly compares `NaN` values using SameValueZero equality.
   * Spec: https://262.ecma-international.org/7.0/#sec-array.prototype.includes
   */
  function demoArrayIncludes() {
    var numbers = [1, 2, 3, NaN, 5];
    var includesThree = numbers.includes(3);
    var includesSeven = numbers.includes(7);
    var includesNaN = numbers.includes(NaN); // true, whereas numbers.indexOf(NaN) is -1

    return {
      includesThree: includesThree,
      includesSeven: includesSeven,
      includesNaN: includesNaN
    };
  }

  /**
   * ECMAScript 2016 (7th Edition) Code Samples
   * Standard Specification: https://262.ecma-international.org/7.0/
   */

  /*
   * Exponentiation Operator (** and **=)
   * An infix operator for exponentiation, providing a cleaner shorthand for `Math.pow(base, exponent)`.
   * Spec: https://262.ecma-international.org/7.0/#sec-exp-operator
   */
  function demoExponentiationOperator() {
    var base = 2;
    var power = 10;
    var result = Math.pow(base, power); // 1024

    var compound = 3;
    compound = Math.pow(compound, 3); // 27

    return {
      result: result,
      compound: compound
    };
  }

  exports.demoArrayIncludes = demoArrayIncludes;
  exports.demoExponentiationOperator = demoExponentiationOperator;

  return exports;

})({});
//# sourceMappingURL=es2016_es5.js.101_1789571205080_dpepa.tmp.map
