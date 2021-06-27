import React from 'react'

import DropDown from './DropDown'

const Input = ({ names,
                 input,
                 focused,
                 handleChange,
                 handleKeyDown }) => {


  // STYLE

 const labelStyle = {
   display: 'inline-block',
   width: 50
 }

 const inputStyle = {
   width: 200,
   padding: '5px 10px',
   border: 1,
   borderStyle: 'solid',
   maring: 0
 }


  return (
    <div>
    <label style={labelStyle}>Users</label>
     <input style={inputStyle}
            value={input}
            onKeyDown={handleKeyDown}
            onChange={handleChange}/>
    {
      names &&
      <DropDown names={names}
                input={input}
                focused={focused}/>
    }
    </div>
  )
}

export default Input 