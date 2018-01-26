import React, { Component } from 'react';
import axios from 'axios';

export default class NewAccount extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleSetUsername = this.handleSetUsername.bind(this);
    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  handleSetUsername(e) {
    this.setState({username: e.target.value});
  }
  handleSetPassword(e) {
    this.setState({password: e.target.value});
  }
  createUser(e) {
    const newUser = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(newUser)
    axios
      .post('http://localhost:5000/user_create', newUser)
      .then(data => {
        window.location = `/my_channel/${this.state.username}`;
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return(
      <div>
        <div className="form-group">
          Enter username and password 
          <label htmlFor="name">username:</label>
          <input type="name" className="form-control" id="name" value = { this.state.username } onChange = { this.handleSetUsername }/>
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input type="password" className="form-control" id="pwd" value = { this.state.password } onChange = { this.handleSetPassword }/>
        </div>
        <button type="submit" className="btn btn-default" onClick = { this.createUser }>Submit</button>
      </div>
    )
  }
}