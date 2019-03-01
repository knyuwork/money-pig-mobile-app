
import { all, takeLatest } from 'redux-saga/effects'
import { ACTION_TYPES } from '../actions'
import fetchMTRStationsMap from './fetchMTRStationsMap'

export function * octopusSaga () {
  try {
    yield all([
      takeLatest(ACTION_TYPES.FETCH_MTR_STATIONS_MAP, fetchMTRStationsMap)
    ])
  } catch (error) {
    console.log(error)
  }
}