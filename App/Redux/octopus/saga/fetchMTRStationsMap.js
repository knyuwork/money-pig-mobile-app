
import { call, put, fork, select } from 'redux-saga/effects'

import api from '../../../Helpers/api'
import { getHKMTRApiDomain } from '../../app/selectors'
import { setMTRStationsMap, toggleMTRStationsMapFetching } from '../../octopus/actions'

export default function * fetchMTRStationsMap () {
  try {
    const state = yield select()
    const hkmtrApiDomain = getHKMTRApiDomain(state)
    const stationsMap = yield call(api.fetchHKMTRStationsMap, hkmtrApiDomain)
    yield put(setMTRStationsMap(stationsMap || {}))
  } catch (error) {
    console.log(error)
  }
}