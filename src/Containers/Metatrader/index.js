import { Dimensions, Text, TouchableOpacity, WebView } from 'react-native'
import React, { Component } from 'react'
import {
  getMetatraderAccessToken,
  getSignal,
} from '@src/redux/metatrader/actions'

import GradientBackground from '@src/Components/GradientBackground'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import { openLoginWebViewSelector } from '@src/redux/metatrader/selectors'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
type Props = {
  getMetatraderAccessToken: () => void,
  getSignal: () => void,
  openLoginWebView: boolean,
  navigation: Object,
}
class Metatrader extends Component<Props> {
  state = {
    result: 'nothing',
  }

  handleLogin = () => {
    // NOT IN USE
    this.props.getMetatraderAccessToken()
  }

  componentDidUpdate(prevProps) {
    const { openLoginWebView } = this.props
    if (!prevProps.openLoginWebView && openLoginWebView) {
      this.props.navigation.push('mql5WebView')
    }
  }

  getSignal = () => {
    // console.log(this.props)
    this.props.getSignal('508078')
  }

  render() {
    const { result } = this.state
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
        forceInset={{ top: 'never' }}
      >
        <GradientBackground
          style={{
            marginBottom: (-1 * SCREEN_HEIGHT) / 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              margin: 16,
              padding: 8,
              borderRadius: 24,
              backgroundColor: 'yellow',
            }}
            onPress={this.getSignal}
          >
            <Text style={{ color: 'white' }}>Get Signal</Text>
          </TouchableOpacity>
          <Text>Result: {result}</Text>
        </GradientBackground>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({
    openLoginWebView: openLoginWebViewSelector(state),
  }),
  // { getMetatraderAccessToken }
  { getMetatraderAccessToken, getSignal }
)(Metatrader)
