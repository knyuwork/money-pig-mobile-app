


const actons = {
  START_LOADING: 'START_LOADING',
  END_LOADING: 'END_LOADING',
  startLoading: () => ({type: actons.START_LOADING}),
  endLoading: () => ({type: actons.END_LOADING})
};

export default actons;
