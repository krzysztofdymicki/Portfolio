"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = __importDefault(require("./helper"));
// --- Draft Object's conversion from JSON to Js regular object
var draft = JSON.parse("{\n    \"blocks\": [\n      {\n        \"key\": \"cppid\",\n        \"text\": \"Jak ka\u017Cdej konferencji online czasu pandemii, wyst\u0105pieniom towarzyszy\u0142y problemy techniczne, z kt\u00F3rych najzabawniejszym okaza\u0142o si\u0119 nag\u0142e znikni\u0119cie z wizji prezydenta Francji Emmanuela Macrona. Zamiast niego na ekranach pojawi\u0142 si\u0119 W\u0142adimir Putin \u2013 najwyra\u017Aniej nie\u015Bwiadomy, \u017Ce ogl\u0105da go ca\u0142y \u015Bwiat. Po kilku minutach wszystko wr\u00F3ci\u0142o do normy i mogli\u015Bmy us\u0142ysze\u0107, \u017Ce r\u00F3wnie\u017C Rosja przejmuje si\u0119 globalnym ociepleniem\u2026\",\n        \"type\": \"unstyled\",\n        \"depth\": 0,\n        \"inlineStyleRanges\": [],\n        \"entityRanges\": [],\n        \"data\": {}\n      }\n    ],\n    \"entityMap\": {}\n  }");
// -- Function takes additional, second parameter when you can specify where link should be added (target) and what its url is (link).
// -- You can look for multiply words and sentences, as the second parameter is an array of objects { target, link }
var result = JSON.stringify(helper_1.default(draft, [{ target: 'Władimir Putin', link: 'http' }, { target: 'blabla', link: 'konf' }])); // JSON.stringify to obtain original JSON object from the assignment.
console.log(result);
