import React from 'react'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'

import DrawerButton from '../Components/DrawerButton'
import Setting from '../Containers/Setting'
import theme from '../theme'

const OctopusNavigator = createStackNavigator(
  {
    settingContainer: {
      screen: Setting,
      navigationOptions: ({ ...props }) => ({
        headerStyle: {
          backgroundColor: theme.color.header1,
          borderBottomWidth: 0,
          elevation: 0, // For Android,
        },
        // title: '八達通模擬',
        headerTintColor: theme.color.headerFont,
        headerLeft: navigationOptions => (
          <DrawerButton {...props} navigationOptions={navigationOptions} />
        ),
      }),
    },
  },
  {
    initialRouteName: 'settingContainer',
    headerMode: 'screen',
  }
)

export default OctopusNavigator
