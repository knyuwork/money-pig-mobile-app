import { createAction } from 'redux-actions'

const PREFIX = 'APP'

export const ACTION_TYPES = {
  SET_APP_CONFIG: `${PREFIX}/SET_APP_CONFIG`,
  INITIALIZE_APP: `${PREFIX}/INITIALIZE_APP`,
}

export const setAppConfig = createAction(
  ACTION_TYPES.SET_APP_CONFIG,
  appConfig => ({ appConfig })
)

export const initializeApp = createAction(ACTION_TYPES.INITIALIZE_APP)
