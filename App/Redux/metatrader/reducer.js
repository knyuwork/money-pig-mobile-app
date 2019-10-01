import actions from './actions'
import { handleActions } from 'redux-actions'

const INITIAL_STATE = {}

const { ACTION_TYPES } = actions

const appReducer = handleActions(
  {
    [ACTION_TYPES.GET_METATRADER_ACCESS_TOKEN_SUCCEEDED]: (
      state,
      { payload: { response } }
    ) => ({
      ...state,
      ...response,
    }),
  },
  INITIAL_STATE
)

export default appReducer
