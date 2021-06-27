const inputReducer = (state = { value: '', focused: null }, action) => {
  switch(action.type) {
    case 'SET_INPUT':
      return {...state, value: action.input}
    case 'SET_FOCUSED':
      return {...state, focused: action.focused}
    default: return state
  }
}

export const setInput = (input) => {
  return {
    type: 'SET_INPUT',
    input
  }
}

export const setFocused = (focused) => {
  return {
    type: 'SET_FOCUSED',
    focused
  }
}

export default inputReducer