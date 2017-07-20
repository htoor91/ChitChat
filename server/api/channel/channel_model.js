const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },

  private: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('channel', ChannelSchema);
