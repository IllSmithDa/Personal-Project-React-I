import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVideo } from '../actions';
import VideoList from '../VideoList';
import { Link } from 'react-router-dom';
import axios from 'axios';
class VideoLists extends Component {
  constructor() {
      super();
      this.state = {
        videoObject: [
          {
          videoName: '',
          videoPreviewImg:'',
          },
        ],
        videoList: [],
      }
  }
    componentDidMount() {
    //  console.log(VideoList);
      this.props.getVideo(VideoList);
        axios.get('http://localhost:5000/getAllVideos')
          .then(data => {  
            let videoList = []
            for (let i = 0; i < data.data.length; i++) {
                videoList.push(data.data[i])
            }
           // console.log(videoList);
            this.setState({videoList: videoList})
            console.log(this.state.videoList);
          })
          .catch(err => {
              console.log(err);
          })
    }

    render() {
        return (
            <div className = "HomePage-container">
                {this.state.videoList.map((post) => {
                    return (
                        <div key = {post.id} className = "HomePage-key"> 
                            <div className = "HomePage-div"> 
                              <Link to = {`/video_player/${post.videoID}`}>
                              <img src = {post.videoThumbnail} alt="thumbnail_photo" width = '200' height = '150'/>
                              </Link>
                              <Link to = '/player' className  = "HomePage-videoName"> {post.videoName} </Link>
                              <div>
                                <p2 className = "HomePage-channelName"> channel: {post.userName}</p2> <br/>      
                              </div>
                            </div>
                       </div>
                    ); 
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        videos: state.videos
    }
}

export default connect(mapStateToProps, { getVideo })(VideoLists);
/*
 <div className = "HomePage-container">
                {this.state.videoList.map((post) => {
                    return (
                        <div key = {post.id} className = "HomePage-key"> 
                            <div className = "HomePage-div">
                                <Link to = '/player'>
                                <img src = {post.image_source} className = "HomePage-videoImage" alt = ''/>
                                </Link>
                                <Link to = '/player' className  = "HomePage-videoName"> {post.videoname} </Link>
                                <div>
                                    <p2 className = "HomePage-channelName"> {post.channel_name}</p2> <br/>
                                   
                                </div>
                            </div>
                        </div>
                    ); 
                })}
            </div>
            */