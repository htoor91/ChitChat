const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const checkToken = expressJwt({ secret: config.secrets.jwt });
const User = require('../api/user/user_model');

exports.decodeToken = function() {
  return function(req, res, next) {
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    checkToken(req, res, next);
  };
};

exports.getFreshUser = function() {
  return function(req, res, next) {
    User.findById(req.user._id)
      .then(function(user) {
        if (!user) {
          res.status(401).send('Unauthorized');
        } else {
          req.user = user;
          next();
        }
      }, function(err) {
        next(err);
      });
  };
};

exports.verifyUser = function() {
  return function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      res.status(400).send('Invalid credentials');
      return;
    }

    User.findOne({username: username})
      .then(function(user) {
        if (!user) {
          res.status(401).send('Invalid credentials');
        } else {
          if (!user.authenticate(password)) {
            res.status(401).send('Invalid credentials');
          } else {
            req.user = user;
            next();
          }
        }
      }, function(err) {
        next(err);
      });
  };
};

exports.signToken = function(id) {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresIn: config.expireTime}
  );
};
