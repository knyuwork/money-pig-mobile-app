import React, { Component } from 'react'
import CodePush from 'react-native-code-push'
import Orientation from 'react-native-orientation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import RootContainer from './Containers'
import { CrashlyticsHelper } from './Helpers/firebase'
import { getStore } from './redux'

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
}
const { store, persistor } = getStore()

CrashlyticsHelper.initializeCrashlytics()
type Props = {}
class App extends Component<Props> {
  componentDidMount() {
    Orientation.lockToPortrait()
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    )
  }
}

export default CodePush(codePushOptions)(App)
