import firebase from 'react-native-firebase'
import moment from 'moment'

// User
export default {
  saveOctopusRecord: (userId, record) => {
    const newSavingHistoryRef = firebase.database().ref(`User/${userId}/savingHistory`).push()
    newSavingHistoryRef.set({
      ...record,
      id: newSavingHistoryRef.key,
      createdTs: moment().unix().utc()
    })
  },
  setUserInfo: (userId, userInfo) => {
    const userInfoRef = firebase.database().ref(`User/${userId}/userInfo`)
    userInfoRef.set(userInfo)
  }
}