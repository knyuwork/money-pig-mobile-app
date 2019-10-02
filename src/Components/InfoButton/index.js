/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'

type Props = {}
class InfoButton extends Component<Props> {
  render() {
    const { navigationOptions } = this.props
    return (
      <TouchableOpacity
        style={{ marginLeft: 16 }}
        onPress={() => this.props.navigation.openDrawer()}
      >
        <Icon
          color={navigationOptions.tintColor}
          size={30}
          name={'questioncircleo'}
        />
      </TouchableOpacity>
    )
  }
}

export default connect(null)(InfoButton)
