import * as R from 'ramda'

import { ACTION_TYPES } from './actions'
import { handleActions } from 'redux-actions'

const INITIAL_STATE = {
  openLoginWebView: false,
  subscribedSignalList: [],
}

const newSignal = {
  type: 'signal',
  id: null,
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
    [ACTION_TYPES.GET_SIGNAL_BY_ID_NEED_LOGIN]: state => ({
      ...state,
      openLoginWebView: true,
    }),
    [ACTION_TYPES.MQL5_WEBVIEW_CLOSED]: state => ({
      ...state,
      openLoginWebView: false,
    }),
    [ACTION_TYPES.ADD_NEW_SIGNAL]: state => ({
      ...state,
      subscribedSignalList: R.append(newSignal)(state.subscribedSignalList),
    }),
  },
  INITIAL_STATE
)

export default appReducer
