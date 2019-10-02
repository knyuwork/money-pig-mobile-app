import React from 'react'
import { createStackNavigator } from 'react-navigation'

import BackButton from '../Components/BackButton'
import AuthForm from '../Containers/AuthForm'
import theme from '../theme'
import MainAppNavigator from './MainAppNavigator'

const AppNavigator = createStackNavigator(
  {
    main: {
      screen: MainAppNavigator,
      navigationOptions: {
        header: null,
      },
    },
    auth: {
      screen: AuthForm,
      navigationOptions: ({ ...props }) => ({
        headerLeft: navigationOptions => (
          <BackButton {...props} navigationOptions={navigationOptions} />
        ),
        headerStyle: {
          backgroundColor: theme.color.header1,
          borderBottomWidth: 0,
          elevation: 0, // For Android,
        },
        // title: '八達通模擬',
        headerTintColor: theme.color.headerFont,
      }),
    },
  },
  {
    initialRouteName: 'main',
    headerMode: 'screen',
  }
)

export default AppNavigator
