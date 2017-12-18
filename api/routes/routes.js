const videoControllers = require('../controllers/videoControllers');

module.exports = (app) => {
  app
    .route('/create-video')
    .post(videoControllers.videoCreate);
  app
    .route('/list-videos')
    .get(videoControllers.getVideoList)
}