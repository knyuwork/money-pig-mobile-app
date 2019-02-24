import firebase from 'react-native-firebase'


// User
export const setUserInfo = (uid, userInfo) => {
  firebase.database().ref('Users/' + uid).update({
    userInfo
  })
}

export const getUserInfo = (uid, callback) => {
  firebase.database().ref('Users/' + uid).once('value', snap => {
    if (callback) {
      callback(snap.val().userInfo)
    }
  })
}

// Product
export const getProductList = (callback = null) => {
  firebase.database().ref('Products').once('value', snap => {
    if (callback) {
      callback(snap.val()? Object.values(snap.val()) : [])
    }
  })
}

export const getProductListById = (productId, callback = null) => {
  firebase.database().ref('Products/'+productId).once('value', snap => {
    console.log('getProductListById')
    if (callback) {
      callback(snap.val())
    }
  })
}

export const addNewProduct = (product, callback = null) => {
  const ref = firebase.database().ref('Products').push()
  const productId = ref.key

  ref.set({
    ...product,
    productId,
  }, (err) => {
    if (callback) {
      callback(err)
    }
  })
}

export const updateProductQueue = (productId, queue, callback) => {
  firebase.database().ref('Products/'+productId+'/queue').set(queue, callback)
}

export const removeUserFromProductQueue = (chatId, productId, uid, callback) => {
  firebase.database().ref('Products/'+productId+'/queue').once('value', snap => {
    const queue = snap.val()
    let updatedQueue = queue || {}
    updatedQueue[uid] = null
    let updates = {}
    updates['Products/'+productId+'/queue'] = queue
    firebase.database().ref().update(updates, callback)
  })
}