import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../theme'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const shadowBox = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.4,
  elevation: 1
}

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.color.background1
  },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  carouselItemContainer: {
    borderRadius: 12,
    padding: 16,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: SCREEN_HEIGHT / 4.8,
    width: SCREEN_WIDTH / 1.2,
    ...shadowBox,
  },
  growthTable: {
    flex: 1, 
    flexDirection: 'row'
  },
  moneySavedAmountFont: {
    marginLeft: 8, fontWeight: 'bold',
    fontSize: 26, color: theme.color.font3
  },
  historyContainer: {
    height: '70%',
    // flex: 1,
    width: SCREEN_WIDTH,
  },
  historyRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  historyFont: {
    color: theme.color.font3,
    fontSize: 16,
    marginRight: 16
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: theme.color.font1,
    paddingTop: 12
  },
  contentStyle: {
    margin: 8,
    padding: 12,
    backgroundColor: theme.color.background3,
    justifyContent: 'space-between',
    borderRadius: 12,
    height: '75%',
    width: '100%',
    ...shadowBox
  }
});