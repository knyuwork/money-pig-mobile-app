import { call, put } from 'redux-saga/effects'
import {
  fetchRemoteConfig,
  getAllRemoteConfig,
  getRemoteConfig,
} from '../../../Helpers/firebase/RemoteConfigHelper'

import { appConfigKeys } from '../../../constant'
import humps from 'humps'
import { setAppConfig } from '../actions'

const test = {
  admob_android_appId: 'ca-app-pub-8273861087920374~3515128780',
  admob_ios_appId: 'ca-app-pub-8273861087920374~2608621702',
  admob_android_octopusBannerAdId: 'ca-app-pub-8273861087920374/7100339941',
  admob_ios_octopusBannerAdId: 'ca-app-pub-8273861087920374/5118578430',
  hkmtr_apiDomain: 'https://us-central1-devtool-691c7.cloudfunctions.net',
  metatrader_clientId: 'hq07yl',
  metatrader_clientSecret:
    'LANWQNNPEYNNVOZTVTVNCYJTSYPGHRIOFQTMTNLCONYNWFNXFBXDAQBMRTERYGHN',
  metatrader_redirectUrl:
    'https://us-central1-moneypig-prod.cloudfunctions.net/metatrader/oauth2callback',
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
    } else {
    }
  } catch (error) {
    console.log(error)
  }
}
