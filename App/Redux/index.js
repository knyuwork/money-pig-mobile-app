import { combineReducers } from 'redux'
import { combineSagas } from '../Helpers/combineSaga'

import userInterfaceReducer from './userInterface/reducer'
import appReducer from './app/reducer'
import octopusReducer from './octopus/reducer'

import { appSaga } from '../Redux/app/saga'
import { octopusSaga } from '../Redux/octopus/saga'

export const rootReducer = combineReducers({
  userInterface: userInterfaceReducer,
  app: appReducer,
  octopus: octopusSaga
})

export const rootSaga = combineSagas([
  appSaga,
  octopusSaga
])