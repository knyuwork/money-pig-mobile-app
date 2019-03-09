
import { all, takeLatest } from 'redux-saga/effects'
import { ACTION_TYPES } from '../actions'
import fetchMTRStationsMap from './fetchMTRStationsMap'
import fetchPrice from './fetchPrice'

export function * octopusSaga () {
  try {
    yield all([
      takeLatest(ACTION_TYPES.FETCH_MTR_STATIONS_MAP, fetchMTRStationsMap),
      takeLatest(ACTION_TYPES.FETCH_PRICE, fetchPrice)
    ])
  } catch (error) {
    console.log(error)
  }
}