const Membership = require('./membership_model');

exports.get = function(req, res, next){
  Membership.find({})
    .then(function(memberships){
      res.json(memberships);
    }, function(err){
      next(err);
    });
};
