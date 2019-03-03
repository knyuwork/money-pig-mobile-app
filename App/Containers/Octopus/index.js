import React, {Component} from 'react'
import { TouchableOpacity, Input, Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux'
import Modal from 'react-native-modal';
import Autocomplete from 'react-native-autocomplete-input'
import firebase from 'react-native-firebase'

import RadioButtonGroup from '../../Components/RadioButtonGroup'
import theme from '../../theme';
import { fetchMTRStationsMap } from '../../Redux/octopus/actions';
import { getHKMTRStationsMap, getStationsMapFetchingStatus } from '../../Redux/octopus/selectors';
import actons from '../../Redux/userInterface/actions';

import CHILD_OCTOPUS_CARD from '../../Images/octopus-child.jpg'
import ELDER_OCTOPUS_CARD from '../../Images/octopus-elder.jpg'
import STUDENT_OCTOPUS_CARD from '../../Images/octopus-student.jpg'

const { startLoading, endLoading } = actons

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
    octopusSelectedIndex: 0
  }

  componentDidMount() {
    // this.props.fetchMTRStationsMap()
    // this.props.endLoading()
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

  renderAutoComplete = () => {
    const { stationsMap } = this.props
    const data = stationsMap? Object.values(stationsMap) : null
    console.log(data)
    return (
      <Autocomplete 
        containerStyle={styles.autoComplete} data={data} 
        renderItem={item => (
          <TouchableOpacity onPress={() => this.setState({ query: item })}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    )
  }

  render() {
    const { octopusSelectedIndex } = this.state
    const { stationsMap, isStationsMapFetching } = this.props
    return (
      <SafeAreaView style={styles.container} forceInset={{top: 'never'}} >
        <View style={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
            { contents[octopusSelectedIndex].render }
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            { this.renderAutoComplete() }
            { this.renderAutoComplete() }
          </View>
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

const mapStateToProps = state => {
  console.log(state)
  return {
    stationsMap: {}, //getHKMTRStationsMap(state).toJS(),
    isStationsMapFetching: false, // getStationsMapFetchingStatus(state)
  }
}

export default connect(mapStateToProps, {
  fetchMTRStationsMap, startLoading, endLoading
})(Octopus)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  autoComplete: {
    flex: 1,
    marginHorizontal: 8
  },
  button: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.color.blue5
  },
});