
import React, {Component} from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import Firebase from 'react-native-firebase'
import AppNavigator from '../Navigation/AppNavigator'
import { connect } from 'react-redux'
import { SafeAreaView, createAppContainer } from 'react-navigation';

import { initializeApp } from '../Redux/app/actions'
import { getAdmobAppId } from '../Redux/app/selectors'
import NavigationService from '../Navigation'
import { initializeAdmob } from '../Helpers/firebase/AdmobHelper'

const AppNavigatorContainer = createAppContainer(AppNavigator);
const { width: screenWidth, height: screenHeight} = Dimensions.get('window')
type Props = {}
class RootContainer extends Component<Props> {

  componentDidMount () {
    if (__DEV__) {
      Firebase.config().enableDeveloperMode()
    }
    this.props.initializeApp()
  }

  renderLoading() {
    return (
      <View style={{width: screenWidth, height: screenHeight, justifyContent: 'center', alignItems: 'center', position: 'absolute'}}>
        <View style={{borderRadius: 16, backgroundColor: 'rgba(200,200,200,1)', padding: 16}} >
          <ActivityIndicator size={'large'}/>
        </View>
      </View>
    )
  }

  render() {
    const { isLoading } = this.props
    return (
      <View style={{flex: 1, backgroundColor: theme.color.blue5}}>
        <AppNavigatorContainer 
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }} />
        { isLoading && this.renderLoading() }
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    isLoading: state.userInterface.get('isLoading'),
    admobAppId: getAdmobAppId(state)
  }
}

export default connect(mapStateToProps, {
  initializeApp
})(RootContainer);
