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
  }

  componentDidMount() {
    // grabs the current url
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();
    let videoUrl = `http://localhost:5000/video_list/${getId}`;
    axios
      .get(`http://localhost:5000/video_list/${getId}`)
      .then(data => {
        let videoData = data.data.videoList;
        videoData.map((post) => {
          this.state.videoList.push({videoName: post.videoName})
        });
        console.log(this.state.videoList)
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return(
      <div>
        {this.state.videoList.map((post)=> {
          return(
            <div>
              <Link to = "/video_player">
              <h1> {post.videoName} </h1>
              </Link>
            </div>
          )
        })}
      </div>
    );
  }
}