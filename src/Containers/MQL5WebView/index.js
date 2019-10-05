import { Dimensions, Text, TouchableOpacity, WebView } from 'react-native'
import React, { Component } from 'react'
import {
  getMetatraderAccessToken,
  getSignal,
  mql5WebViewClosed,
} from '@src/redux/metatrader/actions'

import GradientBackground from '@src/Components/GradientBackground'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
type Props = {
  getMetatraderAccessToken: () => void,
  mql5WebViewClosed: () => void,
}
class MQL5WebView extends Component<Props> {
  state = {
    result: 'nothing',
  }

  componentWillUnmount() {
    this.props.mql5WebViewClosed()
  }

  handleMessage = e => {
    console.log('reacted')
    console.log(e.nativeEvent.data)
  }

  render() {
    const { result } = this.state
    const jsCode = `
      window.ReactNativeWebView.postMessage(document.getElementsByClassName("loginRegister"))
    `
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
  // { getMetatraderAccessToken }
  { getMetatraderAccessToken, getSignal, mql5WebViewClosed }
)(MQL5WebView)
