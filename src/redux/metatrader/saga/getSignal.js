import * as R from 'ramda'

import { call, put } from 'redux-saga/effects'
import { getSignalByIdNeedLogin, getSignalByIdSucceed } from '../actions'

import AuthHelper from '@src/Helpers/firebase/AuthHelper'
import DatabaseHelper from '@src/Helpers/firebase/DatabaseHelper'
import api from '@src/Helpers/api'

export function* getSignal({ payload: { signalId } }) {
  try {
    const userId = AuthHelper.getCurrentUser().uid
    const { data } = yield call(api.getSignalTradingCSV, signalId)
    const header = [
      'Time',
      'Type',
      'Volume',
      'Symbol',
      'Price',
      'StopLoss',
      'TakeProfit',
      'Price',
      'Commission',
      'Swap',
      'Profit',
    ]
    const signalData = R.compose(
      R.map(row => {
        const output = {}
        R.mapObjIndexed((value, index) => {
          output[header[index]] = value
        })(row)
        return output
      }),
      R.filter(row => !row[1].includes('Limit')),
      R.filter(row => row[0] !== header[0]),
      R.filter(row => row.length === 11),
      R.map(row => R.split(';')(row)),
      R.split(/\r\n|\r|\n/)
    )(data)
    yield call(DatabaseHelper.setMQL5Signal, userId, signalId, signalData)
    yield put(getSignalByIdSucceed(signalData))
  } catch (error) {
    yield put(getSignalByIdNeedLogin())
  }
}
