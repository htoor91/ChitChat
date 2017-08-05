const Message = require('./message_model');
const _ = require('lodash');

exports.params = function(req, res, next, id){
  Message.findById(id)
    .then(function(message){
      if(!message){
        next(new Error('No message with that id'));
      } else{
        req.message = message;
        next();
      }
    }, function(err){
      next(err);
    });
};

exports.get = function(req, res, next) {
  Message.find({})
    .then(function(messages){
      res.json(messages);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next){
  res.json(req.message);
};

exports.post = function(req, res, next){
  Message.create(req.body)
    .then(function(message){
      Message.findOne(message)
        .populate('userId', '_id username aviUrl')
        .exec()
        .then(function(populatedMessage){
          res.json(populatedMessage);
        }, function(err){
          next(err);
        });
    }, function(err){
      next(err);
    });
};

exports.put = function(req, res, next){
  const message = req.message;
  const updated = req.body;

  _.merge(message, updated);

  message.save(function(err, saved){
    if(err){
      next(err);
    } else{
      res.json(saved);
    }
  });
};

exports.delete = function(req, res, next){
  req.message.remove(function(err, removed){
    if(err){
      next(err);
    } else{
      res.json(removed);
    }
  });
};
