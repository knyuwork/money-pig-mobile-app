import GradientBackground from '@src/Components/GradientBackground'
import InputBox from '@src/Components/InputBox'
import {
  addNewSignal,
  getMetatraderAccessToken,
  getSignal,
} from '@src/redux/metatrader/actions'
import {
  openLoginWebViewSelector,
  subscribedSignalListSelector,
} from '@src/redux/metatrader/selectors'
import theme from '@src/theme'
import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'

import styles from './styles'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

type Props = {
  getMetatraderAccessToken: () => void,
  getSignal: () => void,
  addNewSignal: () => void,
  subscribedSignalList: Array<{ signalId: string, type: 'new' | 'signal' }>,
  openLoginWebView: boolean,
  navigation: Object,
}

const SignalIdInputView = () => {
  return (
    <View
      style={[
        styles.carouselItemContainer,
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <InputBox
        style={{ width: SCREEN_WIDTH / 2 }}
        placeholder={'請輸入 Signal Id'}
      />
      <TouchableOpacity
        style={{
          backgroundColor: theme.color.font2,
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: 'white',
          }}
        >
          提交
        </Text>
      </TouchableOpacity>
    </View>
  )
}

class Metatrader extends Component<Props> {
  state = {
    result: 'nothing',
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
          <SignalIdInputView />
        </View>
      )
    }
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

  getSignal = () => {
    // console.log(this.props)
    this.props.getSignal('508078')
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
          <FlatList
            style={{ flex: 1 }}
            data={carouselData}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
          {/* <Carousel
            data={carouselData}
            removeClippedSubviews={false}
            renderItem={this.renderItem}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH / 1.2}
          /> */}
          {/* <TouchableOpacity
            style={{
              margin: 16,
              padding: 8,
              borderRadius: 24,
              backgroundColor: 'yellow',
            }}
            onPress={this.getSignal}
          >
            <Text style={{ color: 'white' }}>Get Signal</Text>
          </TouchableOpacity>
          <Text>Result: {result}</Text> */}
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
  { getMetatraderAccessToken, getSignal, addNewSignal }
)(Metatrader)
