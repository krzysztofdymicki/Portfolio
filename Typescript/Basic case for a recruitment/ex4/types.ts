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

export {
    targetAndLink,
    entityRangeObject,
    entityMapObject,
    entityMap,
    block,
    draftObject
}