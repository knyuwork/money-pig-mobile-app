import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import {
  getMetatraderAccessToken,
  getSignal,
  mql5WebViewClosed,
} from 'src/redux/metatrader/actions'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
type Props = {
  getMetatraderAccessToken: () => void,
  mql5WebViewClosed: () => void,
  navigation: Object,
}
class MQL5WebView extends Component<Props> {
  componentWillUnmount() {
    this.props.mql5WebViewClosed()
  }

  handleMessage = e => {
    const { url } = e.nativeEvent
    const { navigation } = this.props
    if (url === 'https://www.mql5.com/en') {
      navigation.goBack()
    }
  }

  render() {
    const jsCode = `(function() {
      window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
  })();`
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
        forceInset={{ top: 'never' }}
      >
        <WebView
          source={{ uri: 'https://www.mql5.com/en/auth_login' }}
          onMessage={this.handleMessage}
          injectedJavaScript={jsCode}
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    )
  }
}

export default connect(
  null,
  { getMetatraderAccessToken, getSignal, mql5WebViewClosed }
)(MQL5WebView)
