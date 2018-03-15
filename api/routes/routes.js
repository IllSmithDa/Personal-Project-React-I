const videoControllers = require('../controllers/videoControllers');
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
    .route('/streamVideo/:videoID/:userID')
    .get(videoControllers.streamVideo)
  app 
    .route('/videoInfo/:videoID')
    .get(videoControllers.getVideoInfo)
  app
    .route('/addComment/:videoID')
    .post(videoControllers.addComment)
  app
    .route('/getAllVideos')
    .get(videoControllers.getAllVideos)
  app
    .route('/delete_video/:username')
    .post(videoControllers.deleteVideo)
  app
    .route('/user_create')
    .post(userControllers.createUser)
  app
    .route('/find_user')
    .post(userControllers.findUser)
  app
    .route('/get_username')
    .get(userControllers.getUserName)
  app
    .route('/upload_profile_pic/:username')
    .post(profPicController.updateProfilePic)
  app
    .route('/show_profile_pic/:username')
    .get(profPicController.viewProfilePic)
}