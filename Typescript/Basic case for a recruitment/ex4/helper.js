"use strict";
// types
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
// parsing object from assignment from JSON to js object
var draft = JSON.parse("{\n    \"blocks\": [\n      {\n        \"key\": \"cppid\",\n        \"text\": \"Jak ka\u017Cdej konferencji online czasu pandemii, wyst\u0105pieniom towarzyszy\u0142y problemy techniczne, z kt\u00F3rych najzabawniejszym okaza\u0142o si\u0119 nag\u0142e znikni\u0119cie z wizji prezydenta Francji Emmanuela Macrona. Zamiast niego na ekranach pojawi\u0142 si\u0119 W\u0142adimir Putin \u2013 najwyra\u017Aniej nie\u015Bwiadomy, \u017Ce ogl\u0105da go ca\u0142y \u015Bwiat. Po kilku minutach wszystko wr\u00F3ci\u0142o do normy i mogli\u015Bmy us\u0142ysze\u0107, \u017Ce r\u00F3wnie\u017C Rosja przejmuje si\u0119 globalnym ociepleniem\u2026\",\n        \"type\": \"unstyled\",\n        \"depth\": 0,\n        \"inlineStyleRanges\": [],\n        \"entityRanges\": [],\n        \"data\": {}\n      }\n    ],\n    \"entityMap\": {}\n  }");
// helper functions - finds and creates entity ranges
var createRangeObject = function (offset, length, key) {
    return {
        offset: offset,
        length: length,
        key: +key
    };
};
var createMapObject = function (type, mutability, url) {
    return {
        type: type,
        mutability: mutability,
        data: {
            href: url,
            url: url
        }
    };
};
var createRangesAndMaps = function (text, search, lastKey) {
    var entityMap = {};
    var key = 0;
    var ranges = search.map(function (s) {
        var regexp = new RegExp(s.target, 'g');
        var matches = __spreadArray([], __read(text.matchAll(regexp)));
        if (matches.length > 0) {
            //let keyToString = key.toString()
            return matches.map(function (m) {
                console.log('index', key.toString());
                console.log(m);
                var range = createRangeObject(m.index, s.target.length, key.toString());
                var map = createMapObject('LINK', 'MUTABLE', s.link);
                Object.defineProperty(entityMap, key.toString(), {
                    value: map,
                    enumerable: true
                });
                ++key;
                return range;
            });
        }
        else
            null;
    }).filter(function (e) { return e && e.length > 0; }).flat();
    return {
        ranges: ranges,
        entityMap: entityMap
    };
};
// main function
var addLinks = function (content, search) {
    var block = content.blocks[0];
    var key = block.entityRanges.length;
    var _a = createRangesAndMaps(block.text, search, key), ranges = _a.ranges, entityMap = _a.entityMap;
    block.entityRanges = ranges;
    content.blocks[0] = block;
    content.entityMap = entityMap;
    return content;
};
exports.default = addLinks;
