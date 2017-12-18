const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();
const routes = require('./api/routes/routes')
const port = 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/video-list', { useMongoClient: true });

server.use(bodyParser.json());
server.use(cors());
routes(server);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});


module.exports = { server };