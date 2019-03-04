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

import { appSaga } from '../Redux/app/saga'
import { octopusSaga } from '../Redux/octopus/saga'

export const getStore = () => {
  const rootReducer = combineReducers({
    userInterface: userInterfaceReducer,
    app: appReducer,
    octopus: octopusReducer
  })
  
  const rootSaga = combineSagas([
    appSaga,
    octopusSaga
  ])
  
  
  const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage,
    whitelist: ['app']
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

