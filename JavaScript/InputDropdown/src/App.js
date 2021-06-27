import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { initUsers } from './reducers/usersReducer'
import { setInput, setFocused } from './reducers/inputReducer'
import Input from './components/Input'

const App = () => {

  // STATE

  const dispatch = useDispatch()

  const input = useSelector(({ input }) => input.value)
  const focused = useSelector(({ input }) => input.focused)
  const filteredNames = useSelector(({ users, input }) => {
    if(users && input.value) {
      const names = users
                        .map(user => user.name)
                        .filter(name => name.toLowerCase().startsWith(input.value.toLowerCase()))
      if(names[0] === input.value) return null
      return names.length > 4
        ? names.slice(0,3)
        : names
    }
    return []
  })

  useEffect(() => {
    dispatch(initUsers())
  },[dispatch])

  // HANDLERS

  const handleInputChange = ({ target }) => {
    dispatch(setInput(target.value))
    filteredNames && filteredNames.length > -1
      ? dispatch(setFocused(0))
      : dispatch(setFocused(null))
  }

  const handleKeyDown = ({ keyCode, target }) => {
    switch(keyCode) {
      case 40: 
        if(filteredNames.length && (!focused && focused !== 0)) {
          dispatch(setFocused(0))
        } else if(focused < filteredNames.length - 1) {
          dispatch(setFocused(focused + 1))
        }
      break
      case 38:
        if(filteredNames.length && focused && focused > 0) {
          dispatch(setFocused(focused - 1))
        } else if(focused === 0) {
          dispatch(setFocused(null))
        }
      break
      case 13:
        if(filteredNames.length === 1) {
          dispatch(setInput(filteredNames[0]))
        }
        else if(filteredNames.length && (focused || focused === 0)) {
          dispatch(setInput(filteredNames[focused]))
        } 
      break
      default: return null
    }
  }

  // STYLE 

  const containerStyle = {
    width: '100vw',
    height: '100vh',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto'
  }


  return (
    <div 
        className="App"
        style={containerStyle}>
      <Input  names={filteredNames}
              input={input}
              handleChange={handleInputChange}
              focused={focused}
              handleKeyDown={handleKeyDown}
              />
    </div>
  );
}

export default App;
