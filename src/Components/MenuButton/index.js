/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import {
  getNavigationProps,
  navigateToProductDetail,
} from '../../Helpers/NavigationHelper'

import Icon from 'react-native-vector-icons/Entypo'
import ModalDropdown from 'react-native-modal-dropdown'
import UIActions from '../../redux/userInterface/actions'
import { connect } from 'react-redux'
import { getProductListById } from '@src/firebase/DatabaseHelper'

const { openChatroomPartnerModal } = UIActions

type Props = {
  options: Object,
  navigation: Object,
  navigationOptions: Object,
}
class MenuButton extends Component<Props> {
  onSelect = (index, value) => {
    const { navigation, openChatroomPartnerModal } = this.props
    const { singleId: productId } = getNavigationProps(navigation, 'metadata')
    switch (value) {
      case 'View Product':
        console.log('Product Detail') //singleId is the same as productId
        getProductListById(productId, productDetail => {
          navigateToProductDetail(productDetail, () => {})
        })
        break
      case 'Partners':
        openChatroomPartnerModal()
        break

      default:
        break
    }
  }

  render() {
    const { navigationOptions, options } = this.props
    // const optionTexts = Object.keys(options)
    console.log(this.props)
    const dropdownStyle = {
      height: options.length * 40,
      marginRight: 8,
    }
    const dropdownTextStyle = {
      fontSize: 14,
      height: 40,
      // lineHeight: 30,
      // justifyContent: 'center'
    }
    return (
      <ModalDropdown
        dropdownStyle={dropdownStyle}
        dropdownTextStyle={dropdownTextStyle}
        onSelect={this.onSelect}
        options={options}
      >
        <Icon
          style={{ marginRight: 8 }}
          color={navigationOptions.headerTintColor}
          size={20}
          name={'dots-three-vertical'}
        />
      </ModalDropdown>
    )
  }
}

export default connect(
  null,
  {
    openChatroomPartnerModal,
  }
)(MenuButton)
