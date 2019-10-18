import moment from 'moment'
import * as R from 'ramda'
import { call, put } from 'redux-saga/effects'
import api from 'src/Helpers/api'
import AuthHelper from 'src/Helpers/firebase/AuthHelper'
import DatabaseHelper from 'src/Helpers/firebase/DatabaseHelper'

import { getSignalByIdNeedLogin, getSignalByIdSucceed } from '../actions'
import { getSignals } from './getSignals'

export function* getSignalById({ payload: { signalId } }) {
  try {
    const userId = AuthHelper.getCurrentUser().uid
    const { data } = yield call(api.getSignalTradingCSV, signalId)
    const header = [
      'time',
      'type',
      'volume',
      'symbol',
      'price',
      'stopLoss',
      'takeProfit',
      'price',
      'commission',
      'swap',
      'profit',
    ]
    let signalData = {}
    R.compose(
      R.map(row => {
        signalData = R.assoc(row.time, row, signalData)
      }),
      R.map(row => {
        const output = {}
        R.mapObjIndexed((value, index) => {
          output[header[index]] = value
        })(row)
        output.time = moment(output.time).unix() * 1000
        return output
      }),
      R.filter(row => !row[1].includes('Limit')),
      R.filter(row => row[0] !== 'Time'),
      R.filter(row => row.length === 11),
      R.map(row => R.split(';')(row)),
      R.split(/\r\n|\r|\n/)
    )(data)
    yield call(DatabaseHelper.updateMQL5Signal, userId, signalId, signalData)
    yield call(getSignals)
    // yield put(getSignalByIdSucceed(signalId, signalData))
  } catch (error) {
    console.log(error)
    // yield put(getSignalByIdNeedLogin())
  }
}
