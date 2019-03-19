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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  growthTableCol: {
    flex: 1,
    paddingVertical: 8
  },
  growthTableMidRow: {
    borderColor: theme.color.font1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 8,
    marginHorizontal: 8
  },
  moneySavedAmountFont: {
    fontWeight: 'bold',
    fontSize: 42, color: theme.color.font4,
    fontFamily: 'Pragati Narrow',
    marginVertical: -12
  },
  moneyGrowthFont: {
    fontWeight: 'bold',
    fontSize: 22, color: theme.color.font3,
    fontFamily: 'Pragati Narrow',
    marginVertical: -4
  },
  moneyGrowthLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: theme.color.font1,
    fontFamily: 'Pragati Narrow'
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
  historyTitleFont: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: theme.color.font1,
    fontWeight: 'bold',
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