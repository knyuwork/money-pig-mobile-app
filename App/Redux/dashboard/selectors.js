
const getDashboardState = state => state.dashboard

const getHistory = state => {
  return getDashboardState(state).get('history').toJS()
}

const getTotalAmount = state => {
  return getDashboardState(state).get('totalAmount')
}

export {
  getHistory,
  getTotalAmount
}
