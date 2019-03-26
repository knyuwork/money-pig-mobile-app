
import { call, put, fork, select } from 'redux-saga/effects'

import { AuthHelper, DatabaseHelper } from '../../../Helpers/firebase'
import { updateLocalHistory, setTotalAmount } from '../actions'
import { getLocalHistory } from '../selectors'

const { getHistory, saveHistory, saveTotalAmount } = DatabaseHelper
const { getCurrentUser } = AuthHelper

export function * mergeHistory () {
  try {
    const state = yield select()
    const uid = getCurrentUser().uid
    const localHistory = getLocalHistory(state)
    const history = yield call(getHistory, uid)
    const updatedHistory = { ...history, ...localHistory }
    const reducedAmount = 
      Object.values(updatedHistory)
        .reduce((prev, current) => ({
          amount: prev.amount + current.amount
        }));
    const mergedTotalAmount = reducedAmount.amount

    // Local redux
    yield put(updateLocalHistory(updatedHistory))
    yield put(setTotalAmount(mergedTotalAmount))

    // Firebase 
    yield call(saveHistory, uid, updatedHistory)
    yield call(saveTotalAmount, uid, mergedTotalAmount)
    
  } catch (error) {
    console.log(error)
  }
}