
import React, {Component} from 'react';
import RootContainer from './Containers'

import { createStore, } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { rootReducer } from './Redux';
import immutableTransform from 'redux-persist-transform-immutable'
import NavigationService from './Navigation';

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  blacklist: ['userInterface']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  // rootReducer
  persistedReducer,
  // applyMiddleware(middleware),
)

const persistor = persistStore(store)

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

