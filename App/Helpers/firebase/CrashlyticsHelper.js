import firebase from 'react-native-firebase'

export default {
    logError: (err) => {
      firebase.crashlytics().log(err)
    },
    initializeCrashlytics: () => {
      firebase.crashlytics().enableCrashlyticsCollection()
    }
}
