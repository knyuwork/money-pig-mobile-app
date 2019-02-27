import { createAction } from 'redux-actions'

const PREFIX = 'APP'

export const ACTION_TYPES = {
  LOAD_ALL_REMOTE_CONFIG: `${PREFIX}/LOAD_ALL_REMOTE_CONFIG`,
}

export const loadAllRemoteConfig = createAction(
  ACTION_TYPES.LOAD_ALL_REMOTE_CONFIG
)
