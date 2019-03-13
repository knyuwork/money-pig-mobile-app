
import React from 'react';
import { createStackNavigator } from 'react-navigation'
import theme from '../theme'
import MainAppNavigator from './MainAppNavigator'
import AuthForm from '../Containers/AuthForm'
import Icon from 'react-native-vector-icons/FontAwesome'

const AppNavigator = createStackNavigator(
  {
    main: {
      screen: MainAppNavigator,
    },
    auth: {
      screen: AuthForm,
    },
  },
  {
    initialRouteName: 'auth',
    headerMode: 'none'
  }
)

export default AppNavigator