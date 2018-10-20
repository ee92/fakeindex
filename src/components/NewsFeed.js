import React from 'react'
import { db } from './../firebase'
import timeago from 'timeago.js';

class NewsFeed extends React.Component {

  state = {
    articles: []
  }

  componentDidMount() {
    db.collection('articles').onSnapshot((snap) => {
      let newArticles = []
      let prevArticles = this.state.articles
      snap.docChanges().forEach((article) => {
        if (article.type === "deleted") return
        if (article.type === "modified") {
          prevArticles = prevArticles.filter(x => x.id !== article.doc.id)
        }
        if (!article.doc.data().url) return
        if (!article.doc.data().title) return
        if (!article.doc.data().image) return

        let total = 0
        let n = 0
        for (let i in article.doc.data().rating) {
          total += Number(article.doc.data().rating[i])
          n += 1
        }
        let avg = n > 0 ? (total/n).toFixed(0) : 0

        newArticles.push({
          ...article.doc.data(),
          id: article.doc.id,
          avgRating: avg
        })
      })
      let articles = [...prevArticles, ...newArticles]
      this.setState({articles})
    })
  }

  render() {

    const styles = {
      feed: {
        // margin: '0px 20px'
      },
      article: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: 10
      },
      image: {
        height: 100,
        width: 100,
        objectFit: 'cover',
      },
      title: {
        fontSize: 20
      },
      info: {
        margin: '0px 10px'
      },

    }
    return(
      <div style={styles.feed}>
        <h1>Top Stories</h1>
        {this.state.articles.map((item) => {

          let time = timeago().format(item.postedAt.toMillis())

          let rating = ''
          if (item.avgRating > 0) {
            rating = item.avgRating + '% R'
            styles.rating = {
              color: 'red',
              minWidth: 60,
              height: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 20
            }
          } else {
            rating = (item.avgRating * -1) + '% L'
            styles.rating = {
              color: 'blue',
              minWidth: 60,
              height: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 20
            }
          }

          return (
            <div key={item.id} style={styles.article} className="hover-item" onClick={() => this.props.setArticle(item)}>
              <div style={styles.rating}>{rating}</div>
              <img src={item.image} style={styles.image}/>
              <div style={styles.info}>
                <div style={styles.title}>{item.title}</div>
                <div>{time}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default NewsFeed
