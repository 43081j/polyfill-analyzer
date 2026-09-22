// ../es-samples/samples/es2011/array-every.js
import "core-js/modules/es.object.to-string.js";
function demoArrayEvery() {
  var numbers = [1, 2, 3, 4];
  return numbers.every(function(n) {
    return n > 0;
  });
}

// ../es-samples/samples/es2011/array-filter.js
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.to-string.js";
function demoArrayFilter() {
  var numbers = [1, 2, 3, 4, 5];
  return numbers.filter(function(n) {
    return n % 2 === 0;
  });
}

// ../es-samples/samples/es2011/array-for-each.js
import "core-js/modules/es.object.to-string.js";
function demoArrayForEach() {
  var items = ["a", "b", "c"];
  var result = [];
  items.forEach(function(item) {
    return result.push(item.toUpperCase());
  });
  return result;
}

// ../es-samples/samples/es2011/array-index-of.js
function demoArrayIndexof() {
  var fruits = ["apple", "banana", "cherry"];
  return fruits.indexOf("banana");
}

// ../es-samples/samples/es2011/array-is-array.js
function demoArrayIsArray() {
  return {
    isArray: Array.isArray([1, 2, 3]),
    isNotArray: Array.isArray({
      a: 1
    })
  };
}

// ../es-samples/samples/es2011/array-last-index-of.js
function demoArrayLastIndexOf() {
  var numbers = [1, 2, 3, 2, 1];
  return numbers.lastIndexOf(2);
}

// ../es-samples/samples/es2011/array-map.js
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.to-string.js";
function demoArrayMap() {
  var numbers = [1, 2, 3];
  return numbers.map(function(n) {
    return n * 2;
  });
}

// ../es-samples/samples/es2011/array-reduce-right.js
function demoArrayReduceRight() {
  var words = ["a", "b", "c"];
  return words.reduceRight(function(acc, curr) {
    return acc + curr;
  }, "");
}

// ../es-samples/samples/es2011/array-reduce.js
import "core-js/modules/es.object.to-string.js";
function demoArrayReduce() {
  var numbers = [1, 2, 3, 4];
  return numbers.reduce(function(acc, curr) {
    return acc + curr;
  }, 0);
}

// ../es-samples/samples/es2011/array-some.js
import "core-js/modules/es.object.to-string.js";
function demoArraySome() {
  var numbers = [1, 2, 3, 4];
  return numbers.some(function(n) {
    return n > 3;
  });
}

// ../es-samples/samples/es2011/date-now.js
function demoDateNow() {
  var timestamp = Date.now();
  return typeof timestamp === "number" && timestamp > 0;
}

// ../es-samples/samples/es2011/date-to-iso-string.js
function demoDateToISOString() {
  var date = /* @__PURE__ */ new Date("2026-01-01T00:00:00Z");
  return date.toISOString();
}

// ../es-samples/samples/es2011/date-to-json.js
function demoDateToJSON() {
  var date = /* @__PURE__ */ new Date("2026-01-01T00:00:00Z");
  return date.toJSON();
}

// ../es-samples/samples/es2011/function-bind.js
function demoFunctionBind() {
  var moduleObj = {
    x: 42,
    getX: function getX() {
      return this.x;
    }
  };
  var unboundGetX = moduleObj.getX;
  var boundGetX = unboundGetX.bind(moduleObj);
  return {
    boundResult: boundGetX()
  };
}

// ../es-samples/samples/es2011/getters-and-setters.js
import "core-js/modules/es.array.concat.js";
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
  var initial = user.fullName;
  user.fullName = "Jane Smith";
  return {
    initial,
    updated: user.fullName,
    firstName: user.firstName
  };
}

// ../es-samples/samples/es2011/json.js
import "core-js/modules/es.object.keys.js";
function demoJSON() {
  var data = {
    name: "ES5.1",
    year: 2011,
    features: ["JSON", "Strict Mode"]
  };
  var serialized = JSON.stringify(data);
  var parsed = JSON.parse(serialized);
  return {
    serialized,
    year: parsed.year
  };
}

// ../es-samples/samples/es2011/object-create.js
function demoObjectCreate() {
  var proto = {
    greeting: "hello"
  };
  var obj = Object.create(proto);
  return obj.greeting;
}

// ../es-samples/samples/es2011/object-define-property.js
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

// ../es-samples/samples/es2011/object-freeze.js
import "core-js/modules/es.object.freeze.js";
import "core-js/modules/es.object.is-frozen.js";
function demoObjectFreeze() {
  var obj = Object.freeze({
    status: "locked"
  });
  return Object.isFrozen(obj);
}

// ../es-samples/samples/es2011/object-keys.js
import "core-js/modules/es.object.keys.js";
function demoObjectKeys() {
  var obj = {
    a: 1,
    b: 2,
    c: 3
  };
  return Object.keys(obj);
}

// ../es-samples/samples/es2011/object-prevent-extensions.js
import "core-js/modules/es.object.is-extensible.js";
import "core-js/modules/es.object.prevent-extensions.js";
function demoObjectPreventExtensions() {
  var obj = Object.preventExtensions({
    key: "val"
  });
  return !Object.isExtensible(obj);
}

// ../es-samples/samples/es2011/object-seal.js
import "core-js/modules/es.object.is-sealed.js";
import "core-js/modules/es.object.seal.js";
function demoObjectSeal() {
  var obj = Object.seal({
    status: "sealed"
  });
  return Object.isSealed(obj);
}

// ../es-samples/samples/es2011/strict-mode.js
function demoStrictMode() {
  "use strict";
  try {
    eval("undeclaredGlobalVar = 42;");
    return false;
  } catch (error) {
    return error instanceof ReferenceError;
  }
}

// ../es-samples/samples/es2011/string-indexing.js
function demoStringIndexing() {
  var str = "ES5.1";
  return str[0];
}

// ../es-samples/samples/es2011/string-trim.js
import "core-js/modules/es.string.trim.js";
function demoStringTrim() {
  var raw = "   ES5.1 String   ";
  return raw.trim();
}
export {
  demoArrayEvery,
  demoArrayFilter,
  demoArrayForEach,
  demoArrayIndexof,
  demoArrayIsArray,
  demoArrayLastIndexOf,
  demoArrayMap,
  demoArrayReduce,
  demoArrayReduceRight,
  demoArraySome,
  demoDateNow,
  demoDateToISOString,
  demoDateToJSON,
  demoFunctionBind,
  demoGettersAndSetters,
  demoJSON,
  demoObjectCreate,
  demoObjectDefineProperty,
  demoObjectFreeze,
  demoObjectKeys,
  demoObjectPreventExtensions,
  demoObjectSeal,
  demoStrictMode,
  demoStringIndexing,
  demoStringTrim
};
//# sourceMappingURL=es2011_es5.js.101_1789571198537_p0eb8.tmp.map
