const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

const { extract, configure } = require('article-parser');

configure({
  htmlRules: {
    allowedTags: [],
    allowedAttributes: []
  }
});

const testMemory = (comment) => {
  const used = process.memoryUsage().rss;
  console.log(`***${comment}*** ${Math.round(used / 1024 / 1024 * 100) / 100} MB`);
}

export const crawlSite =
  functions.firestore.document('submissions/{id}').onCreate((snap) => {

    testMemory('before')

    return extract(snap.data().url).then((article) => {

      testMemory('parsed')

      return db.collection('articles').where('url', '==', article.url)
      .get().then((docs) => {
        if (docs.empty) {
          return db.collection('articles').doc(snap.id).set({
            title: article.title,
            url: article.url,
            image: article.image,
            content: article.content,
            author: article.author,
            postedAt: admin.firestore.FieldValue.serverTimestamp()
          }, {merge: true})
          .then((doc) => {
            return snap.ref.set({
              status: "done"
            }, {merge: true})
          })
        } else {
          docs.forEach((doc) => {
            snap.ref.set({
              status: "duplicate",
              original: doc.id
            })
          })
        }
      })
    })
    .catch((err) => {
      console.log(err);
    });
  });
