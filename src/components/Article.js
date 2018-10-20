import React from 'react'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import RatingBar from './RatingBar'

import { db } from './../firebase'

class Article extends React.Component {

  handleRating = (rating) => {
    let key = "rating." + this.props.user.uid
    db.collection('articles').doc(this.props.article.id).update({
      [key]: rating
    })
  }

  render() {
    const styles = {
      body: {
        padding: 20,
        marginTop: 30
      },
      close: {
        position: 'absolute',
        top: 0,
        right: 0
      },
      title: {
        fontSize: 28
      },
      image: {
        width: '100%'
      }
    }
    let title = this.props.article.title
    let url = this.props.article.url
    let content = this.props.article.content
    let image = this.props.article.image
    let author = this.props.article.author
    return(
      <div className="article">
        <IconButton style={styles.close} onClick={() => this.props.setArticle(null)}>
          <Icon>close</Icon>
        </IconButton>
        <div style={styles.body}>
          <div style={styles.title}>{title}</div>
          {author && <div>by {author}</div>}
          <img src={image} style={styles.image}/>
          {content.replace(/<(?:.|\n)*?>/gm, '')}
          <div>
            <RatingBar submit={this.handleRating}/>
          </div>
          <div>
            <Button>
              <a href={url}>go to website</a>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Article
