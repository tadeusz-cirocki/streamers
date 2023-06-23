const mongoose = require('mongoose');

const streamerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
});

// Create the Streamer model using the schema
const Streamer = mongoose.model('Streamer', streamerSchema);

module.exports = Streamer;
