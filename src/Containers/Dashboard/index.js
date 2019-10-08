import { Alert, Dimensions, Text, View } from 'react-native'
import React, { Component } from 'react'
import {
  getLocalHistory,
  getLocalTotalAmount,
} from '../../redux/dashboard/selectors'

import ActionButton from 'react-native-action-button'
import Carousel from 'react-native-snap-carousel'
import { CrashlyticsHelper } from '../../Helpers/firebase'
import GradientBackground from '../../Components/GradientBackground'
import HistoryTable from '@src/Components/HistoryTable'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import { deleteRecord } from '../../redux/dashboard/actions'
import firebase from 'react-native-firebase'
import moment from 'moment'
import { roundTo2DP } from '../../Helpers/rounding'
import styles from './styles'
import theme from '../../theme'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const AdmobBanner = firebase.admob.Banner
const AdRequest = firebase.admob.AdRequest
const request = new AdRequest()
request.addKeyword('foobar')

type Props = {
  deleteRecord: (record: Object) => void,
  totalAmount: number,
  history: Array<Object>,
  navigation: Object,
}
class Dashboard extends Component<Props> {
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

  handleAddNewRecord = () => {
    this.props.navigation.push('octopus')
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
        <GradientBackground
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
          <HistoryTable
            history={history}
            onRecordDelete={this.props.deleteRecord}
          />
        </View>
        <AdmobBanner
          unitId={octopusBannerAdId}
          request={request.build()}
          onAdFailedToLoad={err => {
            CrashlyticsHelper.recordError(400, JSON.stringify(err))
          }}
        />
        <ActionButton
          buttonColor={theme.color.button1}
          onPress={this.handleAddNewRecord}
        />
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
)(Dashboard)
