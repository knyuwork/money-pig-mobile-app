import { combineReducers } from 'redux'
import { combineSagas } from '../Helpers/combineSaga'

import userInterfaceReducer from './userInterface/reducer'
import appReducer from './app/reducer'

import { appSaga } from '../Redux/app/saga'

export const rootReducer = combineReducers({
  userInterface: userInterfaceReducer,
  app: appReducer
})

export const rootSaga = combineSagas([
  appSaga
])