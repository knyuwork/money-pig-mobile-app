import { call, fork, put, select } from 'redux-saga/effects'

import { AuthHelper, DatabaseHelper } from '../../../Helpers/firebase'
import { mergeHistory } from '../../dashboard/actions'
import { endLoading, startLoading } from '../../userInterface/actions'
import { setIsSignedIn, setLocalUserInfo } from '../actions'

const { signOutFirebase } = AuthHelper
const { setUserInfo } = DatabaseHelper

export function* signInSuccessful({ payload: { userInfo } }) {
  try {
    yield put(startLoading())
    const uid = userInfo.uid
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

export function* signOut() {
  try {
    const result = yield call(signOutFirebase)
  } catch (error) {
    console.log(error)
  }
}
