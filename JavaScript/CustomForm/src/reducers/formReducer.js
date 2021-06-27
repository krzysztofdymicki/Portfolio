const initialState = {
  name: '',
  preparation_time: 0,
  type: 'DEFAULT',
  no_of_slices: 0,
  diameter: 0,
  spiciness_scale: 0,
  slices_of_bread: 0
}

const formReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE' :
      return {
        ...state,
        ...action.data
      } 
    case 'RESET' :
      return initialState    
    default : return state
    }
}

export const change = (object) => {
  return {
    type: 'CHANGE',
    data: object
  }
}

export const reset = () => {
  return {
    type: 'RESET'
  }
}

export default formReducer