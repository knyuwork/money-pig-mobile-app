import firebase from 'react-native-firebase'

export default {
  setMQL5Signal: (userId, signalId, signalData) =>
    new Promise((resolve, reject) => {
      try {
        firebase
          .database()
          .ref(`User/${userId}/metatrader/signals/${signalId}`)
          .set(signalData, err => {
            if (err) {
              reject(err)
            } else {
              resolve(signalData)
            }
          })
      } catch (err) {
        reject(err)
      }
    }),
}
