import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import styles from './styles'
import theme from '@src/theme'

type Props = {
  history: Array<Object>,
  onRecordDelete: (record: Object) => void,
}
class HistoryTable extends Component<Props> {
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
        { text: '確定', onPress: () => this.props.onRecordDelete(record) },
      ],
      { cancelable: true }
    )
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

  render() {
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
}

export default HistoryTable
