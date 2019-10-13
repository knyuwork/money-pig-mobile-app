import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { Component } from 'react'
import {
  addNewSignal,
  getMetatraderAccessToken,
  getSignalById,
} from '@src/redux/metatrader/actions'
import {
  openLoginWebViewSelector,
  subscribedSignalListSelector,
} from '@src/redux/metatrader/selectors'

import FeatherIcon from 'react-native-vector-icons/Feather'
import GradientBackground from '@src/Components/GradientBackground'
import InputBox from '@src/Components/InputBox'
import { SafeAreaView } from 'react-navigation'
import SignalIdInputView from './SignalIdInputView'
import { connect } from 'react-redux'
import styles from './styles'
import theme from '@src/theme'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

type Props = {
  getMetatraderAccessToken: () => void,
  getSignalById: () => void,
  addNewSignal: () => void,
  subscribedSignalList: Array<{ signalId: string, type: 'new' | 'signal' }>,
  openLoginWebView: boolean,
  navigation: Object,
}

class Metatrader extends Component<Props> {
  state = {
    result: 'nothing',
  }

  handleLogin = () => {
    // NOT IN USE
    this.props.getMetatraderAccessToken()
  }

  componentDidUpdate(prevProps) {
    const { openLoginWebView } = this.props
    if (!prevProps.openLoginWebView && openLoginWebView) {
      this.props.navigation.push('mql5WebView')
    }
  }

  getSignalById = (signalId = '508078') => {
    // console.log(this.props)
    this.props.getSignalById(signalId)
  }

  renderItem = ({ item }) => {
    if (item.type === 'new') {
      const { totalAmount, today, yesterday, lastWeek, lastMonth } = item
      return (
        <View
          style={{
            width: SCREEN_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 8,
          }}
        >
          <TouchableOpacity
            style={[
              styles.carouselItemContainer,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => this.props.addNewSignal()}
          >
            <FeatherIcon
              name={'plus-circle'}
              color={theme.color.font2}
              size={32}
            />
            <Text style={{ color: theme.color.font2 }}>新增 signal</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View
          style={{
            width: SCREEN_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 8,
          }}
        >
          <SignalIdInputView onSubmit={this.getSignalById} />
        </View>
      )
    }
  }

  render() {
    const { subscribedSignalList } = this.props
    const carouselData =
      subscribedSignalList.length === 0 ||
      subscribedSignalList[subscribedSignalList.length - 1].id
        ? [...subscribedSignalList, { type: 'new', id: -1 }]
        : subscribedSignalList
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
        forceInset={{ top: 'never' }}
      >
        <GradientBackground
          style={
            {
              // marginBottom: (-1 * SCREEN_HEIGHT) / 8,
              // justifyContent: 'center',
              // alignItems: 'center',
            }
          }
        >
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <FlatList
              style={{ flex: 1 }}
              data={carouselData}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
            />
          </KeyboardAvoidingView>
        </GradientBackground>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({
    openLoginWebView: openLoginWebViewSelector(state),
    subscribedSignalList: subscribedSignalListSelector(state),
  }),
  { getMetatraderAccessToken, getSignalById, addNewSignal }
)(Metatrader)
