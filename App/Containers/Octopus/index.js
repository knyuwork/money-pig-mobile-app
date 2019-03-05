import React, {Component} from 'react'
import { TouchableOpacity, Input, Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux'
import Modal from 'react-native-modal';
import Autocomplete from 'react-native-autocomplete-input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'react-native-firebase'

import RadioButtonGroup from '../../Components/RadioButtonGroup'
import theme from '../../theme'
import { getHKMTRStationsMap, getStationsMapFetchingStatus } from '../../Redux/octopus/selectors'

import CHILD_OCTOPUS_CARD from '../../Images/octopus-child.jpg'
import ELDER_OCTOPUS_CARD from '../../Images/octopus-elder.jpg'
import STUDENT_OCTOPUS_CARD from '../../Images/octopus-student.jpg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const contents = [
  {
    render: <Image source={ELDER_OCTOPUS_CARD} />
  },
  {
    render: <Image source={STUDENT_OCTOPUS_CARD} />
  },
  {
    render: <Image source={CHILD_OCTOPUS_CARD} />
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
          <KeyboardAwareScrollView
            style={{ width: SCREEN_WIDTH }}
            containerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps='handled'
          >
            <View style={{width: '100%', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
                { contents[octopusSelectedIndex].render }
              </TouchableOpacity>
            </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 12
  },
  autoComplete: {
    flex: 1,
    marginHorizontal: 8
  },
  labelText: {
    fontSize: 18,
    marginVertical: 8
  },
  suggestionText: {
    fontSize: 18
  },
  button: {
    padding: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: theme.color.blue5
  },
  suggestionItem: {
    padding: 8
  }
});