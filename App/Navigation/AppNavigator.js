
import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import theme from '../theme'
import DrawerNavigator from './DrawerNavigator'
import DrawerButton from '../Components/DrawerButton'

const AppNavigator = createStackNavigator(
  {
    main: {
      screen: DrawerNavigator,
    },
  },
  {
    initialRouteName: 'main',
    headerMode: 'float',
    defaultNavigationOptions: ({...props}) =>({
      headerStyle: {
        backgroundColor: theme.color.blue4,
      },
      title: 'SHOPPY',
      headerTintColor: '#FFF',
      headerLeft: ({ ...navigationOptions }) => <DrawerButton {...props} navigationOptions={navigationOptions} />,
    })
  }
)

export default AppNavigator