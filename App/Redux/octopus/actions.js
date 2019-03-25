import { createAction } from 'redux-actions'

const PREFIX = 'OCTOPUS'

export const ACTION_TYPES = {
  FETCH_MTR_STATIONS_MAP: `${PREFIX}/FETCH_MTR_STATIONS_MAP`,
  FETCH_PRICE: `${PREFIX}/FETCH_PRICE`,
  SET_MTR_STATIONS_MAP: `${PREFIX}/SET_MTR_STATIONS_MAP`,
  SET_PRICE: `${PREFIX}/SET_PRICE`,
  SET_MONEY_SAVED: `${PREFIX}/SET_MONEY_SAVED`,
  SAVE_RECORD: `${PREFIX}/SAVE_RECORD`,
  SET_OCTOPUS_SELECTED_INDEX: `${PREFIX}/SET_OCTOPUS_SELECTED_INDEX`,
  MTR_STATIONS_MAP_FETCHING: `${PREFIX}/MTR_STATIONS_MAP_FETCHING`,
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

export const fetchPrice = createAction(
  ACTION_TYPES.FETCH_PRICE,
  (startStation, endStation) => ({ startStation, endStation })
)

export const setPrice = createAction(
  ACTION_TYPES.SET_PRICE,
  (price) => ({ price })
)

export const setMoneySaved = createAction(
  ACTION_TYPES.SET_MONEY_SAVED,
  (moneySaved) => ({ moneySaved })
)

export const setOctopusSelectedIndex = createAction(
  ACTION_TYPES.SET_OCTOPUS_SELECTED_INDEX,
  (octopusSelectedIndex) => ({ octopusSelectedIndex })
)

export const saveRecord = createAction(
  ACTION_TYPES.SAVE_RECORD,
  (record) => ({ record })
)
