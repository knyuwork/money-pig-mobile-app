

const paths = {
  stationsMap: '/stations',
  prices: '/prices'
}

export default {
  fetchHKMTRPrice: (apiDomain, station1, station2) => {
    return fetch(`${apiDomain}${paths.prices}`)
  },
  fetchHKMTRStationsMap: (apiDomain) => {
    return fetch(`${apiDomain}${paths.stationsMap}`)
  }
} 