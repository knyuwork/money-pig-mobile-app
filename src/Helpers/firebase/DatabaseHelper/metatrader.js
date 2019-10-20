import firebase from 'react-native-firebase'

export default {
  getMQL5Signals: userId =>
    firebase
      .database()
      .ref(`User/${userId}/metatrader/signals`)
      .once('value')
      .then(snap => snap.val()),
  updateMQL5Signal: (userId, signalId, signalData) =>
    firebase
      .database()
      .ref(`User/${userId}/metatrader/signals/${signalId}`)
      .update(signalData),
}
