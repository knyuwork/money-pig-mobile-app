

const getOctopusState = state => state.octopus

const getHKMTRStationsMap = state => {
  return getOctopusState(state).get('stationsMap').toJS()
}

const getStationsMapFetchingStatus = state => {
  return getOctopusState(state).get('isMTRStationsMapFetching')
}

const getPrice = state => {
  return getOctopusState(state).get('price').toJS()
}

const getMoneySaved = state => {
  return getOctopusState(state).get('moneySaved')
}

const getOctopusSelectedIndex = state => getOctopusState(state).get('octopusSelectedIndex')

export {
  getHKMTRStationsMap,
  getStationsMapFetchingStatus,
  getPrice,
  getMoneySaved,
  getOctopusSelectedIndex
}
