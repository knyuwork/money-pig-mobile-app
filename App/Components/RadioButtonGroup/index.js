
import React, {Component} from 'react'
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native'

import RadioButton from './RadioButton'

type Props = {
  contents: Array,
  activeIndex: Number,
  onPress: Function
};
class RadioButtonGroup extends Component<Props> {

 render() {
   const { contents, activeIndex, onPress } = this.props
   return (
      <View style={styles.container}>
        {
          contents.map((content, index) => 
            <RadioButton
              key={index}
              selected={activeIndex === index}
              onPress={() => onPress(index)}
            >
              { content.render }
            </RadioButton>
          )
        }
      </View>
   );
 }
}

export default RadioButtonGroup

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', 
    backgroundColor: '#fff'
  }
})
