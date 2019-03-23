
const getDashboardState = state => state.dashboard

const getLocalHistory = state => {
  return getDashboardState(state).get('history').toJS()
}

const getTotalAmount = state => {
  return getDashboardState(state).get('totalAmount')
}

export {
  getLocalHistory,
  getTotalAmount
}
