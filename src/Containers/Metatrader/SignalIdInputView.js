import React, { Component } from 'react'
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import theme from 'src/theme'

import styles from './styles'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

type Props = {
  onSubmit: () => void,
}

type States = {
  inputValue: string,
}

class SignalIdInputView extends Component<Props, States> {
  state = {
    inputValue: '',
  }

  handleChangeText = inputValue => {
    this.setState({
      inputValue,
    })
  }

  render() {
    const { onSubmit } = this.props
    const { inputValue } = this.state
    return (
      <View
        style={[
          // styles.carouselItemContainer,
          {
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <TextInput
          ref={ref => (this.inputRef = ref)}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 8,
            borderRadius: 8,
            height: 40,
            borderWidth: 0.1,
            width: (SCREEN_WIDTH * 3) / 4,
          }}
          onChangeText={this.handleChangeText}
          placeholder={'請輸入 Signal Id'}
        />
        <TouchableOpacity
          style={{
            backgroundColor: theme.color.font2,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
            marginLeft: 8,
          }}
          onPress={() => onSubmit(inputValue)}
        >
          <Text
            style={{
              color: 'white',
            }}
          >
            新增
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default SignalIdInputView
