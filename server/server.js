const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

// Replace with your Mongo Atlas URI
const MONGO_URI =
  'mongodb+srv://alsfurlan:xrgUJGiH35XQnZYa@cluster0.jv44ec2.mongodb.net/?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a Mongo Atlas URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo Atlas instance.'))
  .on('error', (error) =>
    console.log('Error connecting to Mongo Atlas:', error)
  );
  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: 'aaabbbccc',
      store: new MongoStore({
        url: MONGO_URI,
        autoReconnect: true
      })
    })
  );
  

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
