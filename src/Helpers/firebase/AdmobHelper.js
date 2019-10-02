import firebase from 'react-native-firebase'

export const initializeAdmob = admonAppId => {
  return firebase.admob().initialize(admonAppId)
}
