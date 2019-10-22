import moment from 'moment'
import * as R from 'ramda'
import { call, put } from 'redux-saga/effects'
import api from 'src/Helpers/api'
import AuthHelper from 'src/Helpers/firebase/AuthHelper'
import DatabaseHelper from 'src/Helpers/firebase/DatabaseHelper'
import { processSignal } from 'src/Helpers/utils'

import { getSignalByIdNeedLogin, getSignalByIdSucceed } from '../actions'
import { getSignals } from './getSignals'

const header = [
  'time',
  'type',
  'volume',
  'symbol',
  'price',
  'stopLoss',
  'takeProfit',
  'currentPrice',
  'commission',
  'swap',
  'profit',
]

const parseSignalCSV = csvData => {
  var signalData = {}
  R.compose(
    R.map(row => {
      const output = {}
      R.mapObjIndexed((value, index) => {
        output[header[index]] = isNaN(value) ? value : parseFloat(value)
      })(row)
      output.time = moment(output.time, 'YYYY.MM.DD HH:mm:ss').unix()
      signalData = R.assoc(output.time, output, signalData)
      return output
    }),
    R.filter(row => !row[1].includes('Limit')),
    R.filter(row => row[0] !== 'Time'),
    R.filter(row => row.length === 11),
    R.map(row => R.split(';')(row)),
    R.split(/\r\n|\r|\n/)
  )(csvData)
  return signalData
}

export function* getSignalById({ payload: { signalId } }) {
  try {
    const userId = AuthHelper.getCurrentUser().uid
    const { data } = yield call(api.getSignalTradingCSV, signalId)
    const signalData = parseSignalCSV(data)

    const updatedAt = moment().unix()
    const signals = Object.values(signalData)
    const processedSignal = processSignal(signals)

    const overview = {
      updatedAt,
      ...processedSignal,
    }
    const update = {
      openTrades: signalData,
      [`pastOverview/${updatedAt}`]: overview,
      currentOverview: overview,
    }
    yield call(DatabaseHelper.updateMQL5Signal, userId, signalId, update)
    yield call(getSignals)
    // yield put(getSignalByIdSucceed(signalId, signalData))
  } catch (error) {
    yield put(getSignalByIdNeedLogin())
  }
}
