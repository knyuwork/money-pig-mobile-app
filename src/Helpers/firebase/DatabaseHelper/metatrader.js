import moment from 'moment'
import * as R from 'ramda'
import firebase from 'react-native-firebase'

export default {
  getMQL5Signals: userId =>
    firebase
      .database()
      .ref(`User/${userId}/metatrader/signals`)
      .once('value')
      .then(snap => snap.val()),
  updateMQL5Signal: (userId, signalId, signalData) => {
    const updatedAt = moment().unix() * 1000
    const signals = Object.values(signalData)
    const buys = R.filter(({ type }) => type === 'Buy')(signals)
    const sells = R.filter(({ type }) => type === 'Sell')(signals)
    const buysSum = R.compose(
      // Math.
      R.sum,
      R.map(buy => buy.volume)
    )(buys)
    const sellsSum = R.compose(
      R.sum,
      R.map(sell => sell.volume)
    )(sells)
    const history = {
      updatedAt,
      buysSum,
      sellsSum,
    }
    const update = {
      openTrades: signalData,
      historys: {
        [moment().format('x')]: history,
      },
    }
    return firebase
      .database()
      .ref(`User/${userId}/metatrader/signals/${signalId}`)
      .update(update)
  },
}
