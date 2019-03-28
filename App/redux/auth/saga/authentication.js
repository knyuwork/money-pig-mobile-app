
import { call, put, fork, select } from 'redux-saga/effects'

import { setLocalUserInfo, setIsSignedIn } from '../actions'
import { mergeHistory } from '../../dashboard/actions'
import { startLoading, endLoading } from '../../userInterface/actions'
import { AuthHelper, DatabaseHelper } from '../../../Helpers/firebase'

const { signOutFirebase } = AuthHelper
const { setUserInfo } = DatabaseHelper

export function * signInSuccessful ({payload: {
  userInfo
}}) {
  try {
    yield put(startLoading())
    const uid  = userInfo.uid
    yield call(setUserInfo, uid, userInfo)
    yield put(setLocalUserInfo(userInfo))
    yield put(setIsSignedIn(true))

    yield put(mergeHistory())
    yield put(endLoading())
  } catch (error) {
    console.log(error)
    yield put(endLoading())
  }
}

export function * signOut () {
  try {
    const result = yield call(signOutFirebase)
  } catch (error) {
    console.log(error)
  }
}