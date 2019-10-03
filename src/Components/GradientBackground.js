import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import theme from '../theme'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

type Props = {
  style: objecet,
  children: React.Node,
}
export default class GradientBackground extends Component<Props> {
  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[theme.color.header1, theme.color.header2]}
        style={[
          {
            width: SCREEN_WIDTH,
            flex: 1,
            backgroundColor: theme.color.background2,
          },
          this.props.style,
        ]}
      >
        {this.props.children}
      </LinearGradient>
    )
  }
}
