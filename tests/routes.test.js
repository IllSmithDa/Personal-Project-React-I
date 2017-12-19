const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
const server = require('../server')

chai.use(chaiHTTP);
mongoose.connect('mongodb://localhost/video_test', { useMongoClient: true });
describe(('videos'), () => {
  describe(`[Get] '/list_videos`, () => {
    it('should return a list of videos', () => {
      chai
        .request(server)
        .get('/list_videos')
        .end((err, res) => {
          expect(res.status).to.equal(200);
        })
    });
  });
});