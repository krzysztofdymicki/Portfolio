import usersServices from '../services/usersServices'

const usersReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USERS': 
      return action.users
    default: return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await usersServices.getAll()
    dispatch({
      type: 'INIT_USERS',
      users
    })
  }
}

export default usersReducer