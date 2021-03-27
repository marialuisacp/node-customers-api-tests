require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./services/auth');

const app = express();
const routes = require('./routes/index.js');

const connection = require('./config/connect.js');
const { origin, allOrigins } = require('./config/api.js');

const cors = {
  origin: allOrigins
};

app.use((req, res, next) => {
  let originRequest = req.headers.origin;
  if (cors.origin.indexOf(originRequest) >= 0 && req.method !== 'OPTIONS') {
    res.setHeader("Access-Control-Allow-Origin", originRequest);
  } else if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
  next();
});

app.use(auth);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

const db = require('./services/db.js');
const port = process.env.PORT || 8080;

db.connect(connection.config.url, (err) => {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`)
    })
  }
});