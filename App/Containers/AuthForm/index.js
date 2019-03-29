/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, TouchableOpacity, View, Alert, Image } from 'react-native';
import { AuthForm } from 'react-native-firebase-component'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux';
import firebase from 'react-native-firebase'

import appIcon from '../../Images/app-icon.png'
import { startLoading, endLoading } from '../../redux/userInterface/actions'


type Props = {};
class AuthFormContainer extends Component<Props> {

  componentDidMount() {
    const { navigation } = this.props
    const { currentUser } = firebase.auth()
    if (currentUser) {
      navigation.navigate('Home')
    }
  }

  onLogin = () => {
    this.props.startLoading()
  }

  onLoginEnded = (err) => {
    if (err) {
      console.log(err)
    }
    this.props.endLoading()
  }

  onLoginSuccess = (user) => {
    this.props.navigation.navigate('main')
  }

  render() {
    return (
      <LinearGradient 
        start={{x: 0, y: 0}} end={{x: 0, y: 1}} 
        colors={[theme.color.header1, theme.color.header2]}
        style={{
          flex: 1, justifyContent: 'center', padding: 16
        }}
      >
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{width: 100, height: 100}} source={appIcon} />
        </View>
        <View style={{flex: 1, borderRadius: 8, backgroundColor: '#fffb'}}>

        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <AuthForm 
            enableGoogleLogin
            googleButtonText={'登入Google帳戶'}
            onLogin={this.onLogin}
            onLoginEnded={this.onLoginEnded}
            onGoogleLoginSuccess={this.onLoginSuccess} />
        </View>
      </LinearGradient>
    )
  }
}


export default  AuthFormContainer = connect(null, {
  startLoading, endLoading
})(AuthFormContainer);
