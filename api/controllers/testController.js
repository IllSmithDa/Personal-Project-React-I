const SERVER_STATUS_ERROR = 500;
const USER_STATUS_ERROR = 422;
const gridfs = require('gridfs-stream');
const db_filename = "demo.jpg";
const local_file = "./api/controllers/test.jpg";
const mongoose = require('mongoose');
const TestModel = require('../models/testModel')



const createMedia = (req, res) => {
 // gridfs.mongo = mongoose.mongo;
  //const connection = mongoose.connection;
 // const gfs = gridfs(connection.db);
  
  const { fileData } = req.body;
  console.log(fileData);

  const newTest = new TestModel({ imageData: fileData });
  
  newTest
    .save()
    .then(test => {

      res.json({success: true})
    })
    .catch(err => {
      console.log(err);
      return;
    })
    

    /*
  let writestream = gfs.createWriteStream({ filename: db_filename });
  let readStream = gfs.createReadStream(fileData).pipe(writestream)
  
  readStream.on('error', function (err) {
    console.log('An error occurred!', err);
    throw err;
  });
  
  console.log(readStream);
  readStream.pipe(writestream);
  
  writestream.on('close', (file) => {
    res.send('File Created : ' + file.filename);
  });
  */
}
const getMedia = (req, res) => {
  TestModel
    .find({})
    .select('imageData')
    .exec()
    .then(media => {
      res.json(media)
    })
    .catch(err => {
      res.json({ error: err.message });
    });
};


module.exports = {
  createMedia,
  getMedia
}