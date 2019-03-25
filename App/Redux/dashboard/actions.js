import { createAction } from 'redux-actions'

const PREFIX = 'DASHBOARD'

export const ACTION_TYPES = {
  SAVE_OCTOPUS_RECORD: `${PREFIX}/SAVE_OCTOPUS_RECORD`,
  DELETE_RECORD: `${PREFIX}/DELETE_RECORD`,
  UPDATE_LOCAL_HISTORY: `${PREFIX}/UPDATE_LOCAL_HISTORY`
}

export const saveLocalOctopusRecord = createAction(
  ACTION_TYPES.SAVE_OCTOPUS_RECORD,
  (record) => ({ record })
)

export const deleteRecord = createAction(
  ACTION_TYPES.DELETE_RECORD,
  (recordId) => ({ recordId })
)

export const updateLocalHistory = createAction(
  ACTION_TYPES.UPDATE_LOCAL_HISTORY,
  (history) => ({ history })
)
