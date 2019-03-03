
import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { ACTION_TYPES } from './actions'

const INITIAL_STATE = fromJS({
  stationsMap: {},
  isMTRStationsMapFetching: false
})

const octopusReducer = handleActions(
  {
    [ACTION_TYPES.SET_MTR_STATIONS_MAP]: 
      (state, { payload: { stationsMap } }) => 
        state.set('stationsMap', fromJS(stationsMap)),
    [ACTION_TYPES.FETCH_MTR_STATIONS_MAP]: 
      (state) => state.set('isMTRStationsMapFetching', !state.get('isMTRStationsMapFetching'))
  },
  INITIAL_STATE
)

export default octopusReducer // appReducer