const User = require('../api/user/user_model');
const Channel = require('../api/channel/channel_model');
const Message = require('../api/message/message_model');
const Membership = require('../api/membership/membership_model');
const Emoticon = require('../api/emoticon/emoticon_model');
const _ = require('lodash');
const logger = require('./logger');

logger.log('Seeding the Database');

const users = [
  {username: 'queen_cersei', password: 'testpass', aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_cersei_avi_e5bdgj.png"},
  {username: 'khaleesi', password: 'testpass', aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_dany_avi_kpx7xn.png"},
  {username: 'hound', password: 'testpass', aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_hound_avi_nwv7ld.png"},
  {username: 'jaime', password: 'testpass', aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_jaime_avi_pazpyr.png"},
  {username: 'jon', password: 'testpass', aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_jonsnow_avi_aaokhj.png"},
  {username: 'no_one', password: 'testpass', aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_no_one_avi_n7lza9.png"},
  {username: 'reek', password: 'testpass', aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_reek_avi_cmmbik.png"},
  {username: 'tyrion', password: 'testpass', aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488368/rsz_tyrion_avi_innrcj.png"},
  {username: 'drogon', password: 'testpass', aviUrl:"https://res.cloudinary.com/htoor91/image/upload/v1502488126/rsz_drogon_avi_mhbf0w.png"}
];

const channels = [
  {name: 'general'},
];

const users1 = [
  {username: 'king_kendrick', password: 'testpass', aviUrl:""},
  {username: 'jcole', password: 'testpass', aviUrl:""},
  {username: 'eminem', password: 'testpass', aviUrl:""},
  {username: 'yeezy', password: 'testpass', aviUrl:""},
  {username: 'drake6', password: 'testpass', aviUrl:""}
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
