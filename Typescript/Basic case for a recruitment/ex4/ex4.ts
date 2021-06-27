import { draftObject } from './types'
import addLinks from './helper'

// --- Draft Object's conversion from JSON to Js regular object

const draft: draftObject  = JSON.parse(`{
    "blocks": [
      {
        "key": "cppid",
        "text": "Jak każdej konferencji online czasu pandemii, wystąpieniom towarzyszyły problemy techniczne, z których najzabawniejszym okazało się nagłe zniknięcie z wizji prezydenta Francji Emmanuela Macrona. Zamiast niego na ekranach pojawił się Władimir Putin – najwyraźniej nieświadomy, że ogląda go cały świat. Po kilku minutach wszystko wróciło do normy i mogliśmy usłyszeć, że również Rosja przejmuje się globalnym ociepleniem…",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }
    ],
    "entityMap": {}
  }`)

// -- Function takes additional, second parameter when you can specify where link should be added (target) and what its url is (link).
// -- You can look for multiply words and sentences, as the second parameter is an array of objects { target, link }

const result = JSON.stringify(addLinks(draft, [{target: 'Władimir Putin', link: 'http'}, {target: 'blabla', link: 'konf'}])) // JSON.stringify to obtain original JSON object from the assignment.
console.log(result)