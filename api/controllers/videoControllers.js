const gridfs = require('gridfs-stream');
const ffmpeg = require('fluent-ffmpeg');
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
  console.log(req.files.video_file.poster)
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
  
  // capture thumbnail for our video using the ffmpeg library
  /*
  let proc = new ffmpeg(`./api/controllers/server/${videoName}`)
  .takeScreenshots({
      count: 1,
      timemarks: [ '5' ] // number of seconds
    }, './api/controllers/server/thumbnails', function(err) {
    console.log('screenshots were saved')    
  })'*/
 
ffmpeg(`./api/controllers/server/${videoName}`)
.on('end', function() {
  console.log('Screenshots taken');
  let writestream2 = gfs.createWriteStream({ filename: 'tn.png' });
  let readstream2 = fs.createReadStream(`./api/controllers/server/thumbnails/tn.png`).pipe(writestream2);
  fs.unlink(`./api/controllers/server/thumbnails/tn.png`, err => {
    if (err) throw err;
   //console.log('file deleted!')
  });
  writestream2.on('close', (file) => {
    let data = '';
    let readstream3 = gfs .createReadStream({_id: writestream2.id});
    readstream3.setEncoding('base64');
    readstream3.on('data', (chunk) => {
      data += chunk;
    })

    
    readstream3.on('end' , () => {
      let newString = `data:image/png;base64, ${data}`;
      newString = newString.replace(/\s/g, "");
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
          //console.log(videoName); 
          const newVideo = {videoID: writestream.id, videoName: videoName, videoThumbnail: newString}
          user.videoList.push(newVideo)
          user.save()
          .then(() => {
            const videoListItem = new Video({videoID: writestream.id, videoName: videoName, userName: username, videoThumbnail: newString});
            videoListItem
              .save()
              .then(() => { 
                fs.unlink(`./api/controllers/server/${videoName}`, err => {
                  if (err) throw err;
                 //console.log('file deleted!')
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
    })
  })
})
.on('error', function(err) {
  console.error(err);
})
.screenshots({
  // Will take screenshots at 20%, 40%, 60% and 80% of the video
  count: 1,
  folder: './api/controllers/server/thumbnails',
  size: '200x150'
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
  Video.findOne({videoID: videoID})
  
    .then((data) => {
    //  console.log(data.videoName)
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
    Video.findOne({videoID: videoID})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json({ error: err.message});
    })
}

const addComment = (req, res) => {
  const {comment, username} = req.body;
  const {videoID} = req.params;
//  const newComment = { comment };
 //s console.log(username)
  Video.findOne({videoID: videoID})
    .then((video) => {
      // alter existing video data maybe using Video.update
      if (video === null) {
        throw new Error();
      }
      const comments = video.comments;
      comments.push({comment: comment, username: username});
      video
        .save()
        .then((data) => {
          // return data back to the client side
          res.json(data);
        })
        .catch((err) => {
          res.json({ error: err.message });
        });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};
const deleteVideo = (req, res) => {
  const {username} = req.body;
  const {videoID} = req.params;   
}
const getAllVideos = (req, res) => {
  Video.find({})
    .then(data => {
      // console.log(data)
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(422).json({ error: err.message });
    });
};

module.exports = {
  getVideoList,
  uploadVideo, 
  streamVideo,
  getVideoInfo,
  addComment,
  deleteVideo,
  getAllVideos
}