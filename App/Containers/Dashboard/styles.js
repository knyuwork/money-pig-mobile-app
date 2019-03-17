import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../theme'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const shadowBox = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.4
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
  savingSummaryContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    ...shadowBox
  },
  chartContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    ...shadowBox
  },
  historyContainer: {
    height: '75%',
    paddingTop: 32,
    width: SCREEN_WIDTH,
  },
  historyRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
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