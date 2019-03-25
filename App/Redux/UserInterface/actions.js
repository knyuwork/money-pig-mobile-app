import { createAction } from 'redux-actions'

const PREFIX = 'USER_INTERFACE'

export const ACTION_TYPES = {
  START_LOADING: `${PREFIX}/START_LOADING`,
  END_LOADING: `${PREFIX}/END_LOADING`
}

export const startLoading = createAction(
  ACTION_TYPES.START_LOADING
)

export const endLoading = createAction(
  ACTION_TYPES.END_LOADING
)
