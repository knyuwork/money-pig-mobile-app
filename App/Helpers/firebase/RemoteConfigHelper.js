import firebase from 'react-native-firebase'

export const fetchRemoteConfig = () => {
  return firebase
    .config()
    .fetch(0)
    .then(() => {
      return firebase.config().activateFetched()
    })
    .catch(err => {
      console.error('An error occurred', err)
    })
}

export function getRemoteConfig(keyPrefix) {
  return firebase
    .config()
    .getKeysByPrefix(keyPrefix)
    .then(keys => {
      return firebase.config().getValues(keys)
    })
    .catch(console.error)
}

export function getAllRemoteConfig(keys) {
  return firebase
    .config()
    .getValues(keys)
    .catch(console.error)
}
