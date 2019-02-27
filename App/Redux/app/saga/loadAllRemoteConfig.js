
import { call, put } from 'redux-saga/effects'
import { fetchRemoteConfig, getRemoteConfig } from '../../../Helpers/firebase/RemoteConfigHelper'
import firebase from 'react-native-firebase'

export default function * loadAllRemoteConfig () {
  try {
    const activate = yield call(fetchRemoteConfig)
    if (activate) {
      const res = yield call(getRemoteConfig, 'APP_CONFIG_KEYS')
      console.log(res)
    } else {

    }
  } catch (error) {
    console.log(error)
  }
}