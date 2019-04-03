
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import RootContainer from './Containers'
import { getStore } from './redux'

import { CrashlyticsHelper } from './Helpers/firebase'

const { initializeCrashlytics } = CrashlyticsHelper

initializeCrashlytics()
const { store, persistor } = getStore()

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

