import React, { Component } from 'react';
import axios from 'axios';
import { setTimeout } from 'timers';

export default class LoginMenu extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleSetUsername = this.handleSetUsername.bind(this);
    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.loginUser = this.loginUser.bind(this)
  }
  handleSetUsername(e) {
    this.setState({ username: e.target.value })
  }
  handleSetPassword(e) {
    this.setState({ password: e.target.value })
  }
  loginUser(e) {
    e.preventDefault();
    const user = { username: this.state.username, password: this.state.password };
    axios.post('http://localhost:5000/find_user', user)
    .then(data => {
      setTimeout(() => {
        window.location = `/my_channel/${this.state.username}`;
      })
    })
    .catch(err => {
      console.log(err);
    });
  };
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="name" className="form-control" id="name" value = { this.state.username } onChange = { this.handleSetUsername }/>
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input type="password" className="form-control" id="pwd" value = { this.state.password } onChange = { this.handleSetPassword }/>
        </div>
        <div className="checkbox">
          <label><input type="checkbox"/> Remember me</label>
        </div>
        <button type="submit" className="btn btn-default" onClick = { this.loginUser }>Submit</button>
      </div>
    )  
  }
}