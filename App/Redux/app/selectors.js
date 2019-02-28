import { Platform } from 'react-native'


const getAppState = state => state.app

const getAppConfig = state => {
  return getAppState(state).get('appConfig')
}

const getAdmobAppId = state => {
  if (Platform.OS === 'ios') {
    return getAppConfig(state).get('admobIosAppId')
  } else {
    return getAppConfig(state).get('admobAndroidAppId')
  }
}

export {
  getAppConfig,
  getAdmobAppId
}
