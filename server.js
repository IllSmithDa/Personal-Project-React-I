
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gridfs = require('gridfs-stream');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const db_filename = "demo1.jpg";
const local_file = "./test.jpg";

const server = express();
const routes = require('./api/routes/routes')
const port = 5000;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vidhost_users', { useMongoClient: true });

server.use(bodyParser.json());
server.use(cors());
server.use(fileUpload());
gridfs.mongo = mongoose.mongo;
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  routes(server);
});
server.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

module.exports = { server };