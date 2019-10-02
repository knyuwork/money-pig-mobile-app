/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/AntDesign'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'

import logo from '../../../assets/logo.png'
import { AuthHelper } from '../../Helpers/firebase'
import { signOut } from '../../redux/auth/actions'
import { checkIsSignedIn } from '../../redux/auth/selectors'
import theme from '../../theme'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const { getCurrentUser } = AuthHelper

type Props = {}
class Drawer extends Component<Props> {
  state = {
    showAuth: false,
  }

  onLoginBarPressed = () => {
    this.setState({
      showAuth: !this.state.showAuth,
    })
  }

  onDrawerItemsPress = routeObject => {
    const { route } = routeObject
    if (route.key === 'login') {
      this.props.navigation.push('auth')
    } else if (route.key === 'logout') {
      this.props.signOut()
    } else {
      this.props.onItemPress(routeObject)
    }
  }

  renderAuthBar = () => {
    const { showAuth } = this.state
    const { isSignedIn } = this.props

    const firstLine = isSignedIn ? '歡迎' : '訪客用戶'
    const secondLine = getCurrentUser()
      ? getCurrentUser().email
      : '請登入以保存記錄'
    return (
      <TouchableOpacity
        style={styles.loginBar}
        onPress={this.onLoginBarPressed}
      >
        <View>
          <Text style={{ color: '#fff', fontSize: 16 }}>{firstLine}</Text>
          <Text style={{ color: '#fff', fontSize: 14, marginTop: 8 }}>
            {secondLine}
          </Text>
        </View>
        {showAuth ? (
          <Icon name="caretup" size={12} color={'#fff'} />
        ) : (
          <Icon name="caretdown" size={12} color={'#fff'} />
        )}
      </TouchableOpacity>
    )
  }

  render() {
    const { showAuth } = this.state
    const { items, isSignedIn } = this.props

    const preAuthDrawerWhiteList = ['login']
    const postAuthDrawerWhiteList = ['logout']
    const authDrawerWhiteList = isSignedIn ? ['logout'] : ['login']
    const authItems = items.filter(item =>
      authDrawerWhiteList.includes(item.key)
    )
    const mainItems = items.filter(
      item =>
        ![...preAuthDrawerWhiteList, ...postAuthDrawerWhiteList].includes(
          item.key
        )
    )

    const drawItemsProps = {
      ...this.props,
      items: showAuth ? authItems : mainItems,
    }

    return (
      <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[theme.color.header1, theme.color.header2]}
          style={{
            flex: 1,
            backgroundColor: theme.color.background2,
          }}
        >
          <View>
            <Image
              style={{
                marginLeft: 16,
                marginVertical: 32,
                width: 80,
                height: 80,
              }}
              source={logo}
            />
            {this.renderAuthBar()}
          </View>
          <ScrollView style={{ flex: 1 }}>
            <DrawerItems
              {...drawItemsProps}
              onItemPress={this.onDrawerItemsPress}
            />
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({
    isSignedIn: checkIsSignedIn(state),
  }),
  {
    signOut,
    checkIsSignedIn,
  }
)(Drawer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.header1,
  },
  loginBar: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#FF9789',
    padding: 8,
  },
  headerFont: {
    color: '#FFF',
    fontSize: 20,
    paddingHorizontal: 16,
  },
  itemContainer: {
    marginHorizontal: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
})
