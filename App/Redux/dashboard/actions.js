import { createAction } from 'redux-actions'

const PREFIX = 'DASHBOARD'

export const ACTION_TYPES = {
  SAVE_LOCAL_OCTOPUS_RECORD: `${PREFIX}/SAVE_LOCAL_OCTOPUS_RECORD`,
  SET_TOTAL_AMOUNT: `${PREFIX}/SET_TOTAL_AMOUNT`,
  DELETE_RECORD: `${PREFIX}/DELETE_RECORD`,
  UPDATE_LOCAL_HISTORY: `${PREFIX}/UPDATE_LOCAL_HISTORY`,
  MERGE_HISTORY: `${PREFIX}/MERGE_HISTORY`
}

export const saveLocalOctopusRecord = createAction(
  ACTION_TYPES.SAVE_LOCAL_OCTOPUS_RECORD,
  (record) => ({ record })
)

export const setTotalAmount = createAction(
  ACTION_TYPES.SET_TOTAL_AMOUNT,
  (amount) => ({ amount })
)

export const deleteRecord = createAction(
  ACTION_TYPES.DELETE_RECORD,
  (recordId) => ({ recordId })
)

export const updateLocalHistory = createAction(
  ACTION_TYPES.UPDATE_LOCAL_HISTORY,
  (history) => ({ history })
)

export const mergeHistory = createAction(
  ACTION_TYPES.MERGE_HISTORY
)