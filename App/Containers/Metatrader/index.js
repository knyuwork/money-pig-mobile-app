import { Linking, Text, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

import { SafeAreaView } from 'react-navigation'
import { authorize } from 'react-native-app-auth'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'

// import oAuthManager from '../../Helpers/oauth'

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// const AdmobBanner = firebase.admob.Banner;
// const AdRequest = firebase.admob.AdRequest;
// const request = new AdRequest();
// request.addKeyword("foobar");

type Props = {}
class MissionList extends Component<Props> {
  state = {
    result: 'nothing',
  }

  handleLogin = () => {
    const config = {
      issuer: 'MQL5',
      grantType: 'authorization_code',
      clientAuthMethod: 'post',
      serviceConfiguration: {
        authorizationEndpoint: 'https://www.mql5.com/en/oauth/login',
        tokenEndpoint: 'https://www.mql5.com/api/oauth/access_token',
      },
      clientId: 'c0ixbp',
      clientSecret:
        'PCHRBDLLXIUIIGSTIGGZTYXIGFPDFMIIVPBPYEXLSGKMOOJJHPLBUKBQFYKVNIFK',
      redirectUrl:
        'http://mattdev.com:8084/oauth2proxy' + '/idporten/oauth2callback',
      // redirectUrl: 'https://devtool.io/',
      // scopes: ['<YOUR_SCOPES_ARRAY>'],
    }

    authorize(config)
      .then(result => {
        console.log(result)
        this.setState({
          result: JSON.stringify(result),
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          result: JSON.stringify(err),
        })
      })
  }

  render() {
    const { result } = this.state
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        forceInset={{ top: 'never' }}
      >
        <TouchableOpacity
          style={{ padding: 8, borderRadius: 24, backgroundColor: 'yellow' }}
          onPress={this.handleLogin}
        >
          <Text style={{ color: 'white' }}>Login MQL5</Text>
        </TouchableOpacity>
        <Text>Result: {result}</Text>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
  {}
)(MissionList)
