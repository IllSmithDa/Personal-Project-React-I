// const mongoose = require('mongoose');
const User = require('../models/userModel');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser
    .save()
    .then((createdUser) => {
      res.json(createdUser);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json(err);
      return;
    });
};
const findUser = (req, res) => {
  console.log(req.session)
  const { username, password } = req.body;
  User.findOne({username, password})
    .exec()
    .then((user) => { 
      
      if (user === null) {
        res.status(422).json({error: err.message})
      }
      req.session.username = username;
      req.session.save();
      console.log(req.session);
      console.log(req.session.id);
      res.json({success: true});
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json(err);
      return;
    });
};
const getUserName = (req, res) => {
  //console.log(req.session.id);
  //console.log(req.session.username)
  const { username } = req.session;
  console.log(username);
  res.json({username: req.session.username});
};
module.exports = {
  createUser,
  findUser,
  getUserName
};