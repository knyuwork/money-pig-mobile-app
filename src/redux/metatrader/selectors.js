import { Platform } from 'react-native'

const getMetatraderState = state => state.metatrader

const openLoginWebViewSelector = state => state.metatrader.openLoginWebView

export { getMetatraderState, openLoginWebViewSelector }
