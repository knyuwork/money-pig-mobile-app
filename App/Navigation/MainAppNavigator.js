
import React from 'react';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import theme from '../theme'
import OctopusNavigator from './OctopusNavigator'
import DashboardNavigator from './DashboardNavigator'
import SettingNavigator from './SettingNavigator'
import Drawer from '../Containers/Drawer'
import Icon from 'react-native-vector-icons/FontAwesome'

const iconNameMap = {
  octopus: 'credit-card',
  dashboard: 'line-chart',
  setting: 'gear',
  login: 'gear',
  logout: 'gear'
}

const MainAppNavigator = createDrawerNavigator(
  {
    dashboard: {
      screen: DashboardNavigator,
      navigationOptions: () => ({
        drawerIcon: ({ tintColor }) => <Icon name={iconNameMap['dashboard']} size={22} color={tintColor} />,
        drawerLabel: '儀表板'
      })
    },
    octopus: {
      screen: OctopusNavigator,
      navigationOptions: () => ({
        drawerIcon: ({ tintColor }) => <Icon name={iconNameMap['octopus']} size={22} color={tintColor} />,
        drawerLabel: '港鐵優惠'
      })
    },
    setting: {
      screen: SettingNavigator,
      navigationOptions: () => ({
        drawerIcon: ({ tintColor }) => <Icon name={iconNameMap['setting']} size={22} color={tintColor} />,
        drawerLabel: '設定'
      })
    },
    login: {
      screen: React.Fragment,
      navigationOptions: () => ({
        drawerIcon: ({ tintColor }) => <Icon name={iconNameMap['login']} size={22} color={tintColor} />,
        drawerLabel: '登入'
      })
    },
    logout: {
      screen: React.Fragment,
      navigationOptions: () => ({
        drawerIcon: ({ tintColor }) => <Icon name={iconNameMap['logout']} size={22} color={tintColor} />,
        drawerLabel: '登出'
      })
    }
  },
  {
    initialRouteName: 'dashboard',
    headerMode: 'screen',
    contentOptions: {
      activeTintColor: '#fff',
    },
    contentComponent: props => <Drawer {...props} />
  }
)

// const MainAppNavigator = createBottomTabNavigator(
//   {
//     dashboard: {
//       screen: DashboardNavigator,
//     },
//     octopus: {
//       screen: OctopusNavigator,
//     },
//     setting: {
//       screen: SettingNavigator
//     }
//   },
//   {
//     initialRouteName: 'dashboard',
//     headerMode: 'screen',
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, horizontal, tintColor }) => {
//         const { routeName } = navigation.state
//         const iconNameMap = {
//           octopus: 'credit-card',
//           dashboard: 'line-chart',
//           setting: 'gear'
//         }
//         return <Icon name={iconNameMap[routeName]} size={22} color={tintColor} />;
//       },
//     }),
//     tabBarOptions: {
//       activeTintColor: theme.color.footerFont,
//       // showLabel: false,
//       style: {
//         backgroundColor: theme.color.footer1,
//         elevation: 6
//       }
//     }
//     // contentComponent: props => <Drawer {...props} />
//   }
// )

export default MainAppNavigator