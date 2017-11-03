import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVideo } from '../actions';

class VideoLists extends Component {
    componentDidMount() {
        this.props.getVideo();
    }

    render() {
        return (
            <div className = "HomePage-container">
                {this.props.videos.map((post) => {
                    return (
                        <div key = {post.id} className = "HomePage-key"> 
                            <div className = "HomePage-div">
                                <img src = {post.image_source} className = "HomePage-videoImage" alt = ''/>
                                <p1 className  = "HomePage-videoName"> {post.videoname} </p1>
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

export default connect(null, { getVideo })(VideoLists);