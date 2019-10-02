import React from 'react'
import { createStackNavigator } from 'react-navigation'

import DrawerButton from '../Components/DrawerButton'
import Dashboard from '../Containers/Dashboard'
import theme from '../theme'

const DashboardNavigator = createStackNavigator(
  {
    dashboard: {
      screen: Dashboard,
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
    initialRouteName: 'dashboard',
    headerMode: 'screen',
  }
)

export default DashboardNavigator
