import { createAction } from 'redux-actions'

const PREFIX = 'DASHBOARD'

export const ACTION_TYPES = {
  SAVE_OCTOPUS_RECORD: `${PREFIX}/SAVE_OCTOPUS_RECORD`,
}

export const saveOctopusRecord = createAction(
  ACTION_TYPES.SAVE_OCTOPUS_RECORD,
  (record) => ({ record })
)