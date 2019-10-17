import { all, takeLatest } from 'redux-saga/effects'

import { ACTION_TYPES } from '../actions'
import { getMetatraderAccessToken } from './getMetatraderAccessToken'
import { getSignalById } from './getSignalById'

export function* metatraderSaga() {
  try {
    yield all([
      takeLatest(
        ACTION_TYPES.GET_METATRADER_ACCESS_TOKEN,
        getMetatraderAccessToken
      ),
      takeLatest(ACTION_TYPES.GET_SIGNAL_BY_ID, getSignalById),
    ])
  } catch (error) {
    console.log(error)
  }
}
