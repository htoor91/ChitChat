const User = require('../api/user/user_model');
const signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {
  const token = signToken(req.user._id);
  const username = req.user.username;
  res.json({token: token, user: req.user.toJson()});
};
