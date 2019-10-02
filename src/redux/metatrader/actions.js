import { createAction } from 'redux-actions'

const PREFIX = 'METATRADER'

export const ACTION_TYPES = {
  GET_METATRADER_ACCESS_TOKEN: `${PREFIX}/GET_METATRADER_ACCESS_TOKEN`,
  GET_METATRADER_ACCESS_TOKEN_SUCCEEDED: `${PREFIX}/GET_METATRADER_ACCESS_TOKEN_SUCCEEDED`,
  GET_METATRADER_ACCESS_TOKEN_FAILED: `${PREFIX}/GET_METATRADER_ACCESS_TOKEN_FAILED`,
}

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
