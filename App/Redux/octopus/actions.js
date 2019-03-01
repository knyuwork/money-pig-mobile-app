import { createAction } from 'redux-actions'

const PREFIX = 'APP'

export const ACTION_TYPES = {
  FETCH_MTR_STATIONS_MAP: `${PREFIX}/FETCH_MTR_STATIONS_MAP`,
  SET_MTR_STATIONS_MAP: `${PREFIX}/SET_MTR_STATIONS_MAP`
}


export const fetchMTRStationsMap = createAction(
  ACTION_TYPES.FETCH_MTR_STATIONS_MAP
)

export const setMTRStationsMap = createAction(
  ACTION_TYPES.SET_MTR_STATIONS_MAP,
  (stationsMap) => ({ stationsMap })
)