
import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { ACTION_TYPES } from './actions'

const INITIAL_STATE = fromJS({
  isLoading: false,
})

const userInterfaceReducer = handleActions(
  {
    [ACTION_TYPES.START_LOADING]: 
      state => state .set('isLoading', true ),
    [ACTION_TYPES.END_LOADING]: 
      state => state .set('isLoading', false ),
  },
  INITIAL_STATE
)

export default userInterfaceReducer

