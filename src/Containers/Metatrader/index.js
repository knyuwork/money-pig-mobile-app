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
  getSignals,
} from 'src/redux/metatrader/actions'
import {
  openLoginWebViewSelector,
  subscribedSignalListSelector,
} from 'src/redux/metatrader/selectors'

import FeatherIcon from 'react-native-vector-icons/Feather'
import GradientBackground from 'src/Components/GradientBackground'
import InputBox from 'src/Components/InputBox'
import { SafeAreaView } from 'react-navigation'
import SignalIdInputView from './SignalIdInputView'
import SignalOverview from './SignalOverview'
import { connect } from 'react-redux'
import styles from './styles'
import theme from 'src/theme'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

type Props = {
  getMetatraderAccessToken: () => void,
  getSignalById: () => void,
  addNewSignal: () => void,
  getSignals: () => void,
  subscribedSignalList: Array<{ signalId: string, type: 'new' | 'signal' }>,
  openLoginWebView: boolean,
  navigation: Object,
}

class Metatrader extends Component<Props> {
  state = {
    result: 'nothing',
  }
  componentDidMount() {
    this.props.getSignals()
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

  getSignalById = signalId => {
    this.props.getSignalById(signalId)
  }

  renderItem = ({ item }, index) => {
    return (
      <View style={styles.signalItemWrapper}>
        <SignalOverview signal={item} onRefresh={this.getSignalById} />
      </View>
    )
  }

  render() {
    const { subscribedSignalList } = this.props
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
          <FlatList
            style={{ flex: 1 }}
            data={subscribedSignalList}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
          <KeyboardAvoidingView
            behavior="height"
            style={{ backgroundColor: theme.color.background1 }}
          >
            <SignalIdInputView onSubmit={this.getSignalById} />
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
  { getMetatraderAccessToken, getSignalById, addNewSignal, getSignals }
)(Metatrader)
