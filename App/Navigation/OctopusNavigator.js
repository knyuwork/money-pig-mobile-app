
import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import theme from '../theme'
import DrawerButton from '../Components/DrawerButton'
import Octopus from '../Containers/Octopus'

const OctopusNavigator = createStackNavigator(
  {
    octopusCalculator: {
      screen: Octopus,
      navigationOptions: ({ ...props }) => ({
        headerStyle: {
          backgroundColor: theme.color.header1,
          borderBottomWidth: 0
        },
        title: '八達通模擬',
        headerTintColor: theme.color.headerFont,
        // headerLeft: (navigationOptions) => <DrawerButton {...props} navigationOptions={navigationOptions} />,
      }),
    },
  },
  {
    initialRouteName: 'octopusCalculator',
    headerMode: 'screen',
  }
)

export default OctopusNavigator