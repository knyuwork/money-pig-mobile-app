
import React from 'react';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import theme from '../theme'
import OctopusNavigator from './OctopusNavigator'
import DashboardNavigator from './DashboardNavigator'
import Drawer from '../Containers/Drawer'
import Icon from 'react-native-vector-icons/FontAwesome'

const MainAppNavigator = createBottomTabNavigator(
  {
    dashboard: {
      screen: DashboardNavigator,
    },
    octopus: {
      screen: OctopusNavigator,
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
        return <Icon name={iconNameMap[routeName]} size={20} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: theme.color.footerFont,
      // showLabel: false,
      style: {
        backgroundColor: theme.color.footer1,
        elevation: 6
      }
    }
    // contentComponent: props => <Drawer {...props} />
  }
)

export default MainAppNavigator