import React, {Component} from 'react'
import { TouchableOpacity, TextInput, Text, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux'
import Modal from 'react-native-modal';
import Autocomplete from 'react-native-autocomplete-input'
import Carousel from 'react-native-snap-carousel';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient'

import RadioButtonGroup from '../../Components/RadioButtonGroup'
import theme from '../../theme'
import styles from './styles'
import { 
  getHKMTRStationsMap,
  getStationsMapFetchingStatus,
  getPrice,
  getMoneySaved,
  getOctopusSelectedIndex
} from '../../redux/octopus/selectors'
import { fetchPrice, setMoneySaved, setOctopusSelectedIndex } from '../../redux/octopus/actions'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')


const AdmobBanner = firebase.admob.Banner
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');

type Props = {}
class Dashboard extends Component<Props> {

  renderItem = () => {
    return (
      <View style={styles.chartContainer}>

      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{top: 'never'}} >
        <LinearGradient 
          start={{x: 0, y: 0}} end={{x: 0, y: 1}} 
          colors={['#59B4A4', '#59D9A4']}
          style={{
            width: SCREEN_WIDTH,
            flex: 1,
            backgroundColor: theme.color.background2, 
            paddingTop: 8,
            paddingBottom: 32,
            marginBottom: -32
          }}
        >
        </LinearGradient>
        <View style={{ height: '75%', width: SCREEN_WIDTH, padding: 8 }}>
          
          {/* <Carousel
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          /> */}
          <View style={styles.chartContainer}>

          </View> 
          
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  
})

export default connect(mapStateToProps)(Dashboard)
