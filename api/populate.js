const fs = require('fs');
let savedVideos = null;

const Video = require('./model.js');

const readVideo = () => {
  if (!savedVideos) {
    const contents = fs.readFileSync('Videos.json', 'utf8');
    savedVideos - Json.parse(contents);
  }
  return savedVideos;
}

const populateVideos = () => {
  const allVideos = readVideo();
  const promises = allVideos.map(p => new Video(p).save());
  return Promise.all(promises);
}
module.exports = { readVideo, populateVideos };