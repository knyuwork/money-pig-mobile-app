import firebase from 'react-native-firebase'

export default {
    recordError: (code, message) => {
      firebase.crashlytics().recordError(code, message)
    },
    initializeCrashlytics: () => {
      firebase.crashlytics().enableCrashlyticsCollection()
    }
}
