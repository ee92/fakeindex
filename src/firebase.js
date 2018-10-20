import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import * as firebaseui from 'firebaseui'

const config = {
  apiKey: "AIzaSyCzL8y5hnBdEBmG6ga_x63KSvpJQMFozGE",
  authDomain: "checkedbyus.firebaseapp.com",
  databaseURL: "https://checkedbyus.firebaseio.com",
  projectId: "checkedbyus",
  storageBucket: "checkedbyus.appspot.com",
  messagingSenderId: "615395609717"
}
firebase.initializeApp(config)

const authConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  callbacks: {
    'signInSuccessWithAuthResult': (authResult) => {
      let user = authResult.user
      db.collection('users').doc(user.uid).get()
      .then((doc) => {
        if (!doc.exists) {
          db.collection('users').doc(user.uid).set({
            username: user.displayName,
            avatar: user.photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
        }
      })
    }
  }
}

const auth = firebase.auth()
const db = firebase.firestore()

const settings = {timestampsInSnapshots: true}
db.settings(settings)

export { firebase, db, auth, authConfig }
