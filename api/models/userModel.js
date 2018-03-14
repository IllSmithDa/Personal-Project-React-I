const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: '5a623cabae2bd6411020ceb0'
  },
  profilePictureName: {
    type: String,
    default: 'defaultpic1.png'
  },
  videoList: [{
    videoID: {
      type: String
    },
    videoName: {
      type: String
    },
    videoThumbnail: {
      type: String
    },
    view: {
      type: Number,
      default: 0
    }
  }],
});

module.exports = mongoose.model('User', UserSchema);