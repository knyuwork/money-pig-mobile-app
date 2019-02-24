


const actons = {
  START_LOADING: 'START_LOADING',
  END_LOADING: 'END_LOADING',
  OPEN_CHATROOM_PARTNER_MODAL: 'OPEN_CHATROOM_PARTNER_MODAL',
  CLOSE_CHATROOM_PARTNER_MODAL: 'CLOSE_CHATROOM_PARTNER_MODAL',
  startLoading: () => ({type: actons.START_LOADING}),
  endLoading: () => ({type: actons.END_LOADING}),
  openChatroomPartnerModal: () => ({type: actons.OPEN_CHATROOM_PARTNER_MODAL}),
  closeChatroomPartnerModal: () => ({type: actons.CLOSE_CHATROOM_PARTNER_MODAL})
};

export default actons;
