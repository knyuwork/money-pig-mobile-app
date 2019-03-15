

const getDashboardState = state => state.dashboard

const getHKMTRStationsMap = state => {
  return getOctopusState(state).get('stationsMap').toJS()
}

export {
  
}
