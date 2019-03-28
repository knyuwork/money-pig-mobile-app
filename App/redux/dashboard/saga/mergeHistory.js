
import { call, put, select } from 'redux-saga/effects'

import { AuthHelper, DatabaseHelper } from '../../../Helpers/firebase'
import { roundTo2DP } from '../../../Helpers/rounding'

import { updateLocalHistory, setTotalAmount } from '../actions'
import { getLocalHistory } from '../selectors'

const { getHistory, getTotalAmount, saveHistory, saveTotalAmount } = DatabaseHelper
const { getCurrentUser } = AuthHelper

export function * mergeHistory () {
  try {
    const state = yield select()
    const uid = getCurrentUser().uid
    // const localHistory = getLocalHistory(state)
    const totalAmount = yield call(getTotalAmount, uid)
    const historySnap = yield call(getHistory, uid)
    let historyList = []
    historySnap.forEach(childSnap => {
      historyList.push(childSnap.val())
    })
    
    // Local redux
    yield put(updateLocalHistory(historyList.reverse()))
    yield put(setTotalAmount(totalAmount))

    
  } catch (error) {
    console.log(error)
  }
}