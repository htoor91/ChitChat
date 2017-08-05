const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageModel = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    required: true
  },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: 'channel',
    index: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  emoticons: [
    {userId: String, icon: String}
  ]
}, {timestamps: true});

module.exports = mongoose.model('message', MessageModel);
