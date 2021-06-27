const flatten = (array) => {
  if(array.find(e => Array.isArray(e))) {
    let flattenOne = array.flat()
    return flatten(flattenOne)
  }
  return array
}


const lookForCommons = (arr1, arr2) => {
  let result = []
  arr1.forEach(e1 => {
  arr2.find(e2 => e2 === e1 )
      ? result.push(e1)
      : null
  })
  return [...new Set(result)]
}

const lookForDifferent = (arr1, arr2) => {
  let result = []
  arr1.forEach(e1 => {
  arr2.find(e2 => e2 === e1 )
      ? null
      : result.push(e1)
  })
  return [...new Set(result)]
}

const transformObject = (obj) => {
  return Object.entries(obj)
}

const transformObjectReversed = (arr) => {
  const obj = {}
  arr.forEach(e => {
    Object.defineProperty(obj, e[0], {
      value: e[1],
      enumerable: true
    })
  })
  return obj
}

const ex9 = (arr1, arr2) => {

  const [shorter, longer] = [arr1,arr2].sort((a,b) => a.length - b.length)
  let result = []
  shorter.forEach((e,i) => {
    result.push([e, longer[i]])
  })
  return result
}

const ex10 = (arrOfKeys, object) => {

  arrOfKeys.forEach(key => {
    object = object[key]
  })

  return object
}

const compare = (obj1, obj2) => {

  const arrayOfAll = [...Object.entries(obj1), ...Object.entries(obj2)].sort((a,b) => a[0].localeCompare(b[0]))
  if(arrayOfAll.length % 2 !==0) return false

  let result = true

for(let i = 0; i<arrayOfAll.length-1; i = i+2) {
  console.log(arrayOfAll[i])
  if(arrayOfAll[i][0] !== arrayOfAll[i+1][0] || arrayOfAll[i][1] !== arrayOfAll[i+1][1] ) {
     result = false 
  }
}
return result
}

const filterObject = (list, object) => {
  const objectEntries = Object.entries(object)
  const filteredEntries = objectEntries
                                      .map(e1 => list.find(e2 => e2 === e1[0]) ? null : e1)
                                      .filter(e => e)
  const newObject = {}
  filteredEntries.forEach(e => {
    Object.defineProperty(newObject, e[0], {
      value: e[1],
      enumerable: true
    })
  })
  return newObject
}

const decrement = (
  () => {
    let privateCounter = 0
    return () => {
      privateCounter = privateCounter - 1
      return privateCounter
    }
  }
)()

decrement()
decrement()
console.log(decrement())




 