import React from 'react'
import Header from './Header'
import Article from './Article'
import PostArticle from './PostArticle'
import NewsFeed from './NewsFeed'
import Auth from './Auth'

import { db, auth } from './../firebase'

class App extends React.Component {

  state = {
    user: null,
    authModal: false,
    article: null
  }

  toggleAuth = () => {
    this.setState({authModal: !this.state.authModal})
  }

  setArticle = (article) => {
    this.setState({article})
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user, authModal: false})
      } else {
        this.setState({user})
      }
    })
  }

  render() {
    return(
      <div>
        <Header user={this.state.user} toggleAuth={this.toggleAuth}/>
        <PostArticle user={this.state.user} toggleAuth={this.toggleAuth}/>
        <NewsFeed openArticle={this.openArticle} setArticle={this.setArticle}/>
        {this.state.article && <Article user={this.state.user} article={this.state.article} setArticle={this.setArticle}/>}
        <Auth open={this.state.authModal} close={this.toggleAuth}/>
      </div>
    )
  }
}

export default App
