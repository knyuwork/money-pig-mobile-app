import { authorize } from 'react-native-app-auth'
import { call, put, select } from 'redux-saga/effects'

import { getMetatraderAuthConfig } from '../../app/selectors'
import {
  getMetatraderAccessTokenFailed,
  getMetatraderAccessTokenSucceeded,
} from '../actions'

export function* getMetatraderAccessToken() {
  try {
    const { clientId, clientSecret, redirectUrl } = yield select(
      getMetatraderAuthConfig
    )
    const config = {
      issuer: 'MQL5',
      grantType: 'authorization_code',
      clientAuthMethod: 'post',
      serviceConfiguration: {
        authorizationEndpoint: 'https://www.mql5.com/en/oauth/login',
        tokenEndpoint: 'https://www.mql5.com/api/oauth/access_token',
      },
      clientId,
      clientSecret,
      redirectUrl,
    }
    const result = yield call(authorize, config)
    yield put(getMetatraderAccessTokenSucceeded(result))
  } catch (error) {
    yield put(getMetatraderAccessTokenFailed(error))
  }
}
