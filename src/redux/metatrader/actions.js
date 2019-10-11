import { createAction } from 'redux-actions'

const PREFIX = 'METATRADER'

export const ACTION_TYPES = {
  GET_METATRADER_ACCESS_TOKEN: `${PREFIX}/GET_METATRADER_ACCESS_TOKEN`,
  GET_METATRADER_ACCESS_TOKEN_SUCCEEDED: `${PREFIX}/GET_METATRADER_ACCESS_TOKEN_SUCCEEDED`,
  GET_METATRADER_ACCESS_TOKEN_FAILED: `${PREFIX}/GET_METATRADER_ACCESS_TOKEN_FAILED`,
  GET_SIGNAL: `${PREFIX}/GET_SIGNAL`,
  GET_SIGNAL_NEED_LOGIN: `${PREFIX}/GET_SIGNAL_NEED_LOGIN`,
  MQL5_WEBVIEW_CLOSED: `${PREFIX}/MQL5_WEBVIEW_CLOSED`,
  ADD_NEW_SIGNAL: `${PREFIX}/ADD_NEW_SIGNAL`,
}

export const addNewSignal = createAction(ACTION_TYPES.ADD_NEW_SIGNAL)

export const getMetatraderAccessToken = createAction(
  ACTION_TYPES.GET_METATRADER_ACCESS_TOKEN
)

export const getMetatraderAccessTokenSucceeded = createAction(
  ACTION_TYPES.GET_METATRADER_ACCESS_TOKEN_SUCCEEDED,
  response => ({ response })
)

export const getMetatraderAccessTokenFailed = createAction(
  ACTION_TYPES.GET_METATRADER_ACCESS_TOKEN_FAILED,
  error => ({ error })
)

export const getSignal = createAction(ACTION_TYPES.GET_SIGNAL, signalId => ({
  signalId,
}))

export const getSignalNeedLogin = createAction(
  ACTION_TYPES.GET_SIGNAL_NEED_LOGIN
)

export const mql5WebViewClosed = createAction(ACTION_TYPES.MQL5_WEBVIEW_CLOSED)
