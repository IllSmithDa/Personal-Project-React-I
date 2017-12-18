const Video = require('../models/videoModels');

const SERVER_ERROR_STATUS = 500;

const videoCreate = (req, res) => {
  const { image_source, video_name } = req.body;
  const newVideo = new Video({ image_source, video_name });
  newVideo
    .save()
    .then(video => res.json(video))
    .catch(err => res.status(SERVER_ERROR_STATUS).json({ error: err.message }));
};

const getVideoList = (req, res) => {
  Video.find({})
    .exec()
    .then(video => res.json(video))
    .catch(err => res.status(SERVER_ERROR_STATUS).json({ error: err.message}));
};

module.exports = {
  getVideoList,
  videoCreate
}