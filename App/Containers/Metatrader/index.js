import { Linking, Text, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import { getMetatraderAccessToken } from '@src/redux/metatrader/actions'

type Props = {}
class Metatrader extends Component<Props> {
  state = {
    result: 'nothing',
  }

  handleLogin = () => {
    // console.log(this.props)
    this.props.getMetatraderAccessToken()
  }

  render() {
    const { result } = this.state
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        forceInset={{ top: 'never' }}
      >
        <TouchableOpacity
          style={{ padding: 8, borderRadius: 24, backgroundColor: 'yellow' }}
          onPress={this.handleLogin}
        >
          <Text style={{ color: 'white' }}>Login MQL5</Text>
        </TouchableOpacity>
        <Text>Result: {result}</Text>
      </SafeAreaView>
    )
  }
}

export default connect(
  null,
  // { getMetatraderAccessToken }
  { getMetatraderAccessToken }
)(Metatrader)
