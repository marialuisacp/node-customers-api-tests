const { MongoClient } = require('mongodb');

const connect = require('../config/connect');
const self = this;

self.state = {
  db: null,
}

self.connect = async (url, done) => {
  if (self.state.db) return done()

  let result;
  await MongoClient.connect(url, (error, client) => {
    if (error) {
      console.log(`error to connect DB ${connect.db} in url: ${url}`, error);
      result = done(error);
    } else {
      self.state.db = client.db(connect.db);
      console.log(`${connect.db} DB connected successfully in url: ${url}`);
      result = done()
    }
  });
  return result;
}

self.get = () => self.state.db;

self.close = (done) => {
  if (self.state.db) {
    self.state.db.close((err, result) => {
      if (err) {
        return done(err)
      }
      self.state.db = null
      return done(result)
    })
  }
}