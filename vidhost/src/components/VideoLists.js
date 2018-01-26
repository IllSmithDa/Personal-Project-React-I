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
          {videoName: '',
          videoPreviewImg:'',
          }
        ]
      }
  }
    componentDidMount() {
        console.log(VideoList);
        this.props.getVideo(VideoList);
    }

    render() {
        return (
            <div className = "HomePage-container">
                {this.props.videos.map((post) => {
                    return (
                        <div key = {post.id} className = "HomePage-key"> 
                            <div className = "HomePage-div">
                                <Link to = '/player'>
                                <img src = {post.image_source} className = "HomePage-videoImage" alt = ''/>
                                </Link>
                                <Link to = '/player' className  = "HomePage-videoName"> {post.videoname} </Link>
                                <div>
                                    <p2 className = "HomePage-channelName"> {post.channel_name}</p2> <br/>
                                    <p3 className = "HomePage-viewerCount"> {post.viewer_count} </p3>
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