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

import CHILD_OCTOPUS_CARD from '../../Images/octopus-child.jpg'
import ELDER_OCTOPUS_CARD from '../../Images/octopus-elder.jpg'
import STUDENT_OCTOPUS_CARD from '../../Images/octopus-student.jpg'

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
    this.props.fetchMTRStationsMap()
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

  render() {
    const { navigation } = this.props
    const { octopusSelectedIndex } = this.state
    return (
      <SafeAreaView style={styles.container} forceInset={{top: 'never'}} >
        <View style={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
            { contents[octopusSelectedIndex].render }
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <View>
            <Autocomplete data={[]} />
          </View>
        </View>
        <AdmobBanner
          unitId={'ca-app-pub-8273861087920374/5118578430'}
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
        />
        { this.renderModal() }
      </SafeAreaView>
    );
  }
}



export default connect(null, {
  fetchMTRStationsMap
})(Octopus)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#FF9789',
    padding: 8
  },
  headerFont: {
    color: '#FFF',
    fontSize: 20,
    paddingHorizontal: 16
  },
  itemContainer: {
    marginHorizontal: 8
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});