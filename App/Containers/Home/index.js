import React, {Component} from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import Modal from 'react-native-modal';
import ModalDropdown from 'react-native-modal-dropdown'
import firebase from 'react-native-firebase'

import theme from '../../theme';

import CHILD_OCTOPUS_CARD from '../../Images/octopus-child.jpg'
import ELDER_OCTOPUS_CARD from '../../Images/octopus-elder.jpg'
import STUDENT_OCTOPUS_CARD from '../../Images/octopus-student.jpg'

const AdmobBanner = firebase.admob.Banner
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');

type Props = {}
class Home extends Component<Props> {
  static navigationOptions = (props) => ({
    headerStyle: {
      backgroundColor: theme.color.blue4,
    },
    headerTintColor: '#FFF',
    headerLeft: (navigationOptions) => <DrawerButton {...props} navigationOptions={navigationOptions} />
  })

  state = {
    showModal: false
  }

  renderModal = () => {
    const { showModal } = this.state
    return (
      <Modal isVisible={showModal}>
        <View>
          <Text>test</Text>
        </View>
      </Modal>
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container} >
        <View style={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
            <Image source={CHILD_OCTOPUS_CARD} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <AdmobBanner
            size={"LARGE_BANNER"}
            unitId={'ca-app-pub-8273861087920374/5118578430'}
            request={request.build()}
            onAdLoaded={() => {
              console.log('Advert loaded');
            }}
          />
        </View>
        { this.renderModal() }
      </View>
    );
  }
}



export default Home

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