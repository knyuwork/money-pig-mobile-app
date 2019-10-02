/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Alert, Image, Platform, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import { AuthForm } from 'react-native-firebase-component'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import logo from '../../../assets/logo.png'
import BulletPointDot from '../../Components/BulletPointDot'
import { CrashlyticsHelper } from '../../Helpers/firebase'
import { endLoading, startLoading } from '../../redux/userInterface/actions'
import theme from '../../theme'
import styles from './styles'

type Props = {}
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

  onLoginEnded = err => {
    if (err) {
      CrashlyticsHelper.recordError(400, JSON.stringify(err))
    }
    this.props.endLoading()
  }

  onLoginSuccess = user => {
    this.props.endLoading()
    this.props.navigation.goBack()
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[theme.color.header1, theme.color.header2]}
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image style={{ width: 100, height: 100 }} source={logo} />
        </View>
        <View
          style={{
            flex: 1,
            borderRadius: 8,
            backgroundColor: '#fffc',
            padding: 12,
          }}
        >
          <View style={styles.buttletPointRow}>
            <BulletPointDot style={{ color: theme.color.font2 }} />
            <Text style={{ color: theme.color.font2 }}>
              登入以保存「淘金」記錄
            </Text>
          </View>
          <View style={styles.buttletPointRow}>
            <BulletPointDot style={{ color: theme.color.font6 }} />
            <Text style={{ color: theme.color.font6 }}>
              如帳號有記錄，將會覆蓋當前本機中的所有資料。
            </Text>
          </View>
        </View>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <AuthForm
            enableGoogleLogin
            googleButtonText={'登入Google帳戶'}
            onLogin={this.onLogin}
            onLoginEnded={this.onLoginEnded}
            onGoogleLoginSuccess={this.onLoginSuccess}
          />
        </View>
      </LinearGradient>
    )
  }
}

export default AuthFormContainer = connect(
  null,
  {
    startLoading,
    endLoading,
  }
)(AuthFormContainer)
