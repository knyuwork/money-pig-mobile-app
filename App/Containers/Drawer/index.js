/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { ScrollView, Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import theme from '../../theme'

import appIcon from '../../Images/app-icon.png'

type Props = {}
class Drawer extends Component<Props> {
  
  render() {
    return (
      <SafeAreaView>
        <View>
          <Image style={{width: 100, height: 100}} source={appIcon} />
        </View>
        <ScrollView >
          <DrawerItems {...this.props} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}



export default (Drawer)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#FF9789',
    padding: 8
  },
  headerFont: {
    color: '#FFF',
    fontSize: 20,
    paddingHorizontal: 16
  },
  itemContainer: {
    marginHorizontal: 8
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});