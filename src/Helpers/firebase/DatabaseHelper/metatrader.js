import * as R from 'ramda'

import firebase from 'react-native-firebase'
import moment from 'moment'

const calculateTotalSellsSum = sells =>
  R.compose(
    sum => sum.toFixed(2),
    R.sum,
    R.map(sell => sell.volume)
  )(sells)

const calculateTotalBuysSum = buys =>
  R.compose(
    sum => sum.toFixed(2),
    R.sum,
    R.map(buy => buy.volume)
  )(buys)

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

    const buysSum = calculateTotalBuysSum(buys)
    const sellsSum = calculateTotalSellsSum(sells)

    const overview = {
      updatedAt,
      buysSum,
      sellsSum,
    }
    const update = {
      openTrades: signalData,
      [`pastOverview/${updatedAt}`]: {
        [updatedAt]: overview,
      },
      currentOverview: overview,
    }
    return firebase
      .database()
      .ref(`User/${userId}/metatrader/signals/${signalId}`)
      .update(update)
  },
}
