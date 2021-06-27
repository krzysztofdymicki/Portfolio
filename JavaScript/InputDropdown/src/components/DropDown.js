import React from 'react'

const DropDown = ({ names, input, handleClick, focused }) => {


  // HELPER

  const sliceArray = names.filter((e,i) => i<5).map(name => {
    const boldPart = name.slice(0, input.length)
    const rest = name.slice(input.length)
    return {boldPart, rest, name}
  })


  // STYLE

  const containerStyle = {
    width: 200,
    marginLeft: 50,
    position: 'absolute',
    zIndex: '2'
  }

  const elementStyle = {
    border: 1,
    borderStyle: 'solid',
    width: 200,
    margin: 0,
     padding: '5px 10px'
  }

  const elementStyleFocused = {
    ...elementStyle,
    background: '#D8D8D8'
  }

  return (
    <div style={containerStyle} >
    {
      sliceArray.map((e,i) =>
       <p  
          style={ i === focused ? elementStyleFocused : elementStyle}
          value={e.name}
          key={i}>
       <b>{e.boldPart}</b>{e.rest}
       </p>
       )
    }
    </div>
  )
}

export default DropDown