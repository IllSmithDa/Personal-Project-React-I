import React, { Component } from 'react';
import CommentsForm from './CommentsForm';
import Comments from './Comments';
import HomeTab from './HomeTab';
import ListOfVideos from './ListOfVideos';
import axios from 'axios';
class RealVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoName: '',
      videoID:'',
      videoUploader:'',
      videoData: '',
      videoComments:''
    }
  }
  componentDidMount() {
   // console.log('hello');
    // grabs the current url
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();
     console.log(getId);
    axios.get(`http://localhost:5000/streamVideo/${getId}`)
      .then(data => {
        this.setState({videoID: getId, videoName: data.data.videoName, 
        videoUploader: data.data.userName
        });
      })
      .catch(err => {
        console.log(err);
      })

   // this.setState({ videoName: this.props.getVideoName, videoID: this.props.getVideoID });
   //  console.log(this.state.videoName, this.state.videoID);
  }

  render() {
      return(
      <div>
          <HomeTab/>
          <h1>{this.state.videoName}</h1>
          <h2> {this.state.videoUploader} </h2>
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