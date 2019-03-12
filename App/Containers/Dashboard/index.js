import React, {Component} from 'react'
import { TouchableOpacity, TextInput, Text, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux'
import Modal from 'react-native-modal';
import Autocomplete from 'react-native-autocomplete-input'
import ActionButton from 'react-native-action-button'
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
} from '../../Redux/octopus/selectors'
import { fetchPrice, setMoneySaved, setOctopusSelectedIndex } from '../../Redux/octopus/actions'

import CHILD_OCTOPUS_CARD from '../../Images/octopus-child.jpg'
import ELDER_OCTOPUS_CARD from '../../Images/octopus-elder.jpg'
import STUDENT_OCTOPUS_CARD from '../../Images/octopus-student.jpg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const contents = [
  {
    render: <Image style={styles.octopusImage} resizeMode={'contain'} source={ELDER_OCTOPUS_CARD} />
  },
  {
    render: <Image style={styles.octopusImage} resizeMode={'contain'} source={STUDENT_OCTOPUS_CARD} />
  },
  {
    render: <Image style={styles.octopusImage} resizeMode={'contain'} source={CHILD_OCTOPUS_CARD} />
  }
]

const AdmobBanner = firebase.admob.Banner
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');

type Props = {}
class Dashboard extends Component<Props> {
  state = {
    showModal: false,
    startStation: '',
    endStation: '',
    hideSuggestion: true
  }

  componentDidUpdate(prevProps, prevState) {
    const { startStation, endStation } = this.state
    if (prevState.startStation !== startStation || prevState.endStation !== endStation) {
      if ( startStation !== '' && endStation !== '') {
        this.props.fetchPrice(startStation, endStation)
      }
    }
  }

  onOctopusSelected = index => {
    this.props.setOctopusSelectedIndex(index)
  }

  onMoneySavedChange = (moneySaved) => {
    this.props.setMoneySaved(moneySaved)
  }

  renderAutoComplete = (stateKey) => {
    const { stationsMap } = this.props
    const { hideSuggestion } = this.state
    const dataPool = stationsMap? Object.values(stationsMap) : []
    const suggestion = []
    dataPool.forEach(value => {
      if (value.includes(this.state[stateKey])) {
        suggestion.push(value)
      }
    })
    
    const onChangeText = text => {
      this.setState({ 
        [stateKey]: text,
        hideSuggestion: false
      })
    }

    const onItemPressed = (item) => {
      this.setState({ 
        [stateKey]: item,
        hideSuggestion: true
      })
    }

    const labelText = stateKey == 'startStation'? '起點' : '終點'
    const containerStyle = stateKey == 'startStation'? { marginRight: 8 } : { marginLeft: 8 }

    return (
      <View style={[styles.autoComplete, containerStyle]}>
        <Text style={styles.labelText} >{labelText} :</Text>
        <Autocomplete 
          style={{ borderRadius: 8 }}
          inputContainerStyle={styles.inputStyle}
          listContainerStyle={{
            top: 48,
            position: 'absolute',
            borderRadius: 8,
            width: '100%'
          }}
          listStyle={{
            maxHeight: 150,
            position: 'absolute',
            borderRadius: 8
          }}
          placeholder="請輸入"
          value={this.state[stateKey]}
          data={suggestion}
          onChangeText={onChangeText}
          hideResults={hideSuggestion}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => onItemPressed(item)}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }

  renderOctopusSession = () => {
    const { octopusSelectedIndex } = this.props
    return (
      <LinearGradient 
        start={{x: 0, y: 0}} end={{x: 0, y: 1}} 
        colors={['#59B4A4', '#59D9A4']}
        style={{
          backgroundColor: theme.color.background2, 
          paddingTop: 8,
          paddingBottom: 32,
          marginBottom: -40
        }}
      >
        <View style={styles.octopusContainer}>
          <Text style={{ fontSize: 16, color: theme.color.font2, marginRight: 16 }}>
            你選擇摸擬的八達通: 
          </Text>
          <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
            { contents[octopusSelectedIndex].render }
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  }

  renderContent = () => {
    const { price, moneySaved, octopusSelectedIndex } = this.props
    const { adult, elderly, children, student } = price
    const priceList = [elderly, student, children]
    const specialPrice = priceList[octopusSelectedIndex]
    return (
      <View style={styles.contentStyle}>
      
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
            marginBottom: -40
          }}
        >
          <View style={styles.octopusContainer}>
          
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  stationsMap: getHKMTRStationsMap(state),
  price: getPrice(state),
  isStationsMapFetching: getStationsMapFetchingStatus(state),
  moneySaved: getMoneySaved(state),
  octopusSelectedIndex: getOctopusSelectedIndex(state)
})

export default connect(mapStateToProps, {
  fetchPrice, setMoneySaved, setOctopusSelectedIndex
})(Dashboard)
