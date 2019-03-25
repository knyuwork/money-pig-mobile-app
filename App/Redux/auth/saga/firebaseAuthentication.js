
import { call, put, fork, select } from 'redux-saga/effects'

import { setLocalUserInfo, setIsSignedIn } from '../actions'
import { getLocalHistory } from '../../dashboard/selectors'
import { AuthHelper, DatabaseHelper } from '../../../Helpers/firebase'

const { signOutFirebase } = AuthHelper
const { getHistory, saveHistory, setUserInfo } = DatabaseHelper

export function * signInSuccessful ({payload: {
  userInfo
}}) {
  try {
    const state = yield select()
    const uid  = userInfo.uid
    // Local redux
    const localHistory = getLocalHistory(state)
    yield put(setLocalUserInfo(userInfo))
    yield put(setIsSignedIn(true))

    // Firebase 
    const history = yield call(getHistory)
    const updatedHistory = { ...history, ...localHistory }
    yield call(saveHistory, uid, updatedHistory)
    yield call(setUserInfo, uid, userInfo)
  } catch (error) {
    console.log(error)
  }
}

export function * signOut () {
  try {
    const result = yield call(signOutFirebase)
  } catch (error) {
    console.log(error)
  }
}