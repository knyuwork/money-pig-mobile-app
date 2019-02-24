
import React from 'react';
import { createDrawerNavigator } from 'react-navigation'
import Home from '../Containers/Home'
import EntypoIcon from 'react-native-vector-icons/Entypo'

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: (props) => ({
        header: null
      })
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    headerStyle: {
      backgroundColor: '#FF9789',
    },
    title: 'SHOPPY',
    headerTintColor: '#FFF',
    drawerIcon: ({ tintColor }) => (
      <EntypoIcon name={'menu'} color={tintColor} />
    ),
  
  }
)

export default DrawerNavigator