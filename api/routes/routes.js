const videoControllers = require('../controllers/videoControllers');
const testControllers = require('../controllers/testController');
const userControllers = require('../controllers/userController');
const profPicController = require('../controllers/profPicController')
module.exports = (app) => {
  app
    .route('/upload_video/:username')
    .post(videoControllers.uploadVideo);
  app
    .route('/video_list/:username')
    .get(videoControllers.getVideoList)
  app
    .route('/media_create')
    .post(testControllers.createMedia)
  app
    .route('/post_media')
    .get(testControllers.getMedia)
  app
    .route('/user_create')
    .post(userControllers.createUser)
  app
    .route('/find_user')
    .post(userControllers.findUser)
  app
    .route('/upload_profile_pic/:username')
    .post(profPicController.updateProfilePic)
  app
    .route('/show_profile_pic/:username')
    .get(profPicController.viewProfilePic)
}