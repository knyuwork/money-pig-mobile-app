import moment from 'moment'
import React, { Component } from 'react'
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient'
import Carousel from 'react-native-snap-carousel'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'

import { roundTo2DP } from '../../Helpers/rounding'
import { deleteRecord } from '../../redux/dashboard/actions'
import {
  getLocalHistory,
  getLocalTotalAmount,
} from '../../redux/dashboard/selectors'
import theme from '../../theme'
import styles from './styles'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const AdmobBanner = firebase.admob.Banner
const AdRequest = firebase.admob.AdRequest
const request = new AdRequest()
request.addKeyword('foobar')

type Props = {}
class MissionList extends Component<Props> {
  onRecordDelete = record => {
    Alert.alert(
      '刪除記錄',
      '確定要刪除？',
      [
        {
          text: '取消',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: '確定', onPress: () => this.props.deleteRecord(record) },
      ],
      { cancelable: true }
    )
  }

  renderItem = ({ item }) => {
    if (item.type === 'overall') {
      const { totalAmount, today, yesterday, lastWeek, lastMonth } = item
      return (
        <View style={[styles.carouselItemContainer]}>
          <View
            style={{
              flex: 2,
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Text style={{ color: theme.color.font1, fontWeight: 'bold' }}>
              已賺:
            </Text>
            <Text style={styles.moneySavedAmountFont}>{totalAmount}</Text>
          </View>
          <View style={styles.growthTable}>
            <View style={styles.growthTableCol}>
              <Text style={styles.moneyGrowthLabel}>昨日已賺</Text>
              <Text style={styles.moneyGrowthFont}>{yesterday.toFixed(2)}</Text>
            </View>
            <View style={[styles.growthTableCol, styles.growthTableMidRow]}>
              <Text style={styles.moneyGrowthLabel}>一星期已賺</Text>
              <Text style={styles.moneyGrowthFont}>{lastWeek.toFixed(2)}</Text>
            </View>
            <View style={styles.growthTableCol}>
              <Text style={styles.moneyGrowthLabel}>一個月已賺</Text>
              <Text style={styles.moneyGrowthFont}>{lastMonth.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      )
    } else {
      return <View style={styles.carouselItemContainer} />
    }
  }

  renderHistoryRow = ({ item }) => {
    const { type, createdTs, startStation, endStation, amount } = item
    const typeToIconMap = {
      octopus: 'credit-card',
    }

    return (
      <View style={styles.historyRow}>
        <Icon size={16} style={styles.historyFont} name={typeToIconMap[type]} />
        <Text style={styles.historyFont}>
          {moment(createdTs).format('MM/DD')}
        </Text>
        <Text style={[{ flex: 2 }, styles.historyFont]}>
          {startStation} 去 {endStation}
        </Text>
        <Text style={[{ flex: 1 }, styles.historyFont]}>
          +$ {amount.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => this.onRecordDelete(item)}>
          <EntypoIcon
            name={'circle-with-minus'}
            size={18}
            color={theme.color.font5}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderHistory = () => {
    const { history } = this.props
    const keyExtractor = (item, index) => index.toString()
    return (
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitleFont}>歷史記錄</Text>
        <FlatList
          style={{ paddingHorizontal: 16, marginTop: 16 }}
          data={history}
          keyExtractor={keyExtractor}
          renderItem={this.renderHistoryRow}
          ListEmptyComponent={() => (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: 16 }}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>
                無慳錢記錄，要努力啊!!
              </Text>
            </View>
          )}
        />
      </View>
    )
  }

  render() {
    const { totalAmount, history } = this.props
    const current = moment()
      .add(1, 'day')
      .format('YYYY-MM-DD')
    const yesterday = moment()
      .subtract(1, 'day')
      .format('YYYY-MM-DD')
    const lastWeek = moment()
      .subtract(1, 'week')
      .format('YYYY-MM-DD')
    const lastMonth = moment()
      .subtract(1, 'month')
      .format('YYYY-MM-DD')
    let overall = {
      today: 0,
      yesterday: 0,
      lastWeek: 0,
      lastMonth: 0,
    }

    history.some(({ createdTs, amount }) => {
      if (moment(createdTs).isBetween(yesterday, current)) {
        overall.yesterday = roundTo2DP(overall.yesterday + amount)
      }

      if (moment(createdTs).isBetween(lastWeek, current)) {
        overall.lastWeek = roundTo2DP(overall.lastWeek + amount)
      }
      if (moment(createdTs).isBetween(lastMonth, current)) {
        overall.lastMonth = roundTo2DP(overall.lastMonth + amount)
      } else {
        return true
      }
    })
    const data = [
      {
        type: 'overall',
        totalAmount,
        ...overall,
      },
    ]

    return (
      <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[theme.color.header1, theme.color.header2]}
          style={{
            width: SCREEN_WIDTH,
            flex: 1,
            backgroundColor: theme.color.background2,
            marginBottom: (-1 * SCREEN_HEIGHT) / 8,
          }}
        />
        <View style={{ height: '100%' }}>
          <Carousel
            data={data}
            removeClippedSubviews={false}
            renderItem={this.renderItem}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH / 1.2}
          />
          {this.renderHistory()}
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  history: getLocalHistory(state),
  totalAmount: getLocalTotalAmount(state),
})

export default connect(
  mapStateToProps,
  {
    deleteRecord,
  }
)(MissionList)
