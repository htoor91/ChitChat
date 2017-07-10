const User = require('../api/user/user_model');
const signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  const token = signToken(req.user._id);
  const username = req.user.username;
  res.json({token: token, user: req.user.toJson()});
};
