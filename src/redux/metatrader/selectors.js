const getMetatraderState = state => state.metatrader

const openLoginWebViewSelector = state => state.metatrader.openLoginWebView

const subscribedSignalListSelector = state =>
  state.metatrader.subscribedSignalList

export {
  getMetatraderState,
  openLoginWebViewSelector,
  subscribedSignalListSelector,
}
