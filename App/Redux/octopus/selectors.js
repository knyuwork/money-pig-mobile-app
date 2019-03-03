
const getOctopusState = state => state.octopus

const getHKMTRStationsMap = state => {
  return getOctopusState(state).get('stationsMap')
}

const getStationsMapFetchingStatus = state => {
  return getOctopusState(state).get('isMTRStationsMapFetching')
}

export {
  getHKMTRStationsMap,
  getStationsMapFetchingStatus
}
