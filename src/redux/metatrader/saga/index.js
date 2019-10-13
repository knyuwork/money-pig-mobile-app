import { all, takeLatest } from 'redux-saga/effects'

import { ACTION_TYPES } from '../actions'
import { getMetatraderAccessToken } from './getMetatraderAccessToken'
import { getSignal } from './getSignal'

export function* metatraderSaga() {
  try {
    yield all([
      takeLatest(
        ACTION_TYPES.GET_METATRADER_ACCESS_TOKEN,
        getMetatraderAccessToken
      ),
      takeLatest(ACTION_TYPES.GET_SIGNAL_BY_ID, getSignal),
    ])
  } catch (error) {
    console.log(error)
  }
}
