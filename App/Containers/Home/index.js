import React, {Component} from 'react'
import { ScrollView, Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import theme from '../../theme';

type Props = {}
class Home extends Component<Props> {
  static navigationOptions = (props) => ({
    headerStyle: {
      backgroundColor: theme.color.blue4,
    },
    title: 'SHOPPY',
    headerTintColor: '#FFF',
    headerLeft: (navigationOptions) => <DrawerButton {...props} navigationOptions={navigationOptions} />
  })

  onTabBarScroll = () => {

  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container} >
        <Text>Hello</Text>
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