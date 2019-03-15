import React, {Component} from 'react'
import { TouchableOpacity, TextInput, Text, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux'
import Modal from 'react-native-modal';
import moment from 'moment'
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
} from '../../redux/octopus/selectors'
import { fetchPrice, setMoneySaved, setOctopusSelectedIndex } from '../../redux/octopus/actions'
import { saveOctopusRecord } from '../../redux/dashboard/actions'

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
class Octopus extends Component<Props> {
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

  onSave = () => {
    const { startStation, endStation } = this.state
    const { moneySaved } = this.props
    this.props.saveOctopusRecord({
      type: 'octopus',
      createdTs: moment().toISOString(),
      startStation,
      endStation,
      moneySaved
    })
  }

  renderModal = () => {
    const { showModal } = this.state
    const { octopusSelectedIndex } = this.props
    return (
      <Modal
        isVisible={showModal} 
        onBackdropPress={() => this.setState({ showModal: false })}
      >
        <RadioButtonGroup 
          contents={contents}
          activeIndex={octopusSelectedIndex}
          onPress={this.onOctopusSelected} />
      </Modal>
    )
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

    const onFocus = () => {
      this.setState({ 
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
          style={styles.inputStyle}
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
          onFocus={onFocus}
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
        style={styles.octopusSession}
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
        <View style={{flexDirection: 'row', zIndex: 1}}>
          { this.renderAutoComplete('startStation') }
          { this.renderAutoComplete('endStation') }
        </View>
        <View>
          <View style={{flexDirection: 'row'}} >
            <Text style={[styles.labelText, { flex: 1 }]} >成人票價:</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.labelText} >HKD ($)</Text>
              <Text style={styles.labelText}>{adult}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}} >
            <Text style={[styles.labelText, { flex: 1 }]} >特惠票價:</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.labelText} >HKD ($)</Text>
              <Text style={styles.labelText}>{specialPrice}</Text>
            </View>
          </View>
        </View>
        <View style={styles.resultContainer}>
          <Text style={[styles.labelText, { flex: 1 }]} >節省:</Text>
          <View style={{flexDirection: 'row', flex: 1}} >
            <Text style={[styles.labelText, { flex: 1 }]} >HKD ($)</Text>
            <TextInput 
              style={[styles.inputStyle, { flex: 1, textAlign: 'right' }]} 
              value={moneySaved.toString()}
              onChangeText={this.onMoneySavedChange}
            />
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{top: 'never'}} >
        <View style={styles.content} >
          { this.renderOctopusSession() }
          <KeyboardAwareScrollView
            style={{ width: SCREEN_WIDTH, padding: 8 }}
            contentContainerStyle={{ height: '100%' }}
            keyboardShouldPersistTaps='handled'
            scrollEnabled={false}
          >
            { this.renderContent() }
          </KeyboardAwareScrollView>
          <AdmobBanner
            unitId={'ca-app-pub-8273861087920374/5118578430'}
            request={request.build()}
            onAdLoaded={() => {
            }}
          />
          <ActionButton buttonColor={theme.color.button1} onPress={this.onSave} />
        </View>
        { this.renderModal() }
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
  fetchPrice, setMoneySaved, setOctopusSelectedIndex, saveOctopusRecord
})(Octopus)
