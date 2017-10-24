import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor () {
    super();
    this.username = '';
    this.password = '';   
  }

  render() {
    return (
      <div>
        <h1> Vidhost</h1>
        <br></br>
        <label for = "username"> Username/Email: </label>
        <input type = "text" id = "username"/>
        <br></br>
        <br></br>
        <label for = "password"> Password: </label>
        <input type = "text" id = "password"/>
      </div>
    );
  }
}

export default App;
