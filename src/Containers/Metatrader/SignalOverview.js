import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { Component } from 'react'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import styles from './styles'
import theme from 'src/theme'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

type Props = {
  signal: Object,
  onRefresh: (signalId: string) => void,
}

class SignalIdInputView extends Component<Props, States> {
  handleRefresh = () => {
    const {
      signal: { id },
    } = this.props
    this.props.onRefresh(id)
  }

  render() {
    const {
      signal: { id, updatedAt, buysSum, sellsSum, avgBuyPrice, avgSellPrice },
    } = this.props
    return (
      <View
        style={[
          styles.carouselItemContainer,
          // {
          //   flexDirection: 'row',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          // },
        ]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.signalIdText}>Signal: {id}</Text>
          <>
            <Text style={styles.signalIdText}>
              {moment(updatedAt * 1000).format('DD/MM/YYYY HH:mm')}
            </Text>
            <TouchableOpacity onPress={this.handleRefresh}>
              <FontAwesomeIcon name={'refresh'} size={16} color={'grey'} />
            </TouchableOpacity>
          </>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.partialOverview}>
            <Text style={styles.buysTitle}>Buys</Text>
            <View>
              <Text style={{ fontSize: 16 }}>{buysSum}</Text>
              <Text style={{ color: theme.color.font1 }}>volume</Text>
              <Text style={{ fontSize: 16 }}>{avgBuyPrice}</Text>
              <Text style={{ color: theme.color.font1 }}>Avg. Price</Text>
            </View>
          </View>
          <View style={styles.partialOverview}>
            <Text style={styles.sellsTitle}>Sells</Text>
            <View>
              <Text style={{ fontSize: 16 }}>{sellsSum}</Text>
              <Text style={{ color: theme.color.font1 }}>volume</Text>
              <Text style={{ fontSize: 16 }}>{avgSellPrice}</Text>
              <Text style={{ color: theme.color.font1 }}>Avg. Price</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default SignalIdInputView
