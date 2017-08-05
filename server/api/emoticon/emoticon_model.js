const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmoticonModel = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    required: true
  },
  messageId: {
    type: Schema.Types.ObjectId,
    ref: 'message',
    index: true,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('emoticon', EmoticonModel);
