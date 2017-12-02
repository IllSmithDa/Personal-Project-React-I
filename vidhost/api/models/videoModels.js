const mongoose = require('mongoose');
const VideoSchema = new mongoose.Schema({
  id:{
    type: Number,
    required: true
  },
  image_source:{
    type: String,
    required: true
  },
  videoname: {
    type: String,
    required: true
  },
  channel_name: {
    type: String,
    required: true
  },
  viewer_count: {
    type: Number,
    required: true
  }
});