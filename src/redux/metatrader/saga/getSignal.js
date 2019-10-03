import api from '@src/Helpers/api'
import { authorize } from 'react-native-app-auth'
import { call, put, select } from 'redux-saga/effects'

import {
  getMetatraderAccessTokenFailed,
  getMetatraderAccessTokenSucceeded,
} from '../actions'
import { getMetatraderState } from '../selectors'

export function* getSignal({ payload: { signalId } }) {
  try {
    const state = yield select(getMetatraderState)
    console.log(state)
    const { data } = yield call(api.getMetatraderSignal, signalId)
    console.log(data.indexOf(`class="responsive-table signal-info-table"`))
    const first = data.substring(
      data.indexOf(`class="responsive-table signal-info-table"`)
    )
    const result = first.substring(0, first.indexOf('</table>'))
    console.log(result)
    // yield put(getMetatraderAccessTokenSucceeded(result))
  } catch (error) {
    // yield put(getMetatraderAccessTokenFailed(error))
  }
}
