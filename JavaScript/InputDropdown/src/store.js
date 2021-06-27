import {createStore,
        combineReducers,
        applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import usersReducer from './reducers/usersReducer'
import inputReducer from './reducers/inputReducer'

const mainReducer = combineReducers({
  users: usersReducer,
  input: inputReducer
})

const store = createStore(
  mainReducer,
  applyMiddleware(thunk)
)

export default store
