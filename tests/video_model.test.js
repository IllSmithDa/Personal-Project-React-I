const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const { expect }  = chai;

const Video = require('../api/models/videoModels');
mongoose.Promise = global.Promise;

describe('Video', () => {
  beforeEach(() => {

  });

  describe('getVideoName()', () => {
    it('should return the video name', () => {
      const newVideo = new Video({
        image_source: '/video1', 
        video_name: 'The Dark Tower p1'
      });
      expect(newVideo.getVideoName()).to.equal('The Dark Tower p1');
    });
  });
});