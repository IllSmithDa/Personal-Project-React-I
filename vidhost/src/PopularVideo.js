import React from 'react';
import { Link } from 'react-router-dom';
const PopularVideo = (props) => {
    const post = props.post;
    return (
        <div key = {post.id} className = "HomePage-key"> 
            <div className = "HomePage-div">
                <Link to = "/player">
                <img src = {post.image_source} className = "HomePage-videoImage" alt = ''/>
                </Link>
                <Link to = "./player" className  = "HomePage-videoName"> {post.videoname} </Link>
                <div>
                    <p2 className = "HomePage-channelName"> {post.channel_name}</p2> <br/>
                    <p3 className = "HomePage-viewerCount"> {post.viewer_count} </p3>
                </div>
            </div>
        </div>
    );
}
export default PopularVideo;