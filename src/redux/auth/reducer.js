import { Map, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

import { ACTION_TYPES } from './actions'
import { getMoneySaved } from './selectors'

const INITIAL_STATE = fromJS({
  isSignedIn: false,
  userInfo: null,
})

const authReducer = handleActions(
  {
    [ACTION_TYPES.INITIALIZE_AUTH]: state => INITIAL_STATE,
    [ACTION_TYPES.SET_IS_SIGNED_IN]: (state, { payload: { isSignedIn } }) =>
      state.set('isSignedIn', isSignedIn),
  },
  INITIAL_STATE
)

export default authReducer
