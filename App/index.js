
import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import createSagaMiddleware from 'redux-saga'

import { rootReducer, rootSaga } from './Redux';
import immutableTransform from 'redux-persist-transform-immutable'
import RootContainer from './Containers'

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  blacklist: ['userInterface']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  // rootReducer
  persistedReducer,
  // applyMiddleware(middleware),
  applyMiddleware(sagaMiddleware)
)
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
          <RootContainer/>
        </PersistGate>
      </Provider>
    );
  }
}

