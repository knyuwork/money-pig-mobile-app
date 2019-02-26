
import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import theme from '../theme'
import MainAppNavigator from './MainAppNavigator'
import Drawer from '../Containers/Drawer'

const AppNavigator = createDrawerNavigator(
  {
    octopus: {
      screen: MainAppNavigator,
    },
  },
  {
    initialRouteName: 'octopus',
    headerMode: 'screen',
    contentComponent: props => <Drawer {...props} />
  }
)

export default AppNavigator