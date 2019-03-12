import firebase from 'react-native-firebase'


// User
export default {
  saveOctopusRecord: (userId, record) => {
    firebase.database().ref(`User/${userId}/savingHistory`)
  }
}