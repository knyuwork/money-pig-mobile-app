/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

type Props = {}
export default class BackButton extends Component<Props> {
  onPress = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { navigationOptions } = this.props
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 16 }}
        onPress={this.onPress}
      >
        <Icon
          color={navigationOptions.tintColor}
          size={30}
          name={'ios-arrow-back'}
        />
      </TouchableOpacity>
    )
  }
}
