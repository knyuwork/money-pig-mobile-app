
const getDashboardState = state => state.dashboard

const getHistory = state => {
  return getDashboardState(state).get('history').toJS()
}

const getMoneySaved = state => {
  return getDashboardState(state).get('moneySaved')
}

export {
  getHistory,
  getMoneySaved
}
