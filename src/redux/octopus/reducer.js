import { Map, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

import { ACTION_TYPES } from './actions'

const INITIAL_STATE = fromJS({
  stationsMap: {},
  price: {
    adult: 0,
    elderly: 0,
    children: 0,
    student: 0,
  },
  moneySaved: '0',
  octopusSelectedIndex: 0,
  isMTRStationsMapFetching: false,
})

const octopusReducer = handleActions(
  {
    [ACTION_TYPES.SET_MTR_STATIONS_MAP]: (
      state,
      { payload: { stationsMap } }
    ) => state.set('stationsMap', fromJS(stationsMap)),
    [ACTION_TYPES.FETCH_MTR_STATIONS_MAP]: state =>
      state.set(
        'isMTRStationsMapFetching',
        !state.get('isMTRStationsMapFetching')
      ),
    [ACTION_TYPES.SET_PRICE]: (state, { payload: { price } }) =>
      state.set('price', fromJS(price)),
    [ACTION_TYPES.SET_MONEY_SAVED]: (state, { payload: { moneySaved } }) =>
      state.set('moneySaved', moneySaved),
    [ACTION_TYPES.SET_OCTOPUS_SELECTED_INDEX]: (
      state,
      { payload: { octopusSelectedIndex } }
    ) => state.set('octopusSelectedIndex', octopusSelectedIndex),
    [ACTION_TYPES.FETCH_PRICE]: state =>
      state.set(
        'isMTRStationsMapFetching',
        !state.get('isMTRStationsMapFetching')
      ),
  },
  INITIAL_STATE
)

export default octopusReducer
