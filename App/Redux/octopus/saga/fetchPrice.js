
import { call, put, fork, select } from 'redux-saga/effects'

import api from '../../../Helpers/api'
import { getHKMTRApiDomain } from '../../app/selectors'
import { getOctopusSelectedIndex } from '../../octopus/selectors'
import { setPrice, setMoneySaved } from '../actions'

export default function * fetchPrice ({payload: {
  startStation, endStation
}}) {
  try {
    const state = yield select()
    const hkmtrApiDomain = getHKMTRApiDomain(state)
    const octopusSelectedIndex = getOctopusSelectedIndex(state)
    const price = yield call(api.fetchHKMTRPrice, hkmtrApiDomain, startStation, endStation)
    if (price.error) {
      yield put(setPrice({
        adult: 0,
        elderly: 0,
        children: 0,
        student: 0
      }))
      yield put(setMoneySaved('0'))
    } else {
      const { adult, elderly, children, student } = price
      const priceList = [elderly, student, children]
      const moneySaved = adult - priceList[octopusSelectedIndex]
      yield put(setPrice(price))
      yield put(setMoneySaved(moneySaved.toFixed(1).toString()))
    }
  } catch (error) {
    console.log(error)
  }
}