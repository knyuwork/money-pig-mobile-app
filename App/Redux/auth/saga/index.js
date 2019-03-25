
import { all, takeLatest } from 'redux-saga/effects'
import { ACTION_TYPES } from '../actions'
import { signInSuccessful, signOut } from './authentication'

export function * authSaga () {
  try {
    yield all([
      takeLatest(ACTION_TYPES.SIGN_IN_SUCCESSFUL, signInSuccessful),
      takeLatest(ACTION_TYPES.SIGN_OUT, signOut)
    ])
  } catch (error) {
    console.log(error)
  }
}