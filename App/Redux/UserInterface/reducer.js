import { Map } from 'immutable';
import actions from './actions';


const initState = new Map({
  isLoading: false,
  isShowChatroomPartnerModal: false
});

export default userReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.START_LOADING:
      return state
              .set('isLoading', true)
    case actions.END_LOADING:
      return state
              .set('isLoading', false)
    case actions.OPEN_CHATROOM_PARTNER_MODAL:
      return state
              .set('isShowChatroomPartnerModal', true)
    case actions.CLOSE_CHATROOM_PARTNER_MODAL:
      return state
              .set('isShowChatroomPartnerModal', false)
    default:
      return state;
  }
}
