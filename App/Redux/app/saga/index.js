
import { all, takeLatest } from 'redux-saga/effects'
import { ACTION_TYPES } from '../actions'
import loadAllRemoteConfig from './loadAllRemoteConfig'

export function * appSaga () {
  try {
    yield all([
      takeLatest(ACTION_TYPES.LOAD_ALL_REMOTE_CONFIG, loadAllRemoteConfig)
    ])
  } catch (error) {
    console.log(error)
  }
}