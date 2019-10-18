import * as R from 'ramda'
import { call, put } from 'redux-saga/effects'
import AuthHelper from 'src/Helpers/firebase/AuthHelper'
import DatabaseHelper from 'src/Helpers/firebase/DatabaseHelper'

import { getSignalsSucceed } from '../actions'

export function* getSignals() {
  try {
    const userId = AuthHelper.getCurrentUser().uid
    const res = yield call(DatabaseHelper.getMQL5Signals, userId)
    const signals = R.mapObjIndexed(({ openTrades }, signalId) => ({
      id: signalId,
      openTrades,
    }))(res)
    yield put(getSignalsSucceed(Object.values(signals)))
  } catch (error) {
    console.log(error)
    // yield put(getSignalByIdNeedLogin())
  }
}
