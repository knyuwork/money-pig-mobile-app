/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { SafeAreaView, Text, ScrollView, Dimensions, TouchableWithoutFeedback, Animated, View, StyleSheet } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import theme from '../../theme'
const { width: SCREEN_WIDTH, height: screenHeight } = Dimensions.get('window')

const AnimatedFontAwesomeIcon = Animated.createAnimatedComponent(FontAwesomeIcon)
const AnimatedEntypoIcon = Animated.createAnimatedComponent(EntypoIcon)
const AnimatedIonicon = Animated.createAnimatedComponent(Ionicon)

type Props = {}
class CustomTabBar extends Component<Props> {

  componentDidUpdate(prevProps) {
    const { tabBarIndex } = this.props
    if (tabBarIndex !== prevProps.tabBarX) {
      
    }
  }

  renderIcon = (route) => {
    const tintColor = '#fff'
    const {
      activeTab,
      tabBarIndex
    } = this.props;
    const convertIconSize = (index) => {
      const baseSize = 30
      if (tabBarIndex >= index - 0.5 && tabBarIndex <= index) {
        return baseSize + 12 * (tabBarIndex - index + 0.5)
      } else if (tabBarIndex <= index + 0.5 && tabBarIndex >= index) {
        return baseSize + 12 * (index - tabBarIndex + 0.5)
      } else {
        return baseSize
      }
    }
    const convertColor = (index) => {
      const baseSize = 30
      if (tabBarIndex >= index - 0.5 && tabBarIndex <= index) {
        const factor = (tabBarIndex - index + 0.5)
        const value = 200 + factor * 110
        return 'rgb('+ value + ','+ value + ','+ value + ')'
      } else if (tabBarIndex <= index + 0.5 && tabBarIndex >= index) {
        const factor = (tabBarIndex - index + 0.5)
        const value = 200 + factor * 110
        return 'rgb('+ value + ','+ value + ','+ value + ')'
      } else {
        return 'rgb'
      }
    }
    switch (route) {
      case 'Profile':
        return (
          <AnimatedFontAwesomeIcon color={tintColor} name={'user'} size={convertIconSize(0)} />
        )
      case 'ProductList':
        return (
          <AnimatedEntypoIcon color={tintColor} name={'shop'} size={convertIconSize(1)} />
        )
      case 'ChatList':
        return (
          <AnimatedIonicon color={tintColor} name={'ios-chatbubbles'} size={convertIconSize(2)} />
        )
      default:
        break;
    }
  }

  onTabPress = (routeName, index) => {
    const {
      goToPage
    } = this.props;
    goToPage(index)
  }

  render() {
    const {
      activeTab,
      containerWidth,
      goToPage,
      scrollValue,
      scrollX,
      tabs,
      tabBarIndex
    } = this.props;
    const animatedTabBarIndexValue = new Animated.Value(tabBarIndex)
    console.log(tabBarIndex)
    return (
      <View style={styles.container} >
        <Animated.View 
          style={{
            flexDirection: 'row',
            position: 'absolute',
            transform: [{
              translateX: -1 * (tabBarIndex * (SCREEN_WIDTH / 2 - 32))
            }]
          }}
        >
          <View style={{width: SCREEN_WIDTH / 4 + 16, height: 16}} />
          {
            tabs.map((tab, idx) => (
              <View key={idx} 
                style={{
                  width: SCREEN_WIDTH / 2 - 32, alignItems: 'center'
                }}
              >
                <TouchableWithoutFeedback 
                  key={idx} onPress={() => this.onTabPress(tab, idx)}
                >
                  <View>
                    {this.renderIcon(tab)}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ))
          }
          <View style={{width: SCREEN_WIDTH / 4 + 16, height: 16}} />
        </Animated.View>
      </View>
    )
  }
}

export default CustomTabBar


const styles = StyleSheet.create({
  tab: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  container: {
    height: 45,
    backgroundColor: theme.color.pink1,
    // paddingHorizontal: 16
    // flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
