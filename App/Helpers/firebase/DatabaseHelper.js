import firebase from 'react-native-firebase'

// User
export default {
  getHistory: (userId) => new Promise((resolve, reject) => {
    try {
      firebase.database().ref(`User/${userId}/history`).once('value', snap => {
        resolve(snap ? snap.val() : [])
      })
    } catch (err) {
      reject(err)
    }
  }),
  saveHistory: (userId, history) => new Promise((resolve, reject) => {
    try {
      console.log(history)
      firebase.database().ref(`User/${userId}/history`).set(history, err => {
        if (err) {
          reject(err)
        } else {
          resolve({ message: 'success' })
        }
      })
    } catch (err) {
      reject(err)
    }
  }),
  saveOctopusRecord: (userId, record) => {
    const newSavingHistoryRef = firebase.database().ref(`User/${userId}/history`).push()
    newSavingHistoryRef.set({
      ...record,
      id: newSavingHistoryRef.key
    })
  },
  setUserInfo: (userId, userInfo) => {
    const userInfoRef = firebase.database().ref(`User/${userId}/userInfo`)
    userInfoRef.set(userInfo)
  }
}