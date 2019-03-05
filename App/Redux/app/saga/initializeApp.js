
import { call, put, fork, select } from 'redux-saga/effects'

import loadAllRemoteConfig from './loadAllRemoteConfig'
// import { fetchMTRStationsMap } from '../../octopus/actions'
import fetchMTRStationsMap from '../../octopus/saga/fetchMTRStationsMap'
import { initializeAdmob } from '../../../Helpers/firebase/AdmobHelper'
import { getAdmobAppId } from '../selectors'

export default function * initializeApp () {
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