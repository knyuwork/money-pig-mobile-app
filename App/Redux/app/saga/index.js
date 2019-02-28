
import { all, takeLatest } from 'redux-saga/effects'
import { ACTION_TYPES } from '../actions'
import loadAllRemoteConfig from './loadAllRemoteConfig'
import initializeApp from './initializeApp'

export function * appSaga () {
  try {
    yield all([
      takeLatest(ACTION_TYPES.INITIALIZE_APP, initializeApp)
    ])
  } catch (error) {
    console.log(error)
  }
}