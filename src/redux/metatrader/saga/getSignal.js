import { call, put, select } from 'redux-saga/effects'

import api from '@src/Helpers/api'
import { authorize } from 'react-native-app-auth'
import { getMetatraderState } from '../selectors'
import { getSignalNeedLogin } from '../actions'

export function* getSignal({ payload: { signalId } }) {
  try {
    const state = yield select(getMetatraderState)
    const { data } = yield call(api.getMetatraderSignal, signalId)

    const tableIndex = data.indexOf(
      `class="responsive-table signal-info-table"`
    )

    if (tableIndex == -1) {
      yield put(getSignalNeedLogin())
    } else {
      const first = data.substring(tableIndex)
      const result = first.substring(0, first.indexOf('</table>'))
      console.log(result)
    }
    // yield put(getMetatraderAccessTokenSucceeded(result))
  } catch (error) {
    // yield put(getMetatraderAccessTokenFailed(error))
  }
}
