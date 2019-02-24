import React, {Component} from 'react'
import { ScrollView, Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import theme from '../../theme';

type Props = {}
class Home extends Component<Props> {

  state = {
    tabBarIndex: 0
  }

  onScroll = (index) => {
    // console.log(event)
    // console.log(event.nativeEvent.contentOffset.x)
    this.setState({
      tabBarIndex: index // SCREEN_WIDTH
    })
  }

  onTabBarScroll = () => {

  }

  render() {
    const { tabBarIndex } = this.state
    const { navigation } = this.props
    return (
        <SafeAreaView 
          style={{flex: 1}}
        >
        </SafeAreaView>
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