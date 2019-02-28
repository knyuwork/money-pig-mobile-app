
import { call, put, fork, select } from 'redux-saga/effects'

import loadAllRemoteConfig from './loadAllRemoteConfig'
import { initializeAdmob } from '../../../Helpers/firebase/AdmobHelper'
import { getAdmobAppId } from '../selectors'

export default function * initializeApp () {
  try {
    yield fork(loadAllRemoteConfig)
    const state = yield select()
    const admobAppId = getAdmobAppId(state)
    yield call(initializeAdmob, admobAppId)
  } catch (error) {
    console.log(error)
  }
}