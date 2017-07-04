const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MembershipSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
    required: true,
    index: true
  }
});

module.exports = mongoose.model('membership', MembershipSchema);
