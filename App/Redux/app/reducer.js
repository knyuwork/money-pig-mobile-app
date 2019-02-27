
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

import { ACTION_TYPES } from './actions'

const INITIAL_STATE = fromJS({
  appConfig: null
})

const appReducer = handleActions(
  {
    
  },
  INITIAL_STATE
)

export default appReducer