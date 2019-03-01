
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

import { ACTION_TYPES } from './actions'

const INITIAL_STATE = fromJS({
  stationsMap: null
})

const appReducer = handleActions(
  {
    [ACTION_TYPES.SET_MTR_STATIONS_MAP]: (state, { payload: { stationsMap } }) =>
      state.set('stationsMap', fromJS(stationsMap)),
  },
  INITIAL_STATE
)

export default appReducer