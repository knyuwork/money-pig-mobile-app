import React, {Component} from 'react'
import { TouchableOpacity, ScrollView, FlatList, Text, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux'
import Carousel from 'react-native-snap-carousel';
import ActionButton from 'react-native-action-button'
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

import theme from '../../theme'
import styles from './styles'
import { 
  getHistory,
  getMoneySaved
} from '../../redux/dashboard/selectors'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')


const AdmobBanner = firebase.admob.Banner
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');

type Props = {}
class Dashboard extends Component<Props> {

  renderItem = ({ item }) => {
    const { moneySaved } = this.props
    if (item === 'overall') {
      return (
        <View style={styles.carouselItemContainer}>
          <Text>節省了:</Text>
          <Text>{moneySaved}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.carouselItemContainer}>
  
        </View>
      )
    }
  }

  renderHistoryRow = ({ item }) => {
    const { type, createdTs, startStation, endStation, moneySaved } = item
    const typeToIconMap = {
      octopus: 'credit-card'
    }

    return (
      <View style={styles.historyRow}>
        <Icon size={16} style={styles.historyFont}  name={typeToIconMap[type]}/>
        <Text style={styles.historyFont} >
          {moment(createdTs).format('MM/DD')}
        </Text>
        <Text style={[{flex: 2}, styles.historyFont]} >
          {startStation} 去 {endStation}
        </Text>
        <Text style={[{flex: 1}, styles.historyFont]} >+$ {moneySaved}</Text>
      </View>
    )
  }

  renderHistory = () => {
    const { history } = this.props
    const keyExtractor = (item, index) => index.toString()
    return (
      <View style={styles.historyContainer}>
        <FlatList
          style={{ paddingHorizontal: 16 }}
          data={history}
          keyExtractor={keyExtractor}
          renderItem={this.renderHistoryRow}
        />
      </View>
    )
  }

  render() {
    const data = ['overall', 'overall', 'overall']
    return (
      <SafeAreaView style={styles.container} forceInset={{top: 'never'}} >
        <LinearGradient 
          start={{x: 0, y: 0}} end={{x: 0, y: 1}} 
          colors={[theme.color.header1, theme.color.header2]}
          style={{
            width: SCREEN_WIDTH,
            flex: 1,
            backgroundColor: theme.color.background2, 
            paddingTop: 8,
            marginBottom: -1 * SCREEN_HEIGHT / 8
          }}
        >
        </LinearGradient>
        <View style={{height: '100%' }}>
          <Carousel
            data={data}
            removeClippedSubviews={false}
            contentContainerCustomStyle={{ 
              // shadowColor: "#000",
              // shadowOffset: {
              //   width: 0,
              //   height: 0,
              // },
              // shadowOpacity: 0.4
            }}
            renderItem={this.renderItem}
            sliderWidth={SCREEN_WIDTH}
            // itemWidth={SCREEN_WIDTH * 5 / 12}
            itemWidth={SCREEN_WIDTH / 1.2}
          />
          { this.renderHistory() }
        </View>
        <ActionButton buttonColor={theme.color.button1} onPress={this.onSave} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  history: getHistory(state),
  moneySaved: getMoneySaved(state)
})

export default connect(mapStateToProps)(Dashboard)
