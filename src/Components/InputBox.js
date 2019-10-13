import React, { Component } from 'react'

import { TextInput } from 'react-native'

const shadowBox = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.1,
  elevation: 1,
}

type Props = {}

const InputBox = ({ style, ...props }: Props) => {
  return (
    <TextInput
      style={[
        {
          paddingHorizontal: 4,
          borderRadius: 8,
          height: 44,
          borderWidth: 0.1,
        },
        style,
      ]}
      {...props}
    />
  )
}

export default InputBox
