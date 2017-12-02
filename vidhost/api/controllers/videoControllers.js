const Video = require('../models/videoModels');

const SERVER_ERROR_STATUS = 500;

const getVideoList = (req, res) => {
  Video.find({})
    .exec()
    .then(video => res.json(video))
    .catch(err => res.status(SERVER_ERROR_STATUS).json({ error: err.message}));
};

module.exports = {
  getVideoList
}