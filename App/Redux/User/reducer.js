import { Map } from 'immutable';
import actions from './actions';


const initState = new Map({
  refreshToken: null,
  providerId: null,
  providerData: null,
	uid: null,
});

export default userReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      const { response } = action
      return state
              .set('uid', response.uid)
              .set('refreshToken', response.refreshToken)
              .set('providerId', response.providerId)
              .set('providerData', response.providerData)
    default:
      return state;
  }
}
