import { ActivityIndicator, Dimensions, View } from 'react-native'
import React, { Component } from 'react'
import { initializeAuth, signInSuccessful } from '../redux/auth/actions'

import AppNavigator from '../Navigation/AppNavigator'
import Firebase from 'react-native-firebase'
import NavigationService from '../Navigation'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { initializeApp } from '../redux/app/actions'
import theme from '../theme'

const AppNavigatorContainer = createAppContainer(AppNavigator)
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
type Props = {}
class RootContainer extends Component<Props> {
  componentDidMount() {
    // if (__DEV__) {
    //   Firebase.config().enableDeveloperMode()
    // }
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName, email, photoURL, phoneNumber } = user
        const userInfo = {
          uid,
          displayName,
          email,
          photoURL,
          phoneNumber,
        }
        this.props.signInSuccessful(userInfo)
      } else {
        this.props.initializeAuth()
      }
    })
    this.props.initializeApp()
  }

  renderLoading() {
    return (
      <View
        style={{
          width: screenWidth,
          height: screenHeight,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
      >
        <View
          style={{
            borderRadius: 16,
            backgroundColor: 'rgba(200,200,200,1)',
            padding: 16,
          }}
        >
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    )
  }

  render() {
    const { isLoading } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: theme.color.blue5 }}>
        <AppNavigatorContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
        {isLoading && this.renderLoading()}
      </View>
    )
  }
}

export default compose(
  connect(
    state => {
      return {
        isLoading: state.userInterface.get('isLoading'),
      }
    },
    {
      initializeApp,
      initializeAuth,
      signInSuccessful,
    }
  )
)(RootContainer)
