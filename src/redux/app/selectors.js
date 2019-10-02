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

const getHKMTRApiDomain = state => {
  return getAppConfig(state).get('hkmtrApiDomain')
}

const getMetatraderAuthConfig = state => ({
  clientId: getAppConfig(state).get('metatraderClientId'),
  clientSecret: getAppConfig(state).get('metatraderClientSecret'),
  redirectUrl: getAppConfig(state).get('metatraderRedirectUrl'),
})

export {
  getAppState,
  getAppConfig,
  getAdmobAppId,
  getHKMTRApiDomain,
  getMetatraderAuthConfig,
}
