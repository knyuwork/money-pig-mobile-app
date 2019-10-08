import Dashboard from '../Containers/Dashboard'
import DrawerButton from '../Components/DrawerButton'
import Octopus from '../Containers/Octopus'
import React from 'react'
import { createStackNavigator } from 'react-navigation'
import theme from '../theme'

const iconNameMap = {
  octopus: 'credit-card',
  dashboard: 'line-chart',
  setting: 'gear',
  login: 'sign-in',
  logout: 'sign-out',
}

const OctopusNavigator = createStackNavigator(
  {
    record: {
      screen: Dashboard,
      navigationOptions: ({ ...props }) => ({
        headerStyle: {
          backgroundColor: theme.color.header1,
          borderBottomWidth: 0,
          elevation: 0, // For Android,
        },
        title: '乘車優惠',
        headerTintColor: theme.color.headerFont,
        headerLeft: navigationOptions => (
          <DrawerButton {...props} navigationOptions={navigationOptions} />
        ),
      }),
    },
    octopus: {
      screen: Octopus,
      navigationOptions: ({ ...props }) => ({
        headerStyle: {
          backgroundColor: theme.color.header1,
          borderBottomWidth: 0,
          elevation: 0, // For Android,
        },
        title: '乘車優惠',
        headerTintColor: theme.color.headerFont,
        // headerLeft: navigationOptions => (
        //   <DrawerButton {...props} navigationOptions={navigationOptions} />
        // ),
      }),
    },
  },
  {
    initialRouteName: 'record',
    headerMode: 'screen',
  }
)

export default OctopusNavigator
