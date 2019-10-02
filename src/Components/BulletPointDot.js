import React, { Component } from 'react'
import { Text } from 'react-native'

type Props = {
  style: objecet,
}
export default class DrawerButton extends Component<Props> {
  render() {
    return (
      <Text
        style={[
          this.props.style,
          { fontWeight: 'bold', fontSize: 24, marginRight: 8 },
        ]}
      >{`\u2022`}</Text>
    )
  }
}
