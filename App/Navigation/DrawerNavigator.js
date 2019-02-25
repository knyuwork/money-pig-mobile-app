
import React from 'react';
import { createDrawerNavigator } from 'react-navigation'
import Home from '../Containers/Home'
import Drawer from '../Containers/Drawer'
import EntypoIcon from 'react-native-vector-icons/Entypo'


const DrawerNavigator = createDrawerNavigator(
  {
    home: {
      screen: Home,
      // navigationOptions: ({ navigation }) => ({
      //   title: 'test',
      // }),
    },
  },
  {
    initialRouteName: 'home',
    headerMode: 'screen',
    contentComponent: props => <Drawer {...props} />
  }
)

export default DrawerNavigator