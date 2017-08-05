const User = require('../api/user/user_model');
const Channel = require('../api/channel/channel_model');
const Message = require('../api/message/message_model');
const Membership = require('../api/membership/membership_model');
const Emoticon = require('../api/emoticon/emoticon_model');
const _ = require('lodash');
const logger = require('./logger');

logger.log('Seeding the Database');

const users = [
  {username: 'testuser1', password: 'testpass'},
  {username: 'testuser2', password: 'testpass'},
  {username: 'testuser3', password: 'testpass'}
];

const channels = [
  {name: 'general'},
  {name: 'testchannel1'},
  {name: 'testchannel2'}
];

const createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

const cleanDB = function() {
  logger.log('... cleaning the DB');
  const cleanPromises = [User, Channel, Message, Membership, Emoticon]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
};

const createChannels = function(data) {
  const promises = channels.map(function(channel) {
    return createDoc(Channel, channel);
  });

  return Promise.all(promises)
  .then(function(channels) {
    return _.merge({channels: channels}, data || {});
  });
};

const createUsers = function(data) {

  const promises = users.map(function(user) {
    return createDoc(User, user);
  });

  return Promise.all(promises)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    });
};

const createMemberships = function(data){
  const promises = data.channels.forEach(function(channel){
    data.users.forEach(function(user){
      const membership = { channelId: channel._id, userId: user._id };
      return createDoc(Membership, membership);
    });
  });

  return Promise.all(promises)
    .then(function(memberships){
      return _.merge({memberships: memberships}, data || {});
    });
};

cleanDB()
  .then(createChannels)
  .then(createUsers)
  .then(createMemberships)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
