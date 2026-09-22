"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get demoArrayIncludes () {
        return demoArrayIncludes;
    },
    get demoExponentiationOperator () {
        return demoExponentiationOperator;
    }
});
require("core-js/modules/es.array.includes.js");
// ../es-samples/samples/es2016/array-includes.js
function demoArrayIncludes() {
    var numbers = [
        1,
        2,
        3,
        NaN,
        5
    ];
    var includesThree = numbers.includes(3);
    var includesSeven = numbers.includes(7);
    var includesNaN = numbers.includes(NaN);
    return {
        includesThree: includesThree,
        includesSeven: includesSeven,
        includesNaN: includesNaN
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
        result: result,
        compound: compound
    };
}
