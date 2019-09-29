import OAuthManager from 'react-native-oauth'

const manager = new OAuthManager('OAuthManager')

manager.addProvider({
  mql5: {
    auth_version: '2.0',
    authorize_url: 'https://www.mql5.com/en/oauth/login',
    access_token_url: 'https://www.mql5.com/api/oauth/access_token',
    callback_url: ({ app_name }) => {
      console.log(app_name)
      return `${app_name}://oauth`
    },
  },
})

manager.configure({
  mql5: {
    client_id: 'pj3yqd',
    client_secret:
      'TZDNBNHPFOSLRSKDECLZPNSUBQKHALSHPJMOOFGSIBIYYEAGTOKQJRCGGJLKDZPT',
  },
  google: {
    callback_url: `io.fullstack.FirestackExample:/oauth2redirect`,
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_SECRET',
  },
})

manager
  .authorize('google', { scopes: 'profile email' })
  .then(resp => console.log('Your users ID'))
  .catch(err => console.log('There was an error'))

export default manager
