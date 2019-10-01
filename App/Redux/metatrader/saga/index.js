import { all, takeLatest } from 'redux-saga/effects'

import { ACTION_TYPES } from '../actions'
import { getMetatraderAccessToken } from './getMetatraderAccessToken'

export function* metatraderSaga() {
  try {
    yield all([
      takeLatest(
        ACTION_TYPES.GET_METATRADER_ACCESS_TOKEN,
        getMetatraderAccessToken
      ),
    ])
  } catch (error) {
    console.log(error)
  }
}
