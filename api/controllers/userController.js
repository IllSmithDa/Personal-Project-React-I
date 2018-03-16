// const mongoose = require('mongoose');
const User = require('../models/userModel');

// add more requests status
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
  const { username, password } = req.body;
  User.findOne({username, password})
    .exec()
    .then((user) => { 
      
      if (user === null) {
        res.status(422).json({error: err.message})
      }
      req.session.username = username;
      res.json({success: true});
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json(err);
      return;
    });
};
const getUserName = (req, res) => {
  const { username } = req.session;
  res.json(req.session.username);
};
const logout = (req, res) => {
  req.session.destroy();
  //req.session.username = undefined;
  res.json(req.session)
}
module.exports = {
  createUser,
  findUser,
  getUserName,
  logout
};