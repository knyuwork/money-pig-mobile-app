/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native'

type Props = {
  options: Object,
  navigationOptions: Object
};
class RadioButton extends Component<Props> {

  render() {
    const { style, selected, children } = this.props
    return (
      <View style={style} >
        <View style={[styles.outterShell]}>
          { selected ? <View style={styles.dot}/> : null }
        </View>
        { children }
      </View>
    );
  }
}

export default RadioButton

const styles = StyleSheet.create({
  outterShell: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  }
})
