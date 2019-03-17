import { createAction } from 'redux-actions'

const PREFIX = 'DASHBOARD'

export const ACTION_TYPES = {
  SAVE_OCTOPUS_RECORD: `${PREFIX}/SAVE_OCTOPUS_RECORD`,
  DELETE_RECORD: `${PREFIX}/DELETE_RECORD`
}

export const saveOctopusRecord = createAction(
  ACTION_TYPES.SAVE_OCTOPUS_RECORD,
  (record) => ({ record })
)

export const deleteRecord = createAction(
  ACTION_TYPES.DELETE_RECORD,
  (recordId) => ({ recordId })
)
