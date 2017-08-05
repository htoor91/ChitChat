const Emoticon = require('./emoticon_model');
const Message = require('../message/message_model');

exports.get = function(req, res, next) {
  Emoticon.find({})
    .then(function(emoticons){
      res.json(emoticons);
    }, function(err){
      next(err);
    });
};

exports.post = function(req, res, next){
  Emoticon.create(req.body)
    .then(function(emoticon){
      Message.findById(emoticon.messageId)
        .then(function(message){
          let emoticons = message.emoticons;
          const emoteObj = {userId: emoticon.userId, icon: emoticon.icon};
          if(emoticons === undefined){
            message.emoticons = [emoteObj];
          } else {
            emoticons.push(emoteObj);
            message.emoticons = emoticons;
          }
          message.save(function(err,saved){
            if(err){
              next(err);
            }
            res.json(saved);
          });
        }, function(err){
          next(err);
      });
    }, function(err){
      next(err);
    });
};
