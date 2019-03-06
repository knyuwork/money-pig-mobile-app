import React, {Component} from 'react'
import { TouchableOpacity, Input, Text, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux'
import Modal from 'react-native-modal';
import Autocomplete from 'react-native-autocomplete-input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'react-native-firebase'

import RadioButtonGroup from '../../Components/RadioButtonGroup'
import theme from '../../theme'
import styles from './styles'
import { getHKMTRStationsMap, getStationsMapFetchingStatus } from '../../Redux/octopus/selectors'

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
  static navigationOptions = (props) => ({
    headerStyle: {
      backgroundColor: theme.color.blue4,
    },
    headerTintColor: '#FFF',
    headerLeft: (navigationOptions) => <DrawerButton {...props} navigationOptions={navigationOptions} />
  })

  state = {
    showModal: false,
    octopusSelectedIndex: 0,
    startStation: '',
    endStation: '',
    hideSuggestion: true
  }

  renderModal = () => {
    const { showModal, octopusSelectedIndex } = this.state
    return (
      <Modal
        isVisible={showModal} 
        onBackdropPress={() => this.setState({ showModal: false })}
      >
        <RadioButtonGroup 
          contents={contents}
          activeIndex={octopusSelectedIndex}
          onPress={index => this.setState({ octopusSelectedIndex: index })} />
      </Modal>
    )
  }

  onSave = () => {
    this.props.startLoading()
    setTimeout(() => this.props.endLoading(), 2000) 
    
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

    return (
      <View style={styles.autoComplete}>
        <Text style={styles.labelText} >{labelText} :</Text>
        <Autocomplete 
          style={{
            borderRadius: 8
          }}
          inputContainerStyle={{
            borderRadius: 8
          }}
          listStyle={{
            height: 150,

          }}
          value={this.state[stateKey]}
          // containerStyle={styles.autoComplete}
          data={suggestion}
          onChangeText={onChangeText}
          hideResults={hideSuggestion}
          onFocus={onFocus}
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

  render() {
    const { octopusSelectedIndex } = this.state
    return (
      <SafeAreaView style={styles.container} forceInset={{top: 'never'}} >
        <View style={styles.content} >
          <View style={styles.octopusContainer}>
            <Text style={{ fontSize: 16, color: theme.color.blue2, marginRight: 16 }}>
              你選擇摸擬的八達通: 
            </Text>
            <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
              { contents[octopusSelectedIndex].render }
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            style={{
              width: SCREEN_WIDTH,
              padding: 12
            }}
            containerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps='handled'
          >
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                { this.renderAutoComplete('startStation') }
                { this.renderAutoComplete('endStation') }
              </View>
            </View>
          </KeyboardAwareScrollView>
          <TouchableOpacity onPress={this.onSave} style={styles.button}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
        <AdmobBanner
          unitId={'ca-app-pub-8273861087920374/5118578430'}
          request={request.build()}
          onAdLoaded={() => {
          }}
        />
        { this.renderModal() }
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  stationsMap: getHKMTRStationsMap(state).toJS(),
  isStationsMapFetching: getStationsMapFetchingStatus(state)
})

export default connect(mapStateToProps)(Octopus)
