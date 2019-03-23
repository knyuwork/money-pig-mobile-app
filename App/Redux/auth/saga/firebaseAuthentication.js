
import { call, put, fork, select } from 'redux-saga/effects'

import { setUserInfo, setIsSignedIn } from '../actions'
import { signOutFirebase } from '../../../Helpers/firebase/AuthHelper'

export function * signInSuccessful ({payload: {
  userInfo
}}) {
  try {
    yield put(setUserInfo(userInfo))
    yield put(setIsSignedIn(true))
  } catch (error) {
    console.log(error)
  }
}

export function * signOut () {
  try {
    const result = yield call(signOutFirebase)
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}