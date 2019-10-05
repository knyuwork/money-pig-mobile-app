import DrawerButton from '../Components/DrawerButton'
import MQL5WebView from '../Containers/MQL5WebView'
import Metatrader from '../Containers/Metatrader'
import React from 'react'
import { createStackNavigator } from 'react-navigation'
import theme from '../theme'

const MetatraderNavigator = createStackNavigator(
  {
    metatrader: {
      screen: Metatrader,
      navigationOptions: ({ ...props }) => ({
        headerStyle: {
          backgroundColor: theme.color.header1,
          borderBottomWidth: 0,
          elevation: 0, // For Android,
        },
        title: 'MQL5 Community',
        headerTintColor: theme.color.headerFont,
        headerLeft: navigationOptions => (
          <DrawerButton {...props} navigationOptions={navigationOptions} />
        ),
      }),
    },
    mql5WebView: {
      screen: MQL5WebView,
    },
  },
  {
    initialRouteName: 'metatrader',
    headerMode: 'screen',
  }
)

export default MetatraderNavigator
