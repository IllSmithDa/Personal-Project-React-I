import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ListOfVideos extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      videoList: []
    }
    this.deleteVideo = this.deleteVideo.bind(this);
  }

  componentDidMount() {
    // grabs the current url
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();
    let videoUrl = `http://localhost:5000/video_list/${getId}`;
    console.log(videoUrl)
    axios
      .get(`http://localhost:5000/video_list/${getId}`)
      .then(data => {
        this.setState({ username: getId });
        console.log(this.state.username);
        let videoData = data.data.videoList;
        videoData.map((post) => {
          this.state.videoList.push({videoName: post.videoName, videoID: post.videoID})
        });
      //  console.log(this.state.videoList[0]._id)
      })
      .catch(err => {
        console.log(err);
      });
  };
  deleteVideo(videoId) {
   console.log(videoId);
  }
  // grab video data and pass it to the next component which is RealVideo Player 
  render() {
    return(
      <div>
        {this.state.videoList.map((post)=> {
          return(
            <div>
              <Link to = {`/video_player/${post.videoID}`} getVideoName={post.videoName} username={this.state.username}>
              <h1> {post.videoName} </h1>
               {post.videoID}
              </Link>
               
              <button onClick={this.deleteVideo(post.videoID)}>Delete Video </button>
            </div>
          )
        })}
      </div>
    );
  }
}