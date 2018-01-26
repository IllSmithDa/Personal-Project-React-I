const gridfs = require('gridfs-stream');
const db_filename = "test1.png";
const local_file = "./api/controllers/test.jpg";
const mongoose = require('mongoose');
const User = require('../models/userModel');
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
  // console.log(req);
  
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`./api/controllers/server/${sampleFile.name}`, function(err) {
    if (err) return res.status(500).send(err);
  });
 
  let writestream = gfs.createWriteStream({ filename: sampleFile.name });

  let readStream = fs.createReadStream(`./api/controllers/server/${sampleFile.name}`).pipe(writestream)
  
  fs.unlink(`./api/controllers/server/${sampleFile.name}`, err => {
    if (err) throw err;
    console.log('file deleted!')
  });

  readStream.on('error', function (err) {
    console.log('An error occurred!', err);
    throw err;
  });
  writestream.on('close', (file) => {
    const { username } = req.params;
    User.findOne({username})
    .exec()
    .then(user => {
      // console.log(user) 
      let newVideo = {videoID: writestream.id, videoName: writestream.name }
      user.videoList.push(newVideo)
      user.save()
      .then(() => {
        res.writeHead(301, {Location: `http://localhost:3000/my_channel/${username}`})
        res.end();
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

module.exports = {
  getVideoList,
  uploadVideo
}