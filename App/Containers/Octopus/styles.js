import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../theme'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const shadowBox = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.4,
  // shadowRadius: 3.84,
}

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.color.background1
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 12
  },
  octopusSession: {
    width: SCREEN_WIDTH,
    backgroundColor: theme.color.background2, 
    paddingTop: 8,
    paddingBottom: 32,
    marginBottom: -40
  },
  octopusContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 8,
    borderRadius: 12,
    // width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    ...shadowBox
  },
  octopusImage: {
    height: 100,
    width: 151
  },
  autoComplete: {
    flex: 1,
    zIndex: 1
  },
  labelText: {
    fontSize: 16,
    marginVertical: 8,
    color: theme.color.font1,
    fontWeight: 'bold'
  },
  suggestionItem: {
    zIndex: 1
  },
  suggestionText: {
    fontSize: 14,
    zIndex: 1
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
    ...shadowBox
  },
  inputStyle: {
    backgroundColor: 'white',
    height: 40,
    padding: 8,
    borderRadius: 8,
  },
  button: {
    padding: 16,
    marginBottom: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: theme.color.blue5
  },
  suggestionItem: {
    padding: 8
  }
});