
import { call, put, fork, select } from 'redux-saga/effects'

import { DatabaseHelper, AuthHelper } from '../../../Helpers/firebase'
import { checkIsSignedIn } from '../../auth/selectors'
import { saveLocalOctopusRecord } from '../../dashboard/actions'
import { startLoading, endLoading } from '../../userInterface/actions'

const { saveOctopusRecord, transactTotalAmount } = DatabaseHelper

export default function * saveRecord ({payload: {
  record
}}) {
  try {
    yield put(startLoading())
    const state = yield select()
    const isSignedIn = checkIsSignedIn(state)
    yield put(saveLocalOctopusRecord(record))
    if (isSignedIn) {
      const uid = AuthHelper.getCurrentUser().uid
      yield call(saveOctopusRecord, uid, record)
      yield call(transactTotalAmount, uid, record.amount)
    }
    yield put(endLoading())
  } catch (error) {
    console.log(error)
    yield put(endLoading())
  }
}