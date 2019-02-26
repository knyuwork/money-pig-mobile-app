
import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import theme from '../theme'
import DrawerButton from '../Components/DrawerButton'
import Home from '../Containers/Home'

const AppNavigator = createStackNavigator(
  {
    main: {
      screen: Home,
      navigationOptions: ({ ...props }) => ({
        headerStyle: {
          backgroundColor: theme.color.blue4,
        },
        title: 'SHOPPY',
        headerTintColor: '#FFF',
        headerLeft: (navigationOptions) => <DrawerButton {...props} navigationOptions={navigationOptions} />,
      }),
    },
  },
  {
    initialRouteName: 'main',
    headerMode: 'screen',
  }
)

export default AppNavigator