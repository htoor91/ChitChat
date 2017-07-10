const User = require('./user_model');
const Channel = require('../channel/channel_model');
const Membership = require('../membership/membership_model');
const _ = require('lodash');
const signToken = require('../../auth/auth').signToken;

exports.params = function(req, res, next, id) {
  User.findById(id)
    .select('-password')
    .exec()
    .then(function(user) {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  User.find({})
    .select('-password')
    .exec()
    .then(function(users){
      res.json(users.map(function(user){
        return user.toJson();
      }));
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  const user = req.user.toJson();
  res.json(user);
};

exports.getChannels = function(req, res, next){
  const user = req.user.toJson();
  let channels = {};

  Membership.find({userId: user._id})
    .populate('channelId')
    .exec()
    .then(function(memberships){
      memberships.forEach(function(el){
        channels[el.channelId._id] = el.channelId;
      });
      res.json(channels);
    }, function(err){
      next(err);
    });

};

exports.put = function(req, res, next) {
  const user = req.user;

  const update = req.body;

  _.merge(user, update);

  user.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved.toJson());
    }
  });
};

exports.post = function(req, res, next) {
  const newUser = new User(req.body);

  newUser.save(function(err, user) {
    if(err) { return next(err);}

    Channel.find({ private: false })
      .then(function(channels) {
        channels.forEach(function(channel){
          Membership.create({userId: user._id, channelId: channel._id})
            .then(function(membership){}, function(membershipErr){
              next(membershipErr);
            });
        });
      }, function(channelErr){
        next(channelErr);
      });

    const token = signToken(user._id);
    const username = user.username;
    res.json({token: token, user: user.toJson()});
  });
};

exports.delete = function(req, res, next) {
  req.user.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed.toJson());
    }
  });
};

exports.me = function(req, res) {
  res.json(req.user.toJson());
};
