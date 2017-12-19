const videoControllers = require('../controllers/videoControllers');

module.exports = (app) => {
  app
    .route('/create_video')
    .post(videoControllers.videoCreate);
  app
    .route('/list_videos')
    .get(videoControllers.getVideoList)
}