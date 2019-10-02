import { all, takeLatest } from 'redux-saga/effects'

import { ACTION_TYPES } from '../actions'
import { mergeHistory } from './mergeHistory'
import { removeRecord } from './removeRecord'

export function* dashboardSaga() {
  try {
    yield all([
      takeLatest(ACTION_TYPES.MERGE_HISTORY, mergeHistory),
      takeLatest(ACTION_TYPES.DELETE_RECORD, removeRecord),
    ])
  } catch (error) {
    console.log(error)
  }
}
