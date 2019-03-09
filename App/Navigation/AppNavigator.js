
import React from 'react';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import theme from '../theme'
import MainAppNavigator from './MainAppNavigator'
import Drawer from '../Containers/Drawer'

const AppNavigator = createBottomTabNavigator(
  {
    octopus: {
      screen: MainAppNavigator,
    },
  },
  {
    initialRouteName: 'octopus',
    headerMode: 'screen',
    tabBarOptions: {
      activeTintColor: '#fff',
      style: {
        backgroundColor: theme.color.blue4
      }
    }
    // contentComponent: props => <Drawer {...props} />
  }
)

export default AppNavigator