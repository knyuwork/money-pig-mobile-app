
import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { ACTION_TYPES } from './actions'
import { getMoneySaved } from './selectors'

const INITIAL_STATE = fromJS({
  history: {},
  moneySaved: '0'
})

const dashboardReducer = handleActions(
  {
    [ACTION_TYPES.SAVE_OCTOPUS_RECORD]: 
      (state, { payload: { record } }) => {
        const newMoneySaved = parseFloat(state.get('moneySaved')) + parseFloat(record.moneySaved)
        return state
          .setIn(['history', record.createdTs], record)
          .set('moneySaved', newMoneySaved.toFixed(2))
          // .update('history', history => history.push(record))
      }
        ,
    [ACTION_TYPES.DELETE_RECORD]: 
      (state, { payload: { recordId } }) =>
        state.set('history', state.get('history').filter(oneHistory => oneHistory.get('id') !== recordId))
  },
  INITIAL_STATE
)

export default dashboardReducer