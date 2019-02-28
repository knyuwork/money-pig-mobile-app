
import { call, put } from 'redux-saga/effects'
import humps from 'humps'

import { appConfigKeys } from '../../../constant'
import { fetchRemoteConfig, getRemoteConfig, getAllRemoteConfig } from '../../../Helpers/firebase/RemoteConfigHelper'
import { setAppConfig } from '../actions'

export default function * loadAllRemoteConfig () {
  try {
    const activate = yield call(fetchRemoteConfig)
    if (activate) {
      const appConfigKeysSnap = yield call(getRemoteConfig, appConfigKeys)
      const remoteConfigKeys = JSON.parse(appConfigKeysSnap[appConfigKeys].val())

      const remoteConfig = yield call(getAllRemoteConfig, remoteConfigKeys)
      let appConfig = {}
      Object.keys(remoteConfig).forEach(key => {
        appConfig[key] = remoteConfig[key].val()
      })
      appConfig = humps.camelizeKeys(appConfig)
      yield put(setAppConfig(appConfig))
    } else {

    }
  } catch (error) {
    console.log(error)
  }
}