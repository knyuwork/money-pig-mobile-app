import { createAction } from 'redux-actions'

const PREFIX = 'AUTH'

export const ACTION_TYPES = {
  SIGN_IN_SUCCESSFUL: `${PREFIX}/SIGN_IN_SUCCESSFUL`,
  SIGN_OUT: `${PREFIX}/SIGN_OUT`,
  SET_USER_INFO: `${PREFIX}/SET_USER_INFO`,
  SET_IS_SIGNED_IN: `${PREFIX}/SET_IS_SIGNED_IN`,
  INITIALIZE_AUTH: `${PREFIX}/INITIALIZE_AUTH`
}

export const signInSuccessful = createAction(
  ACTION_TYPES.SIGN_IN_SUCCESSFUL,
  (userInfo) => ({ userInfo })
)

export const signOut = createAction(
  ACTION_TYPES.SIGN_OUT
)

export const setUserInfo = createAction(
  ACTION_TYPES.SET_USER_INFO,
  (userInfo) => ({ userInfo })
)

export const initializeAuth = createAction(
  ACTION_TYPES.INITIALIZE_AUTH
)

export const setIsSignedIn = createAction(
  ACTION_TYPES.SET_IS_SIGNED_IN, 
  (isSignedIn) => ({ isSignedIn })
)