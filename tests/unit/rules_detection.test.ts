import { describe, it, expect } from 'vitest';
import { scan } from '../../src/engine/index.js';

interface TestCase {
  id: string;
  positive: string[];
  negative: string[];
}

const testCases: TestCase[] = [
  {
    id: 'promise-all-settled',
    positive: [
      'import "core-js/modules/es.promise.all-settled.js";',
      'require("core-js/modules/es.promise.all-settled.js");',
      'Promise.allSettled = function() {};',
      'Object.defineProperty(Promise, "allSettled", { value: fn });'
    ],
    negative: [
      'const tasks = [fetch("/a"), fetch("/b")]; const results = await Promise.allSettled(tasks);',
      'Promise.allSettled([Promise.resolve(1)]).then(console.log);'
    ]
  },
  {
    id: 'promise-any',
    positive: [
      'import "core-js/modules/es.promise.any.js";',
      'require("core-js/modules/es.promise.any.js");',
      'Promise.any = function() {};'
    ],
    negative: [
      'const res = await Promise.any([p1, p2]);'
    ]
  },
  {
    id: 'promise-with-resolvers',
    positive: [
      'import "core-js/modules/es.promise.with-resolvers.js";',
      'require("core-js/modules/es.promise.with-resolvers.js");',
      'Promise.withResolvers = function() {};'
    ],
    negative: [
      'const { promise, resolve, reject } = Promise.withResolvers();'
    ]
  },
  {
    id: 'async-iteration',
    positive: [
      'require("@babel/runtime/helpers/asyncIterator");',
      'function _asyncIterator(s) { return s[Symbol.asyncIterator](); }',
      'import "core-js/modules/es.string.iterator.js";'
    ],
    negative: [
      'for await (const x of gen()) { console.log(x); }'
    ]
  },
  {
    id: 'array-includes',
    positive: [
      'import "core-js/modules/es.array.includes.js";',
      'require("core-js/modules/es.array.includes.js");',
      'Array.prototype.includes = function() {};'
    ],
    negative: [
      'const arr = ["apple", "banana"]; const hasApple = arr.includes("apple");',
      'if ([1, 2, 3].includes(2)) { console.log("yes"); }'
    ]
  },
  {
    id: 'array-find-last',
    positive: [
      'import "core-js/modules/es.array.find-last.js";',
      'require("core-js/modules/es.array.find-last.js");',
      'Array.prototype.findLast = function() {};'
    ],
    negative: [
      'const x = arr.findLast(n => n > 0);'
    ]
  },
  {
    id: 'array-at',
    positive: [
      'import "core-js/modules/es.array.at.js";',
      'require("core-js/modules/es.array.at.js");',
      'Array.prototype.at = function() {};'
    ],
    negative: [
      'const last = items.at(-1);'
    ]
  },
  {
    id: 'class-fields',
    positive: [
      'require("@babel/runtime/helpers/classPrivateFieldGet");',
      'require("@babel/runtime/helpers/defineProperty");',
      'function _defineProperty(obj, key, value) { Object.defineProperty(obj, key, { value }); }'
    ],
    negative: [
      'class Foo { #x = 1; get x() { return this.#x; } }'
    ]
  },
  {
    id: 'class-static-initialization-blocks',
    positive: [
      'require("@babel/runtime/helpers/classStaticPrivateFieldSpecGet");',
      'function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { return descriptor.value; }'
    ],
    negative: [
      'class Foo { static { console.log("init"); } }'
    ]
  },
  {
    id: 'object-assign',
    positive: [
      'import "core-js/modules/es.object.assign.js";',
      'require("core-js/modules/es.object.assign.js");',
      'Object.assign = function() {};',
      'var _extends = Object.assign || function(target) { };'
    ],
    negative: [
      'const target = { a: 1 }; const res = Object.assign(target, { b: 2 });',
      'const clone = { ...target };'
    ]
  },
  {
    id: 'object-has-own',
    positive: [
      'import "core-js/modules/es.object.has-own.js";',
      'require("core-js/modules/es.object.has-own.js");',
      'Object.hasOwn = function() {};'
    ],
    negative: [
      'if (Object.hasOwn(obj, "key")) { console.log("found"); }'
    ]
  },
  {
    id: 'object-group-by',
    positive: [
      'import "core-js/modules/es.object.group-by.js";',
      'require("core-js/modules/es.object.group-by.js");',
      'Object.groupBy = function() {};'
    ],
    negative: [
      'const grouped = Object.groupBy(items, i => i.type);'
    ]
  }
];

describe('Rules Detection Suite - Positive & Negative Validation', () => {
  for (const tc of testCases) {
    describe(`Rule: ${tc.id}`, () => {
      it('must detect positive polyfilled/transpiled snippets (>0 matches)', () => {
        for (const snippet of tc.positive) {
          const detected = scan(snippet);
          const match = detected.find(r => r.id === tc.id);
          expect(match, `Expected rule ${tc.id} to match positive snippet: ${snippet}`).toBeDefined();
        }
      });

      it('must NOT match negative modern native snippets (0 matches)', () => {
        for (const snippet of tc.negative) {
          const detected = scan(snippet);
          const match = detected.find(r => r.id === tc.id);
          expect(match, `Expected rule ${tc.id} NOT to match negative modern snippet: ${snippet}`).toBeUndefined();
        }
      });
    });
  }
});
