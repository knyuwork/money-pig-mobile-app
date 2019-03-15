
import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { ACTION_TYPES } from './actions'

const INITIAL_STATE = fromJS({
  history: []
})

const dashboardReducer = handleActions(
  {
    [ACTION_TYPES.SAVE_OCTOPUS_RECORD]: 
      (state, { payload: { record } }) => 
        state.update('history', history => history.push(record))
  },
  INITIAL_STATE
)

export default dashboardReducer