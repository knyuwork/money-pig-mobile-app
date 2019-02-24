import NavigationService from '../Navigation'
import { getUserInfo } from './firebase/DatabaseHelper'

export const getNavigationProps = (navigation, key) => {
  return navigation.state.params[key]
}

export const navigateToProductDetail = (productDetail, callback) => {
  const { authurId } = productDetail
  getUserInfo(authurId, (userInfo) => {
    NavigationService.navigate('ProductDetail', { 
      productDetail,
      authurInfo: userInfo
    })

    if (callback) {
      callback()
    }
  })
}