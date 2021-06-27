import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import formReducer from './reducers/formReducer'
import notificationReducer from './reducers/NotificationReducer'

const mainReducer = combineReducers({
  form: formReducer,
  notification: notificationReducer
})

const store = createStore(
  mainReducer
 ,composeWithDevTools()
  )

export default store