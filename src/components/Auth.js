import React from 'react'
import { auth, authConfig } from './../firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Dialog from '@material-ui/core/Dialog'

const styles = {
  center: {
    textAlign: 'center'
  }
}

class Auth extends React.Component {
  render() {
    let {open, close} = this.props
    return (
      <Dialog open={open} onClose={close}>
        <h3 style={styles.center}>Sign in / Sign up</h3>
        <StyledFirebaseAuth
          uiConfig={authConfig}
          firebaseAuth={auth}
        />
      </Dialog>
    )
  }
}



export default Auth
