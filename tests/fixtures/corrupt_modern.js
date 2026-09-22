/**
 * ECMAScript 2015 (6th Edition) Code Samples
 * Standard Specification: https://262.ecma-international.org/6.0/
 */

/*
 * Block-Scoped Declarations (let and const)
 * Introduces block-level scoping for variables using `let` and constants using `const`.
 * These declarations are not hoisted in the same manner as `var` and reside in the Temporal Dead Zone (TDZ) until evaluation.
 * Spec: https://262.ecma-international.org/6.0/#sec-let-and-const-declarations
 */
function demoLetAndConst() {
  let blockScopedVar = "initial";
  const constantValue = 42;
  
  return { blockScopedVar, constantValue };
}

/*
 * Arrow Function Definitions
 * Provides a concise syntax for anonymous functions using the `=>` token. Arrow functions lexically bind
 * `this`, `arguments`, `super`, and `new.target` from their enclosing scope rather than defining their own.
 * Spec: https://262.ecma-international.org/6.0/#sec-arrow-function-definitions
 */
const add = (a, b) => a + b;
const createPoint = (x, y) => ({ x, y });
const lexicalThisDemo = () => {
  const context = {
    value: 100,
    getValueLater: function() {
      return () => this.value;
    }
  };
  return context.getValueLater()();
};

/*
 * Class Definitions and Inheritance
 * Introduces class syntax as syntactic sugar over prototype-based inheritance, including constructors,
 * instance methods, static methods, and `extends`/`super` for subclassing.
 * Spec: https://262.ecma-international.org/6.0/#sec-class-definitions
 */
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a noise.`;
  }
  
  static isAnimal(obj) {
    return obj instanceof Animal;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    return `${this.name} barks.`;
  }
}

/*
 * Template Literals and Tagged Templates
 * Multi-line string literals allowing embedded expressions via `${expression}` syntax, and tagged template
 * functions that allow custom parsing and formatting of template literals.
 * Spec: https://262.ecma-international.org/6.0/#sec-template-literals
 */
function demoTemplateLiterals(name = "World", count = 5) {
  const basicTemplate = `Hello, ${name}! You have ${count} notifications.`;
  
  // Tagged template example
  function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => {
      const val = values[i] !== undefined ? `[${values[i]}]` : "";
      return acc + str + val;
    }, "");
  }
  
  const taggedResult = highlight`User ${name} has ${count} items.`;
  return { basicTemplate, taggedResult };
}

/*
 * Enhanced Object Literals
 * Syntactic enhancements for object initializers including property value shorthand, method definition shorthand,
 * and computed property names.
 * Spec: https://262.ecma-international.org/6.0/#sec-object-initializer
 */
function demoEnhancedObjectLiterals(id, name) {
  const dynamicKey = "status_" + id;
  return {
    id, // property shorthand for id: id
    name,
    [dynamicKey]: "active", // computed property name
    getSummary() { // method shorthand for getSummary: function()
      return `${this.name} (${this.id})`;
    }
  };
}

/*
 * Destructuring Assignment
 * Syntax allowing extraction of values from arrays or properties from objects into distinct variables,
 * supporting default fallback values and nested destructuring.
 * Spec: https://262.ecma-international.org/6.0/#sec-destructuring-assignment
 */
function demoDestructuring() {
  const user = { username: "alice", role: "admin", profile: { age: 30 } };
  const [first, second, third = 3] = [10, 20];
  const { username, role: userRole, profile: { age }, missing = "default" } = user;
  
  return { first, second, third, username, userRole, age, missing };
}

/*
 * Default Parameter Values, Rest Parameters, and Spread Syntax
 * Allows formal parameters to be initialized with default values if no value or `undefined` is passed.
 * Rest parameters (`...rest`) collect remaining arguments into an array. Spread syntax (`...iterable`) expands iterables.
 * Spec: https://262.ecma-international.org/6.0/#sec-parameter-lists
 * Spec (Spread): https://262.ecma-international.org/6.0/#sec-array-initializer
 */
function demoParametersAndSpread(multiplier = 2, ...numbers) {
  const multiplied = numbers.map(n => n * multiplier);
  const combinedArray = [0, ...multiplied, 100];
  return combinedArray;
}

/*
 * Iterators and for...of Statement
 * Protocol for iterable objects (implementing `Symbol.iterator`) and the `for...of` loop to traverse iterable elements.
 * Spec: https://262.ecma-international.org/6.0/#sec-for-in-and-for-of-statements
 */
function demoForOfAndIterators() {
  const iterableObject = {
    [Symbol.iterator]() {
      let step = 0;
      return {
        next() {
          step++;
          if (step <= 3) {
            return { value: `step-${step}`, done: false };
          }
          return { value: undefined, done: true };
        }
      };
    }
  };

  const results = [];
  for (const item of iterableObject) {
    results.push(item);
  }
  return results;
}

/*
 * Generator Functions and yield Statement
 * Functions defined with `function*` that can be paused and resumed using the `yield` keyword, returning a Generator object
 * that conforms to both the iterable and iterator protocols.
 * Spec: https://262.ecma-international.org/6.0/#sec-generator-function-definitions
 */
function* demoGenerator(start = 1, end = 3) {
  for (let i = start; i <= end; i++) {
    yield i * 10;
  }
}

/*
 * Promise Objects
 * A built-in object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.
 * Spec: https://262.ecma-international.org/6.0/#sec-promise-objects
 */
function demoPromise(shouldResolve = true) {
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve("Promise resolved successfully");
    } else {
      reject(new Error("Promise rejected"));
    }
  });
}

/*
 * Built-in Collections: Map, Set, WeakMap, and WeakSet
 * New collection types: Map (key-value pairs with arbitrary key types), Set (unique values),
 * WeakMap (key-value pairs with weakly-held object keys), and WeakSet (weakly-held unique objects).
 * Spec (Map): https://262.ecma-international.org/6.0/#sec-map-objects
 * Spec (Set): https://262.ecma-international.org/6.0/#sec-set-objects
 * Spec (WeakMap): https://262.ecma-international.org/6.0/#sec-weakmap-objects
 * Spec (WeakSet): https://262.ecma-international.org/6.0/#sec-weakset-objects
 */
function demoCollections() {
  const map = new Map();
  const keyObj = { id: 1 };
  map.set(keyObj, "metadata");
  map.set("stringKey", 123);

  const set = new Set([1, 2, 2, 3, 3, 3]);

  const weakMap = new WeakMap();
  let weakKey = { name: "temp" };
  weakMap.set(weakKey, "weak data");

  const weakSet = new WeakSet();
  weakSet.add(weakKey);

  return {
    mapHasKey: map.has(keyObj),
    setSize: set.size,
    weakMapHas: weakMap.has(weakKey),
    weakSetHas: weakSet.has(weakKey)
  };
}

/*
 * Symbol Primitive Type
 * A unique and immutable primitive value that can be used as the key of an object property to avoid naming collisions.
 * Also introduces well-known symbols like `Symbol.iterator` and `Symbol.toStringTag`.
 * Spec: https://262.ecma-international.org/6.0/#sec-symbol-objects
 */
function demoSymbols() {
  const sym1 = Symbol("description");
  const sym2 = Symbol("description");
  const obj = {
    [sym1]: "secret value",
    [Symbol.toStringTag]: "CustomObject"
  };

  return {
    areSymbolsEqual: sym1 === sym2,
    symbolPropertyValue: obj[sym1],
    toStringTag: Object.prototype.toString.call(obj)
  };
}

/*
 * ES Modules (Export and Import syntax)
 * Native syntax for modular programming using `export` and `import` declarations.
 * Note: Since this entire file is an ES module using `export`, this feature is natively exemplified by the module structure itself.
 * Spec: https://262.ecma-international.org/6.0/#sec-exports-and-imports
 */
const moduleFeatureDemo = "This variable is exported using ES2015 module syntax.";

/*
 * Proxy and Reflect Objects
 * `Proxy` allows intercepting and defining custom behavior for fundamental object operations (property lookup, assignment, enumeration, etc.).
 * `Reflect` provides built-in static methods for interceptable JavaScript operations, mirroring Proxy traps.
 * Spec (Proxy): https://262.ecma-international.org/6.0/#sec-proxy-objects
 * Spec (Reflect): https://262.ecma-international.org/6.0/#sec-reflect-object
 */
function demoProxyAndReflect() {
  const target = { message: "hello" };
  const handler = {
    get(obj, prop, receiver) {
      if (prop === "message") {
        return Reflect.get(obj, prop, receiver).toUpperCase();
      }
      return Reflect.get(obj, prop, receiver);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy.message;
}

/*
 * Binary and Octal Numeric Literals
 * Direct syntax for binary literals (`0b` or `0B` prefix) and octal literals (`0o` or `0O` prefix).
 * Spec: https://262.ecma-international.org/6.0/#sec-literals-numeric-literals
 */
function demoNumericLiterals() {
  const binaryValue = 0b1010; // 10 in decimal
  const octalValue = 0o755;   // 493 in decimal
  return { binaryValue, octalValue };
}

/*
 * Enhanced Built-in Methods
 * Numerous method additions across Object (`Object.assign`, `Object.is`), Array (`Array.from`, `Array.of`, `find`, `findIndex`),
 * String (`includes`, `startsWith`, `endsWith`, `repeat`), Number (`Number.isNaN`, `Number.isInteger`), and Math (`Math.trunc`, `Math.sign`).
 * Spec (Object.assign): https://262.ecma-international.org/6.0/#sec-object.assign
 * Spec (Array.from): https://262.ecma-international.org/6.0/#sec-array.from
 * Spec (String.prototype.includes): https://262.ecma-international.org/6.0/#sec-string.prototype.includes
 * Spec (Number.isInteger): https://262.ecma-international.org/6.0/#sec-number.isinteger
 */
function demoBuiltinExtensions() {
  const assignedObj = Object.assign({}, { a: 1 }, { b: 2 });
  const arrayFromStr = Array.from("ES6");
  const foundItem = [10, 20, 30, 40].find(val => val > 25);
  const strIncludes = "ECMAScript".includes("Script");
  const isInt = Number.isInteger(42.0);
  const truncatedMath = Math.trunc(42.99);

  return { assignedObj, arrayFromStr, foundItem, strIncludes, isInt, truncatedMath };
}

export { Animal, Dog, add, createPoint, demoBuiltinExtensions, demoCollections, demoDestructuring, demoEnhancedObjectLiterals, demoForOfAndIterators, demoGenerator, demoLetAndConst, demoNumericLiterals, demoParametersAndSpread, demoPromise, demoProxyAndReflect, demoSymbols, demoTemplateLiterals, lexicalThisDemo, moduleFeatureDemo };
//# sourceMappingURL=es2015_modern.js.2834515_1784029392106_1sr7l.tmp.map


  @@$$%%^^ garbage