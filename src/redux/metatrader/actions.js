import { createAction } from 'redux-actions'

const PREFIX = 'METATRADER'

export const ACTION_TYPES = {
  GET_METATRADER_ACCESS_TOKEN: `${PREFIX}/GET_METATRADER_ACCESS_TOKEN`,
  GET_METATRADER_ACCESS_TOKEN_SUCCEEDED: `${PREFIX}/GET_METATRADER_ACCESS_TOKEN_SUCCEEDED`,
  GET_METATRADER_ACCESS_TOKEN_FAILED: `${PREFIX}/GET_METATRADER_ACCESS_TOKEN_FAILED`,
  GET_SIGNAL_BY_ID: `${PREFIX}/GET_SIGNAL_BY_ID`,
  GET_SIGNAL_BY_ID_NEED_LOGIN: `${PREFIX}/GET_SIGNAL_BY_ID_NEED_LOGIN`,
  GET_SIGNAL_BY_ID_SUCCEED: `${PREFIX}/GET_SIGNAL_BY_ID_SUCCEED`,
  GET_SIGNALS: `${PREFIX}/GET_SIGNALS`,
  GET_SIGNALS_SUCCEED: `${PREFIX}/GET_SIGNALS_SUCCEED`,
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

export const getSignalById = createAction(
  ACTION_TYPES.GET_SIGNAL_BY_ID,
  signalId => ({
    signalId,
  })
)

export const getSignalByIdSucceed = createAction(
  ACTION_TYPES.GET_SIGNAL_BY_ID_SUCCEED,
  (signalId, signalData) => ({
    signalId,
    signalData,
  })
)

export const getSignalByIdNeedLogin = createAction(
  ACTION_TYPES.GET_SIGNAL_BY_ID_NEED_LOGIN
)

export const getSignals = createAction(ACTION_TYPES.GET_SIGNALS)

export const getSignalsSucceed = createAction(
  ACTION_TYPES.GET_SIGNALS_SUCCEED,
  signals => ({ signals })
)

export const mql5WebViewClosed = createAction(ACTION_TYPES.MQL5_WEBVIEW_CLOSED)
