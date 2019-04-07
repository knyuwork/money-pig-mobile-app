
const getDashboardState = state => state.dashboard

const getLocalHistory = state => {
  return getDashboardState(state).get('history').toJS()
}

const getLocalTotalAmount = state => {
  return getDashboardState(state).get('totalAmount')
}

export {
  getLocalHistory,
  getLocalTotalAmount
}
