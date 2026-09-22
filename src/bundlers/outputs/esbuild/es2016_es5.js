// ../es-samples/samples/es2016/array-includes.js
import "core-js/modules/es.array.includes.js";
function demoArrayIncludes() {
  var numbers = [1, 2, 3, NaN, 5];
  var includesThree = numbers.includes(3);
  var includesSeven = numbers.includes(7);
  var includesNaN = numbers.includes(NaN);
  return {
    includesThree,
    includesSeven,
    includesNaN
  };
}

// ../es-samples/samples/es2016/exponentiation-operator.js
function demoExponentiationOperator() {
  var base = 2;
  var power = 10;
  var result = Math.pow(base, power);
  var compound = 3;
  compound = Math.pow(compound, 3);
  return {
    result,
    compound
  };
}
export {
  demoArrayIncludes,
  demoExponentiationOperator
};
//# sourceMappingURL=es2016_es5.js.101_1789571205256_luy5j.tmp.map
