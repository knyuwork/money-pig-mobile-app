import Firebase from 'react-native-firebase'

// export const getCurrentUser = () => {
//   return Firebase.auth().currentUser
// }

// export const signOutFirebase = () => {
//   return Firebase.auth().signOut()
// }

export default {
  signOutFirebase: () => {
    return Firebase.auth().signOut()
  },
  getCurrentUser: () => {
    return Firebase.auth().currentUser
  },
}
