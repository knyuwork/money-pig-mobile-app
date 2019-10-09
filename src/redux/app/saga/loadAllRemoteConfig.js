import * as R from 'ramda'

import { call, put } from 'redux-saga/effects'
import {
  fetchRemoteConfig,
  getAllRemoteConfig,
  getRemoteConfig,
} from '../../../Helpers/firebase/RemoteConfigHelper'

import { appConfigKeys } from '../../../constant'
import humps from 'humps'
import { setAppConfig } from '../actions'

const parseRemoteConfig = config => {
  let output = {}
  R.forEachObjIndexed((value, key) => {
    output = R.assocPath(R.split('_')(key), value, output)
  }, config)
  return output
}

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
    }
  } catch (error) {
    console.log(error)
  }
}
