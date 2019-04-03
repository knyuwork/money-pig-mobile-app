import React, {Component} from 'react'
import { TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput, Text, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux'
import Modal from 'react-native-modal';
import moment from 'moment'
import Autocomplete from 'react-native-autocomplete-input'
import ActionButton from 'react-native-action-button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
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
  getOctopusSelectedIndex,
  getOctopusBannerAdId
} from '../../redux/octopus/selectors'
import { fetchPrice, calculateMoneySaved, setMoneySaved, setOctopusSelectedIndex } from '../../redux/octopus/actions'
import { saveRecord } from '../../redux/octopus/actions'

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
    const { octopusSelectedIndex } = this.props
    if ( startStation !== '' && endStation !== '') {
      if (prevState.startStation !== startStation || prevState.endStation !== endStation) {
          this.props.fetchPrice(startStation, endStation)
      }
      if (octopusSelectedIndex !== prevProps.octopusSelectedIndex) {
        this.props.calculateMoneySaved()
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
    const createdTs = parseInt(moment().format('x'))
    this.props.saveRecord({
      type: 'octopus',
      createdTs,
      startStation,
      endStation,
      amount: parseFloat(moneySaved)
    })

  }

  closeModal = () => this.setState({ showModal: false })

  renderModal = () => {
    const { showModal } = this.state
    const { octopusSelectedIndex } = this.props
    return (
      <Modal
        isVisible={showModal} 
        onBackdropPress={this.closeModal}
      >
        <View style={{backgroundColor: '#fff', borderRadius: 12}} >
          <View style={{padding: 12, borderBottomWidth: 0.6, opacity: 0.8, borderBottomColor: theme.color.font2}}>
            <Text style={[styles.octopusSelectText, { fontSize: 18, fontWeight: 'bold' }]}>請選擇</Text>
          </View>
          <RadioButtonGroup 
            style={{paddingVertical: 16}}
            contents={contents}
            activeIndex={octopusSelectedIndex}
            onPress={this.onOctopusSelected} />
          <View style={{borderTopWidth: 0.6, opacity: 0.8, borderTopColor: theme.color.font2, alignItems: 'flex-end'}}>
            <TouchableOpacity style={styles.modalButton} onPress={this.closeModal}>
              <Text style={styles.modalButtonText}>確定</Text>
            </TouchableOpacity>
          </View>
        </View>
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
        colors={[theme.color.header1, theme.color.header2]}
        style={styles.octopusSession}
      >
        <View style={styles.octopusContainer}>
          <Text style={styles.octopusSelectText}>
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
      
      <ScrollView
        keyboardShouldPersistTaps='handled'
        scrollEnabled={false}
        contentContainerStyle={styles.contentStyle}
      >
        <View style={styles.autoCompleteContainer}>
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
              value={moneySaved}
              onChangeText={this.onMoneySavedChange}
            />
          </View>
        </View>
      </ScrollView>
    )
  }

  render() {
    const { octopusBannerAdId } = this.props
    return (
      <SafeAreaView style={styles.container} forceInset={{top: 'never'}} >
        { this.renderOctopusSession() }
        <KeyboardAvoidingView
          behavior="padding" enabled
          style={{ width: SCREEN_WIDTH, padding: 8,  height: SCREEN_HEIGHT * 2 / 3 }}
        >
          { this.renderContent() }
          <ActionButton buttonColor={theme.color.button1} onPress={this.onSave} />
        </KeyboardAvoidingView>
        <SafeAreaView>
          <AdmobBanner
            unitId={octopusBannerAdId}
            request={request.build()}
          />
        </SafeAreaView>
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
  octopusSelectedIndex: getOctopusSelectedIndex(state),
  octopusBannerAdId: getOctopusBannerAdId(state)
})

export default connect(mapStateToProps, {
  fetchPrice, setMoneySaved, setOctopusSelectedIndex, saveRecord,
  calculateMoneySaved
})(Octopus)
