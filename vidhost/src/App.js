import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './HomePage.css';

class App extends Component {
  constructor () {
    super();
    this.username = '';
    this.password = '';   
  }

  render() {
    return (
      <body>
        <h1 class = "HomePage__header"> Vidhost</h1>
        <br></br>
        <label for = "username"> Username/Email </label>
        <br></br>
        <input type = "text" id = "username"/>
        <br></br>
        <br></br>
        <label for = "password"> Password </label>
        <br></br>
        <input type = "text" id = "password"/>
        <br></br>
        <br></br>
        <button> Submit </button>
        <h2 class = "HomePage__header"> Most Popular Videos </h2> 
        <br></br>
        <div>
        <img src = {require('./test.jpg')} width = "200" height = "200" alt = ""/>
        <br/>
        <p2 > Gold PS4 Unboxing!!! </p2>
        </div>
        <img src = {require('./test2.jpg')} class = "App-right" width = "200" height = "200" alt = ""/> <tab/>
        <img src = {require('./GiantDot.png')} width = "200" height = "200" alt = ""/> <tab/>
        <img src = {require('./Planet1.png')} width = "200" height = "200" alt = ""/> <tab/>
        <img src = {require('./Ship1.png')} width = "200" height = "200" alt = ""/> <tab/>
        <img src = {require('./ground1.png')} width = "200" height = "200" alt = ""/> <tab/>
        <img src = {require('./grass1.png')} width = "200" height = "200" alt = ""/> <tab/>
        <img src = {require('./test3.png')} width = "200" height = "200" alt = ""/> <tab/>
        <img src = {require('./tower1.png')} width = "200" height = "200" alt = ""/> <tab/>
      </body>
    );
  }
}

export default App;
