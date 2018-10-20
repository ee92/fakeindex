import React from 'react'
import { auth } from './../firebase'

class Header extends React.Component {

  logout = () => auth.signOut()

  render() {
    const styles = {
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 20px',
        backgroundColor: '#DDDDDD'
      },
      authButton: {
        display: 'block',
        backgroundColor: '#2ECC40',
        color: 'white',
        padding: '10px 20px',
        borderRadius: 500,
        fontSize: 16,
        height: 44,
        cursor: 'pointer'
      }
    }

    return(
      <div style={styles.header}>
        <h1>FakeIndex 📊</h1>
        {this.props.user
          ?
          <button onClick={this.logout} style={styles.authButton}>
            Logout
          </button>
          :
          <button onClick={this.props.toggleAuth} style={styles.authButton}>
            Login
          </button>
        }
      </div>
    )
  }
}

export default Header
