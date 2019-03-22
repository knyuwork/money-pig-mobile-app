/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AuthForm } from 'react-native-firebase-component'

import { connect } from 'react-redux';
import firebase from 'react-native-firebase'
import { setUserInfo } from '../../Helpers/firebase/DatabaseHelper'


type Props = {};
class AuthFormContainer extends Component<Props> {

  componentDidMount() {
    const { navigation } = this.props
    const { currentUser } = firebase.auth()
    if (currentUser) {
      navigation.navigate('Home')
    }
  }

  render() {
    const formAttributes = [
      // { 
      //   key: 'email',
      //   label: 'Email',
      //   valueType: 'text',
      // },
      // { 
      //   key: 'password',
      //   label: 'Password',
      //   valueType: 'text',
      //   secureTextEntry: true
      // },
    ]

    const { navigation, completeLogin } = this.props

    return (
      <View style={{flex: 1, justifyContent: 'center', padding: 16}}>
        <AuthForm 
          formValues={{}}
          formAttributes={formAttributes}
          enableFacebookLogin={true}
          onFacebookLoginSucess={(response) => {
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
            setUserInfo(uid, userInfo)
            navigation.navigate('Home')
          }} />
      </View>
    );
  }
}


export default  AuthFormContainer = connect(null)(AuthFormContainer);
