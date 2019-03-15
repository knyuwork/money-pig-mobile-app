

const getDashboardState = state => state.dashboard

const getHistory = state => {
  return getDashboardState(state).get('history').toJS()
}

export {
  getHistory
}
