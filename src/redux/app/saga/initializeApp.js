import { call, fork, put, select } from 'redux-saga/effects'

import { initializeAdmob } from '../../../Helpers/firebase/AdmobHelper'
// import { fetchMTRStationsMap } from '../../octopus/actions'
import fetchMTRStationsMap from '../../octopus/saga/fetchMTRStationsMap'
import { getAdmobAppId } from '../selectors'
import loadAllRemoteConfig from './loadAllRemoteConfig'

export default function* initializeApp() {
  try {
    yield call(loadAllRemoteConfig)
    const state = yield select()
    const admobAppId = getAdmobAppId(state)
    yield call(initializeAdmob, admobAppId)
    // yield put(fetchMTRStationsMap())
    yield fork(fetchMTRStationsMap)
  } catch (error) {
    console.log(error)
  }
}
