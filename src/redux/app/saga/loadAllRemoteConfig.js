import humps from 'humps'
import { call, put } from 'redux-saga/effects'

import { appConfigKeys } from '../../../constant'
import {
  fetchRemoteConfig,
  getAllRemoteConfig,
  getRemoteConfig,
} from '../../../Helpers/firebase/RemoteConfigHelper'
import { setAppConfig } from '../actions'

export default function* loadAllRemoteConfig() {
  try {
    const activate = yield call(fetchRemoteConfig)
    if (activate) {
      const appConfigKeysSnap = yield call(getRemoteConfig, appConfigKeys)
      const remoteConfigKeys = JSON.parse(
        appConfigKeysSnap[appConfigKeys].val()
      )

      const remoteConfig = yield call(getAllRemoteConfig, remoteConfigKeys)
      let appConfig = {}
      Object.keys(remoteConfig).forEach(key => {
        appConfig[key] = remoteConfig[key].val()
      })
      appConfig = humps.camelizeKeys(appConfig)
      yield put(setAppConfig(appConfig))
      console.log(appConfig)
    } else {
    }
  } catch (error) {
    console.log(error)
  }
}
