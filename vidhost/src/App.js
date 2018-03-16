import React, { Component } from 'react';
import './HomePage.css';
import VideoLists from './components/VideoLists';
import RealVideoPlayer from './components/RealVideoPlayer';
import HomeTab from './components/HomeTab'
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <HomeTab/>
        <h2> Most Popular Videos </h2>    
        <VideoLists/> 
      </div>
    );
  }
}
export default App;