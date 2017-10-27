import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './HomePage.css';
import VideoList from './VideoList';
import PopularVideo from './PopularVideo';

class App extends Component {
  constructor () {
    super();
    this.state = {
      arrPopVideo: []
    } 
  }

  componentDidMount() {
    this.setState({arrPopVideo: VideoList});
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
        <br/> <br/>
        <input/> <tab/>
        <button> Search </button>
        <h2 class = "HomePage__header"> Most Popular Videos </h2> 
        <br></br>
        <div>
            <PopularVideo popularVid = {this.state.arrPopVideo} />
        </div>
      </body>
    );
  }
}

export default App;
