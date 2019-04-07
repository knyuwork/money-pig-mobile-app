
import React, {Component} from 'react'
import { Provider } from 'react-redux'
import Orientation from 'react-native-orientation';

import { PersistGate } from 'redux-persist/integration/react'
import CodePush from "react-native-code-push"
import RootContainer from './Containers'
import { getStore } from './redux'

import { CrashlyticsHelper } from './Helpers/firebase'

const codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME }
const { store, persistor } = getStore()

CrashlyticsHelper.initializeCrashlytics()
type Props = {};
class App extends Component<Props> {

  componentDidMount() {
    Orientation.lockToPortrait()
  }

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

export default CodePush(codePushOptions)(App)