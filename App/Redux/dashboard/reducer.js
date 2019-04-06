
import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { ACTION_TYPES } from './actions'
import { getLocalHistory } from './selectors'
import { roundTo2DP } from '../../Helpers/rounding'

const INITIAL_STATE = fromJS({
  history: [],
  totalAmount: '0'
})

const dashboardReducer = handleActions(
  {
    [ACTION_TYPES.SAVE_LOCAL_OCTOPUS_RECORD]: 
      (state, { payload: { record } }) => {
        const updatedTotalAmount = parseFloat(state.get('totalAmount')) + parseFloat(record.amount)
        const roundedAmount = roundTo2DP(updatedTotalAmount)
        return state
          .set('history', state.get('history').unshift(record))
          .set('totalAmount', roundedAmount.toFixed(2))
      },
    [ACTION_TYPES.DELETE_RECORD]: 
      (state, { payload: { recordId } }) =>
        state.set('history', state.get('history').filter(oneHistory => oneHistory.get('id') !== recordId)),
    [ACTION_TYPES.UPDATE_LOCAL_HISTORY]: 
      (state, { payload: { history } }) =>
        state.set('history', fromJS(history)),
    [ACTION_TYPES.SET_TOTAL_AMOUNT]: 
      (state, { payload: { amount } }) =>
        state.set('totalAmount', amount.toFixed(2))
  },
  INITIAL_STATE
)

export default dashboardReducer