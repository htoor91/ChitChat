const express = require('express');
const app = express();
const api = require('./api/api');
const config = require('./config/config');
const logger = require('./util/logger');
const auth = require('./auth/routes');
const mongoose = require('mongoose');
const path = require('path');
// connect to DB

mongoose.Promise = require('bluebird');
mongoose.connect(config.db.url);

if (config.seed) {
  require('./util/seed');
}

// Make static files publically available
app.use(express.static(path.join(__dirname, '..', 'client', 'src', 'public')));

// setup the app middleware
require('./middleware/app_middleware')(app);

// mount the routers
app.use('/api', api);
app.use('/auth', auth);


// set up global error handling
app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

// export the app for testing
module.exports = app;
