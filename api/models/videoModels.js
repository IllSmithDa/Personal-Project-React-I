const mongoose = require('mongoose');
const Schema = mongoose.Schema
const VideoSchema = new Schema({
  //id: Number,
 // image_source:{
 //   type: String,
 //   required: true
//  },
  videoName: {
    type: String,
    required: true
  },
  videoId :{
    type: String,
    required: true,
  },
  userName : {
    type: String,
    required: true
  }
///  channel_name: String,
//  viewer_count: Number,
});

VideoSchema.methods.getVideoName = function() {
  return this.video_name;
}
module.exports = mongoose.model('Video', VideoSchema);