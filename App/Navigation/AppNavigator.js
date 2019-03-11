
import React from 'react';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import theme from '../theme'
import MainAppNavigator from './MainAppNavigator'
import DashboardNavigator from './DashboardNavigator'
import Drawer from '../Containers/Drawer'
import Icon from 'react-native-vector-icons/FontAwesome'

const AppNavigator = createBottomTabNavigator(
  {
    dashboard: {
      screen: DashboardNavigator,
    },
    octopus: {
      screen: MainAppNavigator,
    },
  },
  {
    initialRouteName: 'dashboard',
    headerMode: 'screen',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        const iconNameMap = {
          octopus: 'credit-card',
          dashboard: 'line-chart'
        }
        return <Icon name={iconNameMap[routeName]} size={24} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: theme.color.font2,
      style: {
        backgroundColor: theme.color.footer1
      }
    }
    // contentComponent: props => <Drawer {...props} />
  }
)

export default AppNavigator