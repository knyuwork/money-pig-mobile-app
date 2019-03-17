import { persistStore, persistReducer } from 'redux-persist'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import immutableTransform from 'redux-persist-transform-immutable'
import { combineSagas } from '../Helpers/combineSaga'

import userInterfaceReducer from './userInterface/reducer'
import appReducer from './app/reducer'
import octopusReducer from './octopus/reducer'
import dashboardReducer from './dashboard/reducer'

import { appSaga } from '../redux/app/saga'
import { octopusSaga } from '../redux/octopus/saga'
import { dashboardSaga } from '../redux/dashboard/saga'

export const getStore = () => {
  const rootReducer = combineReducers({
    userInterface: userInterfaceReducer,
    app: appReducer,
    octopus: octopusReducer,
    dashboard: dashboardReducer
  })
  
  const rootSaga = combineSagas([
    appSaga,
    octopusSaga,
    dashboardSaga
  ])
  
  
  const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage,
    whitelist: ['app', 'dashboard']
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  const sagaMiddleware = createSagaMiddleware()
  
  const logger = createLogger({
    // ...options
  });

  const store = createStore(
    // rootReducer,
    persistedReducer,
    applyMiddleware(logger, sagaMiddleware)
  )
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  return {
    store, persistor
  }
}

