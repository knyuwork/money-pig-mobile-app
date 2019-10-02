import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'

import { combineSagas } from '../Helpers/combineSaga'
import appReducer from './app/reducer'
import { appSaga } from './app/saga'
import authReducer from './auth/reducer'
import { authSaga } from './auth/saga'
import dashboardReducer from './dashboard/reducer'
import { dashboardSaga } from './dashboard/saga'
import { metatraderSaga } from './metatrader/saga'
import octopusReducer from './octopus/reducer'
import { octopusSaga } from './octopus/saga'
import userInterfaceReducer from './userInterface/reducer'

export const getStore = () => {
  const rootReducer = combineReducers({
    userInterface: userInterfaceReducer,
    app: appReducer,
    octopus: octopusReducer,
    dashboard: dashboardReducer,
    auth: authReducer,
  })

  const rootSaga = combineSagas([
    appSaga,
    octopusSaga,
    dashboardSaga,
    authSaga,
    metatraderSaga,
  ])

  const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage,
    whitelist: ['app', 'dashboard'],
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const sagaMiddleware = createSagaMiddleware()

  const logger = createLogger({
    // ...options
  })

  const store = createStore(
    // rootReducer,
    persistedReducer,
    applyMiddleware(logger, sagaMiddleware)
  )
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  return {
    store,
    persistor,
  }
}
