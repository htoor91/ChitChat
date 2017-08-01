const Channel = require('./channel_model');
const Membership = require('../membership/membership_model');
const Message = require('../message/message_model');

exports.params = function(req, res, next, id){
  Channel.findById(id)
    .then(function(channel) {
      if(!channel){
        next(new Error("There is no channel with that id"));
      } else {
        req.channel = channel;
        next();
      }
    },function(err){
      next(err);
    });
};

exports.get = function(req, res, next){
  Channel.find({})
    .then(function(channels){
      res.json(channels);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next){
  res.json(req.channel);

};

exports.getUsers = function(req, res, next){
  const channelId = req.channel._id;
  let users = [];

  Membership.find({channelId: channelId})
    .populate('userId', '_id username aviUrl')
    .exec()
    .then(function(memberships){
      memberships.forEach(function(membership){
        users.push(membership.userId);
      });
      res.json(users);
    }, function(err){
      next(err);
    });
};

exports.getMessages = function(req, res, next){
  const channelId = req.channel._id;
  let messages = {};

  Message.find({channelId: channelId})
    .populate('userId', '_id username aviUrl')
    .exec()
    .then(function(messageArr){
      messageArr.forEach(function(msg){
        messages[msg._id] = msg;
      });

      res.json(messages);
    }, function(err){
      next(err);
    });
};

exports.post = function(req, res, next){
  const newChannel = req.body;
  const userIds = req.body.userIds;

  Channel.create(newChannel)
    .then(function(channel){
      if(userIds){
        const channelId = channel._id;
        userIds.forEach(function(userId){
          Membership.create({ userId: userId, channelId: channelId})
          .then(function(){}, function(err){
            next(err);
          });
        });
      }
      res.json(channel);
    }, function(err){
      next(err);
    });
};

exports.delete = function(req, res, next) {
  const channelId = req.channel._id;

  req.channel.remove(function(err, removed){
    if(err){
      next(err);
    } else{
      Membership.remove({channelId: channelId}, function(queryErr){
        if(queryErr){
          next(queryErr);
        }
        res.json(removed);
      });
    }
  });
};
