/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { AuthForm } from 'react-native-firebase-component'
import LinearGradient from 'react-native-linear-gradient'

import { connect } from 'react-redux';
import firebase from 'react-native-firebase'
import { setUserInfo } from '../../Helpers/firebase/DatabaseHelper'
import appIcon from '../../Images/app-icon.png'


type Props = {};
class AuthFormContainer extends Component<Props> {

  componentDidMount() {
    const { navigation } = this.props
    const { currentUser } = firebase.auth()
    if (currentUser) {
      navigation.navigate('Home')
    }
  }

  onLoginSuccess = (response) => {
    const {
      uid, 
      displayName, 
      email,
      photoURL, 
      phoneNumber,
      refreshToken
    } = response
    const userInfo = {
      uid,
      displayName,
      email,
      photoURL,
      phoneNumber,
    }
    console.log(userInfo)
  }

  render() {
    const formAttributes = [
      { 
        key: 'email',
        label: 'Email',
        valueType: 'text',
      },
      { 
        key: 'password',
        label: 'Password',
        valueType: 'text',
        secureTextEntry: true
      },
    ]

    const { navigation, completeLogin } = this.props

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
            // formValues={{}}
            // formAttributes={formAttributes}
            enableGoogleLogin
            googleButtonText={'登入Google帳戶'}
            onGoogleLoginSucess={this.onLoginSuccess} />
        </View>
      </LinearGradient>
    )
  }
}


export default  AuthFormContainer = connect(null)(AuthFormContainer);
