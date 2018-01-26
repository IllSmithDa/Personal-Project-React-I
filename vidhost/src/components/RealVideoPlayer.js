import React, { Component } from 'react';
import CommentsForm from './CommentsForm';
import Comments from './Comments';
import HomeTab from './HomeTab';
class RealVideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      videoName: '',
      videoData: '',
      videoComments:''
    }
  }


  render() {
      return(
      <div>
          <HomeTab/>
          <video width = "800" height = "600" controls>
              <source src = { require("../Assets/VTest1.mp4")} type="video/mp4"/>
          </video>
          <CommentsForm/>
          <Comments/>
      </div>
      );
  }
}

export default RealVideoPlayer;