
import { call, put, fork, select } from 'redux-saga/effects'

import api from '../../../Helpers/api'
import { getHKMTRApiDomain } from '../../app/selectors'

export default function * fetchMTRStationsMap () {
  try {
    console.log('reached')
    const state = yield select()
    const hkmtrApiDomain = getHKMTRApiDomain(state)
    console.log(hkmtrApiDomain)
    const res = yield call(api.fetchHKMTRStationsMap, hkmtrApiDomain)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}