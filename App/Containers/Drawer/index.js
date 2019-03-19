/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { ScrollView, Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'

import theme from '../../theme'
import appIcon from '../../Images/app-icon.png'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

type Props = {}
class Drawer extends Component<Props> {
  
  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{bottom: 'never'}}>
        <LinearGradient 
          start={{x: 0, y: 0}} end={{x: 0, y: 1}} 
          colors={[theme.color.header1, theme.color.header2]}
          style={{
            flex: 1,
            backgroundColor: theme.color.background2, 
          }}
        >
          <View style={{paddingVertical: 16}}>
            <Image style={{width: 80, height: 80}} source={appIcon} />
            <View style={{paddingVertical: 16}}>
            </View>
          </View>
          <ScrollView style={{flex: 1}}>
            <DrawerItems {...this.props} />
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}



export default (Drawer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.header1
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