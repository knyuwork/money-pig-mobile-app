import { Platform } from 'react-native'
import { getAppConfig } from '../app/selectors'

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

const getOctopusBannerAdId = state => {
  if (Platform.OS === 'ios') {
    return getAppConfig(state).get('admobIosOctopusBannerAdId')
  } else {
    return getAppConfig(state).get('admobAndroidOctopusBannerAdId')
  }
}
export {
  getHKMTRStationsMap,
  getStationsMapFetchingStatus,
  getPrice,
  getMoneySaved,
  getOctopusSelectedIndex,
  getOctopusBannerAdId
}
