
import { put, select } from 'redux-saga/effects'

import { getOctopusSelectedIndex, getPrice } from '../../octopus/selectors'
import { setMoneySaved } from '../actions'

export default function * fetchPrice () {
  try {
    const state = yield select()
    const octopusSelectedIndex = getOctopusSelectedIndex(state)
    const price = getPrice(state)

    const { adult, elderly, children, student } = price
    const priceList = [parseFloat(elderly), parseFloat(student), parseFloat(children)]
    const moneySaved = adult - priceList[octopusSelectedIndex]
    yield put(setMoneySaved(moneySaved.toFixed(1).toString()))
  } catch (error) {
    console.log(error)
  }
}