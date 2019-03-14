
import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import theme from '../theme'
import Setting from '../Containers/Setting'

const OctopusNavigator = createStackNavigator(
  {
    settingContainer: {
      screen: Setting,
      navigationOptions: ({ ...props }) => ({
        headerStyle: {
          backgroundColor: theme.color.header1,
          borderBottomWidth: 0
        },
        // title: '八達通模擬',
        headerTintColor: theme.color.headerFont,
        // headerLeft: (navigationOptions) => <DrawerButton {...props} navigationOptions={navigationOptions} />,
      }),
    },
  },
  {
    initialRouteName: 'settingContainer',
    headerMode: 'screen',
  }
)

export default OctopusNavigator