
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

import { ACTION_TYPES } from './actions'

const INITIAL_STATE = fromJS({
  appConfig: {}
})

const appReducer = handleActions(
  {
    [ACTION_TYPES.SET_APP_CONFIG]: (state, { payload: { appConfig } }) =>
      state.set('appConfig', fromJS(appConfig)),
  },
  INITIAL_STATE
)

export default appReducer