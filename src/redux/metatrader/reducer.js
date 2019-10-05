import { ACTION_TYPES } from './actions'
import { handleActions } from 'redux-actions'

const INITIAL_STATE = {
  openLoginWebView: false,
}

const appReducer = handleActions(
  {
    [ACTION_TYPES.GET_METATRADER_ACCESS_TOKEN_SUCCEEDED]: (
      state,
      { payload: { response } }
    ) => ({
      ...state,
      ...response,
    }),
    [ACTION_TYPES.GET_SIGNAL_NEED_LOGIN]: state => ({
      ...state,
      openLoginWebView: true,
    }),
    [ACTION_TYPES.MQL5_WEBVIEW_CLOSED]: state => ({
      ...state,
      openLoginWebView: false,
    }),
  },
  INITIAL_STATE
)

export default appReducer
