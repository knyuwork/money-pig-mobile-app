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
  saveTotalAmount: (userId, totalAmount) => new Promise((resolve, reject) => {
    try {
      firebase.database().ref(`User/${userId}/totalAmount`).set(totalAmount, err => {
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
  saveOctopusRecord: (userId, record) => new Promise((resolve, reject) => {
    const { createdTs } = record
    const newSavingHistoryRef = firebase.database().ref(`User/${userId}/history/${createdTs}`)
    newSavingHistoryRef.set(record, err => {
      if (err) {
        reject(err)
      }
      resolve({ message: 'SUCCESS' })
    })
  }),
  setUserInfo: (userId, userInfo) => {
    const userInfoRef = firebase.database().ref(`User/${userId}/userInfo`)
    userInfoRef.set(userInfo)
  }
}