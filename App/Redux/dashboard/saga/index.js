
import { all, takeLatest } from 'redux-saga/effects'
import { ACTION_TYPES } from '../actions'

import { mergeHistory } from './mergeHistory'

export function * dashboardSaga () {
  try {
    yield all([
      takeLatest(ACTION_TYPES.MERGE_HISTORY, mergeHistory)
    ])
  } catch (error) {
    console.log(error)
  }
}