import { all, takeLatest } from 'redux-saga/effects'

import { ACTION_TYPES } from '../actions'
import initializeApp from './initializeApp'
import loadAllRemoteConfig from './loadAllRemoteConfig'

export function* appSaga() {
  try {
    yield all([takeLatest(ACTION_TYPES.INITIALIZE_APP, initializeApp)])
  } catch (error) {
    console.log(error)
  }
}
