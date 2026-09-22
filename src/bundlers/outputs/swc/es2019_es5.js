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
    get demoArrayFlat () {
        return demoArrayFlat;
    },
    get demoArrayFlatMap () {
        return demoArrayFlatMap;
    },
    get demoFunctionToString () {
        return demoFunctionToString;
    },
    get demoObjectFromEntries () {
        return demoObjectFromEntries;
    },
    get demoOptionalCatchBinding () {
        return demoOptionalCatchBinding;
    },
    get demoStableSort () {
        return demoStableSort;
    },
    get demoStringTrimEnd () {
        return demoStringTrimEnd;
    },
    get demoStringTrimStart () {
        return demoStringTrimStart;
    },
    get demoSymbolDescription () {
        return demoSymbolDescription;
    },
    get demoWellFormedJSON () {
        return demoWellFormedJSON;
    }
});
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.flat.js");
require("core-js/modules/es.array.flat-map.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.unscopables.flat.js");
require("core-js/modules/es.array.unscopables.flat-map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.from-entries.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.trim-end.js");
require("core-js/modules/es.string.trim-start.js");
// ../es-samples/samples/es2019/array-flat-map.js
function demoArrayFlatMap() {
    var sentences = [
        "hello world",
        "ECMAScript 2019"
    ];
    return sentences.flatMap(function(s) {
        return s.split(" ");
    });
}
// ../es-samples/samples/es2019/array-flat.js
function demoArrayFlat() {
    var nested = [
        1,
        [
            2,
            [
                3,
                [
                    4
                ]
            ]
        ]
    ];
    return nested.flat(2);
}
// ../es-samples/samples/es2019/function-to-string.js
function demoFunctionToString() {
    function sample() {
        return 1;
    }
    return sample.toString();
}
// ../es-samples/samples/es2019/object-from-entries.js
function demoObjectFromEntries() {
    var entries = [
        [
            "name",
            "Alice"
        ],
        [
            "age",
            28
        ],
        [
            "city",
            "Seattle"
        ]
    ];
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
        obj: obj,
        highScores: highScores
    };
}
// ../es-samples/samples/es2019/optional-catch-binding.js
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
function demoStableSort() {
    var items = [
        {
            name: "First",
            val: 5
        },
        {
            name: "Second",
            val: 2
        },
        {
            name: "Third",
            val: 5
        },
        {
            name: "Fourth",
            val: 2
        }
    ];
    items.sort(function(a, b) {
        return a.val - b.val;
    });
    return items.map(function(i) {
        return i.name;
    });
}
// ../es-samples/samples/es2019/string-trim-end.js
function demoStringTrimEnd() {
    var padded = "   ECMAScript 2019   ";
    return padded.trimEnd();
}
// ../es-samples/samples/es2019/string-trim-start.js
function demoStringTrimStart() {
    var padded = "   ECMAScript 2019   ";
    return padded.trimStart();
}
// ../es-samples/samples/es2019/symbol-description.js
function demoSymbolDescription() {
    var sym = Symbol("custom identifier");
    return sym.description;
}
// ../es-samples/samples/es2019/well-formed-json.js
function demoWellFormedJSON() {
    var serialized = JSON.stringify("\uD800");
    return serialized;
}
