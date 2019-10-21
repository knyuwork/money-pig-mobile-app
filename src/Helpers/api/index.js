import { metatraderApiInstance } from './clients'

const paths = {
  stationsMap: '/hkmtr/stations',
  prices: '/hkmtr/prices',
}

export default {
  fetchHKMTRPrice: (apiDomain, station1, station2) => {
    return fetch(
      `${apiDomain}${paths.prices}?station1=${station1}&station2=${station2}`
    )
      .then(res => res.json())
      .catch(err => console.log(err))
  },
  fetchHKMTRStationsMap: apiDomain => {
    return fetch(`${apiDomain}${paths.stationsMap}`)
      .then(res => res.json())
      .catch(err => console.log(err))
  },
  getMetatraderSignal: signalId =>
    metatraderApiInstance.get(`/signals/${signalId}`),
  getSignalTradingCSV: signalId =>
    metatraderApiInstance
      .get(`/signals/${signalId}/export/trading`)
      .then(res => {
        if (res.data.includes('HTML')) {
          throw new Error('NEED_LOGIN')
        } else {
          return res
        }
      }),
}
