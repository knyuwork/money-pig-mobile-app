import * as R from 'ramda'
import { handleActions } from 'redux-actions'

import { ACTION_TYPES } from './actions'

const INITIAL_STATE = {
  openLoginWebView: false,
  subscribedSignalList: [],
}

const metatraderReducer = handleActions(
  {
    [ACTION_TYPES.GET_METATRADER_ACCESS_TOKEN_SUCCEEDED]: (
      state,
      { payload: { response } }
    ) => ({
      ...state,
      ...response,
    }),
    [ACTION_TYPES.GET_SIGNAL_BY_ID_NEED_LOGIN]: state => ({
      ...state,
      openLoginWebView: true,
    }),
    [ACTION_TYPES.MQL5_WEBVIEW_CLOSED]: state => ({
      ...state,
      openLoginWebView: false,
    }),
    [ACTION_TYPES.GET_SIGNALS_SUCCEED]: (state, { payload: { signals } }) => ({
      ...state,
      subscribedSignalList: signals,
    }),
  },
  INITIAL_STATE
)

export default metatraderReducer
