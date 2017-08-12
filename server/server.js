const express = require('express');
const app = express();
const api = require('./api/api');
const config = require('./config/config');
const logger = require('./util/logger');
const auth = require('./auth/routes');
const mongoose = require('mongoose');
const path = require('path');

mongoose.Promise = require('bluebird');
mongoose.connect(config.db.url);

// if (config.seed) {
//   require('./util/seed');
// }


app.use(express.static(path.join(__dirname, '..', 'client', 'src', 'public')));

require('./middleware/app_middleware')(app);

app.use('/api', api);
app.use('/auth', auth);


app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }
  if (err.code === 11000){
    res.status(400).send('Username already exists!');
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

module.exports = app;
