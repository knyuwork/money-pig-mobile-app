/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';

type Props = {};
export default class DrawerButton extends Component<Props> {
  constructor (props) {
    super(props)
  }

  render() {
    const { navigationOptions } = this.props
    return (
      <TouchableOpacity 
        style={{marginLeft: 16}}
        onPress={() => this.props.navigation.openDrawer()}>
        <Icon color={navigationOptions.headerTintColor} size={30} name={'menu'} />
      </TouchableOpacity>
    );
  }
}
