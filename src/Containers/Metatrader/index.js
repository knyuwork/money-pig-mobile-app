import GradientBackground from '@src/Components/GradientBackground'
import {
  getMetatraderAccessToken,
  getSignal,
} from '@src/redux/metatrader/actions'
import React, { Component } from 'react'
import { Dimensions, Text, TouchableOpacity, WebView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
type Props = {
  getMetatraderAccessToken: () => void,
}
class Metatrader extends Component<Props> {
  state = {
    result: 'nothing',
  }

  handleLogin = () => {
    // console.log(this.props)
    this.props.getMetatraderAccessToken()
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
            onPress={this.handleLogin}
          >
            <Text style={{ color: 'white' }}>Login MQL5</Text>
          </TouchableOpacity>
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
        <WebView
          source={{ uri: 'https://www.mql5.com/en/signals/508078' }}
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    )
  }
}

export default connect(
  null,
  // { getMetatraderAccessToken }
  { getMetatraderAccessToken, getSignal }
)(Metatrader)
