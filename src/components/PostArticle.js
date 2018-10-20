import React from 'react'
import { db, firebase } from './../firebase'

class PostArticle extends React.Component {

  state = {
    input: false,
    linkInput: '',
    pending: false,
    message: 'processing submission'
  }

  toggleInput = () => {
    this.setState({input: !this.state.input})
  }

  handleLinkInput = (e) => {
    this.setState({
      linkInput: e.target.value,
    })
  }

  handleSubmit = () => {
    if (!this.state.linkInput) return
    let url = this.state.linkInput
    this.setState({pending: true})
    db.collection('submissions').add({
      url,
      userId: this.props.user.uid,
      status: 'pending',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((doc) => {
      db.collection('submissions').doc(doc.id)
      .onSnapshot((snap) => {
        if (!snap.data()) return
        if (snap.data().status === 'done') {
          this.setState({message: 'done'})
        } else if (snap.data().status === 'duplicate') {
          this.setState({message: 'failed: duplicate article'})
        }
      })
    })
  }


  render() {

    const styles = {
      postButton: {
        display: 'block',
        margin: 'auto',
        backgroundColor: '#970cc7',
        color: 'white',
        padding: '10px 20px',
        borderRadius: 500,
        fontSize: 16,
        cursor: 'pointer'
      },
      input: {
        display: 'block',
        margin: 'auto',
        padding: '10px 20px',
        border: '1px solid black',
        borderRadius: 500,
        width: '80%',
        fontSize: 16,
      	maxHeight: '50vh'
      },
      buttons: {
        display: 'block',
        margin: 'auto',
        textAlign: 'center'
      },
      submit: {
        backgroundColor: 'green',
        color: 'white',
        padding: '10px 20px',
        borderRadius: 500,
        fontSize: 16,
        cursor: 'pointer'
      },
      cancel: {
        backgroundColor: 'grey',
        color: 'white',
        padding: '10px 20px',
        borderRadius: 500,
        fontSize: 16,
        cursor: 'pointer'
      },
      root: {
        marginTop: 10,
        marginBottom: 10
      }
    }

    return(
      <div style={styles.root}>
        {this.state.input
          ?
          <div>
            <textarea type="url" style={styles.input} placeholder='Paste article link' value={this.state.linkInput} onChange={this.handleLinkInput}/>
            <div style={styles.buttons}>
              <button style={styles.cancel} onClick={this.toggleInput}>cancel</button>
              <button
                style={styles.submit}
                onClick={this.props.user ? this.handleSubmit : this.props.toggleAuth}
              >
                submit
              </button>
            </div>
          </div>
          :
          <button style={styles.postButton} onClick={this.toggleInput}>
            SUBMIT AN ARTICLE LINK
          </button>
        }
        {this.state.pending &&
          <div>submission status: {this.state.message}</div>
        }
      </div>
    )
  }
}

export default PostArticle
