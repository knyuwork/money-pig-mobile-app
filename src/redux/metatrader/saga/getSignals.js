import * as R from 'ramda'

import { call, put } from 'redux-saga/effects'

import AuthHelper from 'src/Helpers/firebase/AuthHelper'
import DatabaseHelper from 'src/Helpers/firebase/DatabaseHelper'
import { getSignalsSucceed } from '../actions'

export function* getSignals() {
  try {
    const userId = AuthHelper.getCurrentUser().uid
    const res = yield call(DatabaseHelper.getMQL5Signals, userId)
    console.log(res)
    const signals = R.mapObjIndexed(({ currentOverview }, signalId) => ({
      id: signalId,
      ...currentOverview,
    }))(res)
    yield put(getSignalsSucceed(Object.values(signals)))
  } catch (error) {
    console.log(error)
    // yield put(getSignalByIdNeedLogin())
  }
}
