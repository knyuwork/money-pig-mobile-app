import * as R from 'ramda'

export const processSignal = signalData => {
  let buysSum = 0
  let sellsSum = 0
  let buyPriceSum = 0
  let sellPriceSum = 0
  R.map(({ type, volume, price }) => {
    if (type === 'Buy') {
      buysSum = buysSum + volume
      buyPriceSum = buyPriceSum + volume * price
    } else {
      sellsSum = sellsSum + volume
      sellPriceSum = sellPriceSum + volume * price
    }
  })(signalData)
  return {
    buysSum: buysSum.toFixed(2),
    sellsSum: sellsSum.toFixed(2),
    avgBuyPrice: (buyPriceSum / buysSum).toFixed(8),
    avgSellPrice: (sellPriceSum / sellsSum).toFixed(8),
  }
}
