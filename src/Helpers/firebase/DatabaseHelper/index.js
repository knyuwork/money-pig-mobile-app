import firebase from 'react-native-firebase'
import metatrader from './metatrader'
import { roundTo2DP } from '../../rounding'

// User
export default {
  deleteRecord: (userId, createdTs) =>
    firebase
      .database()
      .ref(`User/${userId}/history/${createdTs}`)
      .remove(),
  getHistory: userId =>
    new Promise((resolve, reject) => {
      try {
        firebase
          .database()
          .ref(`User/${userId}/history`)
          .orderByChild('createdTs')
          .once('value', snap => {
            resolve(snap)
          })
      } catch (err) {
        reject(err)
      }
    }),
  saveHistory: (userId, history) =>
    new Promise((resolve, reject) => {
      try {
        firebase
          .database()
          .ref(`User/${userId}/history`)
          .set(history, err => {
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
  getTotalAmount: userId =>
    new Promise((resolve, reject) => {
      try {
        firebase
          .database()
          .ref(`User/${userId}/totalAmount`)
          .once('value', snap => {
            const totalAmount = snap.val()
            resolve(totalAmount ? totalAmount : 0)
          })
      } catch (err) {
        reject(err)
      }
    }),
  transactTotalAmount: (userId, amount) =>
    new Promise((resolve, reject) => {
      const roundedAmount = roundTo2DP(amount)
      try {
        firebase
          .database()
          .ref(`User/${userId}/totalAmount`)
          .transaction(
            totalAmount => totalAmount + roundedAmount,
            err => {
              if (err) {
                reject(err)
              } else {
                resolve({ message: 'success' })
              }
            }
          )
      } catch (err) {
        reject(err)
      }
    }),
  saveTotalAmount: (userId, totalAmount) =>
    new Promise((resolve, reject) => {
      try {
        firebase
          .database()
          .ref(`User/${userId}/totalAmount`)
          .set(totalAmount, err => {
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
  saveOctopusRecord: (userId, record) =>
    new Promise((resolve, reject) => {
      const { createdTs } = record
      const newSavingHistoryRef = firebase
        .database()
        .ref(`User/${userId}/history/${createdTs}`)
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
  },
  ...metatrader,
}
