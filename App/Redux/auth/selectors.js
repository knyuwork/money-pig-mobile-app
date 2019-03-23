
const getAuthState = state => state.auth

const checkIsSignedIn = state => {
  return getAuthState(state).get('isSignedIn')
}

export {
  checkIsSignedIn
}
