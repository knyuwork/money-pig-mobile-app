import { combineReducers } from 'redux'
import user from './User/reducer'
import userInterface from './UserInterface/reducer'

export const rootReducer = combineReducers({
  user,
  userInterface
})