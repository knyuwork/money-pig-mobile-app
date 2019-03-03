import { createAction } from 'redux-actions'

const PREFIX = 'OCTOPUS'

export const ACTION_TYPES = {
  FETCH_MTR_STATIONS_MAP: `${PREFIX}/FETCH_MTR_STATIONS_MAP`,
  SET_MTR_STATIONS_MAP: `${PREFIX}/SET_MTR_STATIONS_MAP`,
  MTR_STATIONS_MAP_FETCHING: `${PREFIX}/MTR_STATIONS_MAP_FETCHING`
}


export const toggleMTRStationsMapFetching = createAction(
  ACTION_TYPES.MTR_STATIONS_MAP_FETCHING
)

export const fetchMTRStationsMap = createAction(
  ACTION_TYPES.FETCH_MTR_STATIONS_MAP
)

export const setMTRStationsMap = createAction(
  ACTION_TYPES.SET_MTR_STATIONS_MAP,
  (stationsMap) => ({ stationsMap })
)