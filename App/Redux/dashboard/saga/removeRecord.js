
import { call, put, select } from 'redux-saga/effects'

import { AuthHelper, DatabaseHelper } from '../../../Helpers/firebase'
import { roundTo2DP } from '../../../Helpers/rounding'

import { updateLocalHistory, setTotalAmount } from '../actions'
import { getLocalHistory, getLocalTotalAmount } from '../selectors'

const { getHistory, deleteRecord, saveTotalAmount } = DatabaseHelper
const { getCurrentUser } = AuthHelper

export function * removeRecord ({
  payload: {
    record: {
      amount, createdTs
    }
  }}) {
  try {
    const state = yield select()
    const totalAmount = getLocalTotalAmount(state)
    const localHistory = getLocalHistory(state)

    // calculation
    const updatedAmount = roundTo2DP(parseFloat(totalAmount) - amount)
    const updatedLocalHistory = localHistory.filter(record => record.createdTs !== createdTs)

    // firebase update
    if (getCurrentUser()) {
      const uid = getCurrentUser().uid
      yield call(deleteRecord, uid, createdTs)
      yield call(saveTotalAmount, uid, updatedAmount)
    }
    
    // Local redux
    yield put(updateLocalHistory(updatedLocalHistory))
    yield put(setTotalAmount(updatedAmount))
  } catch (error) {
    console.log(error)
  }
}