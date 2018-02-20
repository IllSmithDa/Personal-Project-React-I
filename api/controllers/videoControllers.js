const gridfs = require('gridfs-stream');
const local_file = "./api/controllers/test.jpg";
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Video = require('../models/videoModels');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

const SERVER_ERROR_STATUS = 500;

const uploadVideo = (req, res) => {
  gridfs.mongo = mongoose.mongo;
  const connection = mongoose.connection;
  const gfs = gridfs(connection.db);

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.video_file;
  const { username } = req.params;
  const { videoName } = req.body;
  // console.log(req);
 //console.log(sampleFile.name);
 /// console.log(sampleFile.name);
 //console.log(req.files);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`./api/controllers/server/${videoName}`, function(err) {
    if (err) return res.status(500).send(err);
  });
 


  let writestream = gfs.createWriteStream({ filename: videoName });

  let readStream = fs.createReadStream(`./api/controllers/server/${videoName}`).pipe(writestream);

  readStream.on('error', function (err) {
    console.log('An error occurred!', err);
    throw err;
  });
  writestream.on('close', (file) => {
    User.findOne({username})
    .exec()
    .then(user => {
      console.log(videoName); 
      const newVideo = {videoID: writestream.id, videoName: videoName }
      user.videoList.push(newVideo)
      user.save()
      .then(() => {
        const videoListItem = new Video({videoId: writestream.id, videoName: videoName, userName: username});
        videoListItem
          .save()
          .then(() => { 
            fs.unlink(`./api/controllers/server/${videoName}`, err => {
              if (err) throw err;
              console.log('file deleted!')
            });
            res.writeHead(301, {Location: `http://localhost:3000/my_channel/${username}`})
            res.end();
          })
          .catch(err => {
            res.json({ error: err.message });
          })
      })
      .catch(err => {
        res.json({ error: err.message });
      });
    });
  });
};

const getVideoList = (req, res) => {

  const { username } = req.params;

  User.findOne({username})
    .exec()
    .then(video => {
      res.json(video)
    })
    .catch(err => {
      res.status(SERVER_ERROR_STATUS).json({ error: err.message});
    });
};

const streamVideo = (req, res) => {
  const connection = mongoose.connection;
  gridfs.mongo = mongoose.mongo;
  const gfs = gridfs(connection.db);

  // Check file exist on MongoDB
  const { videoID } = req.params;
  Video.findOne({videoId: videoID})
  
    .then((data) => {
      console.log(data.videoName)
      gfs.exist({filename: data.videoName}, (err, file) => {
        if (err || !file) {
            res.send('File Not Found');
        } else {
          let readStream = gfs.createReadStream({ _id: videoID });
          // console.log(readStream);
          //res.json(readStream);
          // console.log(res);
           readStream.pipe(res);
        }
      });
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json({ error: err.message});
    })
} 

const getVideoInfo = (req, res) => {
    // Check file exist on MongoDB
    const { videoID } = req.params;
    Video.findOne({videoId: videoID})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json({ error: err.message});
    })
}

module.exports = {
  getVideoList,
  uploadVideo, 
  streamVideo,
  getVideoInfo
}