import { combineReducers } from 'redux'
import { combineSagas } from '../Helpers/combineSaga'

import userInterface from './userInterface/reducer'

import { appSaga } from '../Redux/app/saga'

export const rootReducer = combineReducers({
  userInterface
})

export const rootSaga = combineSagas([
  appSaga
])