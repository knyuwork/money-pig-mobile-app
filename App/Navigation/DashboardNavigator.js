
import React from 'react';
import { createStackNavigator } from 'react-navigation'
import theme from '../theme'
import Dashboard from '../Containers/Dashboard'

const DashboardNavigator = createStackNavigator(
  {
    chart: {
      screen: Dashboard,
      navigationOptions: ({ ...props }) => ({
        headerStyle: {
          backgroundColor: theme.color.header1,
          borderBottomWidth: 0
        },
        title: '八達通模擬',
        headerTintColor: theme.color.font1,
        // headerLeft: (navigationOptions) => <DrawerButton {...props} navigationOptions={navigationOptions} />,
      }),
    },
  },
  {
    initialRouteName: 'chart',
    headerMode: 'screen',
  }
)

export default DashboardNavigator