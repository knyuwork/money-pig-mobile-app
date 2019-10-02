import queryString from 'query-string'
import firebase from 'react-native-firebase'

export const uploadProductThumbnail = (
  uid,
  imagePickerObject,
  callback = null
) => {
  const { origURL, uri } = imagePickerObject
  let paramsString = origURL.substring(origURL.indexOf('?'))
  const parsed = queryString.parse(paramsString)
  firebase
    .storage()
    .ref(`/ProductThumbnail/${parsed.id}.${parsed.ext}`)
    .putFile(uri)
    .then(res => {
      if (callback) callback(res)
    })
    .catch(err => {
      console.log(err)
    })
}
