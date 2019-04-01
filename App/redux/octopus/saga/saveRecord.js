
import { call, put, fork, select } from 'redux-saga/effects'

import { DatabaseHelper, AuthHelper } from '../../../Helpers/firebase'
import { roundTo2DP } from '../../../Helpers/rounding'
import { checkIsSignedIn } from '../../auth/selectors'
import { saveLocalOctopusRecord } from '../../dashboard/actions'
import { getTotalAmount } from '../../dashboard/selectors'
import { startLoading, endLoading } from '../../userInterface/actions'

const { saveOctopusRecord, saveTotalAmount } = DatabaseHelper

export default function * saveRecord ({payload: {
  record
}}) {
  try {
    yield put(startLoading())
    let state = yield select()
    const isSignedIn = checkIsSignedIn(state)
    yield put(saveLocalOctopusRecord(record))

    // Update Firebase record if user is signed in
    if (isSignedIn) {
      state = yield select()
      const updatedTotalAmount = roundTo2DP(parseFloat(getTotalAmount(state)))
      const uid = AuthHelper.getCurrentUser().uid
      yield call(saveOctopusRecord, uid, record)
      yield call(saveTotalAmount, uid, updatedTotalAmount)
    }
    yield put(endLoading())
  } catch (error) {
    console.log(error)
    yield put(endLoading())
  }
}