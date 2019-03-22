
import React from 'react';
import { createStackNavigator } from 'react-navigation'
import MainAppNavigator from './MainAppNavigator'
import AuthForm from '../Containers/AuthForm'

import BackButton from '../Components/BackButton'

const AppNavigator = createStackNavigator(
  {
    main: {
      screen: MainAppNavigator,
      navigationOptions: {
        header: null
      }
    },
    auth: {
      screen: AuthForm,
      navigationOptions: (props) => ({
        headerLeft: (
          <BackButton {...props} />
        ),
      })
    },
  },
  {
    initialRouteName: 'main',
    headerMode: 'screen'
  }
)

export default AppNavigator