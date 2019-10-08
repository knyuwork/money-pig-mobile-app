import { call, put, select } from 'redux-saga/effects'

import api from '@src/Helpers/api'
import { authorize } from 'react-native-app-auth'
import { getMetatraderState } from '../selectors'
import { getSignalNeedLogin } from '../actions'

const extractBetween = (string, startTag, endTag) => {
  const trimmed = string.substring(string.indexOf(startTag) + startTag.length)
  return trimmed.substring(0, trimmed.indexOf(endTag))
}

const mapOneObject = splitedRowArr => {
  const row = {}
  splitedRowArr.map(string => {
    if (!string.includes('data-label')) {
      return
    }
    const key = extractBetween(string, '"', '"')
    const value = string.substring(string.indexOf('>') + 1)
    row[key] = isNaN(value) ? value : Number(value)
  })
  return row
}

export function* getSignal({ payload: { signalId } }) {
  try {
    const state = yield select(getMetatraderState)
    const { data } = yield call(api.getMetatraderSignal, signalId)

    const tableIndex = data.indexOf(
      `class="responsive-table signal-info-table"`
    )
    if (tableIndex === -1) {
      yield put(getSignalNeedLogin())
    } else {
      const first = data.substring(tableIndex)
      const targetTable = first.substring(0, first.indexOf('</table>'))
      const tableBody = extractBetween(targetTable, '<tbody>', '</tbody>')
      const rows = tableBody
        .substring(0, tableBody.indexOf('<tr class="summary"'))
        .split('</tr>')
      const splitedRow = rows.map(row =>
        row.substring(row.indexOf('<tr>') + '<tr>'.length).split('</td>')
      )
      splitedRow.pop()
      const output = splitedRow.map(mapOneObject)
      console.log(output)
    }
    // yield put(getMetatraderAccessTokenSucceeded(result))
  } catch (error) {
    // yield put(getMetatraderAccessTokenFailed(error))
  }
}
