// types

type targetAndLink = {
    target: string
    link: string
}

type entityRangeObject = {
    offset: number | undefined
    length: number
    key: number
} | undefined

type entityMapObject = {
    type: string
    mutability: string
    data: {
        href: string
        target?: string
        url: string
    }
}

type entityMap = {
    [key in string]: entityMapObject
}

type block = {
    key: string
    text: string
    type: string
    depth: number
    inlineStyleRanges: string[]
    entityRanges: entityRangeObject[]
    data: {}
}

type draftObject = {
    blocks: block[],
    entityMap: entityMapObject
}

// parsing object from assignment from JSON to js object

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

// helper functions - finds and creates entity ranges

const createRangeObject = (offset: number | undefined, length: number, key: string): entityRangeObject => {
    return {
        offset,
        length,
        key: +key
    }
}

const createMapObject = (type: string, mutability: string, url: string): entityMapObject => {
    return {
        type,
        mutability,
        data: {
            href: url,
            url
        }
    }
}

const createRangesAndMaps = (text: string, search: targetAndLink[], lastKey: number)  => {
    let entityMap = {}
    let key = 0
    const ranges = search.map( s => {
        const regexp = new RegExp(s.target,'g')
        const matches = [...text.matchAll(regexp)]
        if(matches.length > 0) {
            //let keyToString = key.toString()
            return matches.map(m => {
                console.log('index', key.toString())
                console.log(m)
                const range: entityRangeObject =  createRangeObject(m.index, s.target.length, key.toString())
                const map: entityMapObject = createMapObject('LINK', 'MUTABLE', s.link)
                Object.defineProperty(entityMap, key.toString(), {
                    value: map,
                    enumerable: true
                })
                ++key
                return range
            })
        }else null
    }).filter(e => e && e.length > 0).flat()

    return {
        ranges,
        entityMap: entityMap as entityMapObject 
    }
}

// main function

const addLinks = (content: draftObject, search: targetAndLink[]): draftObject => {
    let block: block = content.blocks[0]
    const key = block.entityRanges.length
    const { ranges, entityMap } = createRangesAndMaps(block.text, search, key)
    block.entityRanges = ranges
    content.blocks[0] = block
    content.entityMap = entityMap
    return content
}


export default addLinks








