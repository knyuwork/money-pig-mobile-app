
import React from 'react';
import { createStackNavigator } from 'react-navigation'
import DrawerNavigator from './DrawerNavigator'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: DrawerNavigator,
      navigationOptions: (props) => ({
        header: null
      })
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
  }
)

export default AppNavigator