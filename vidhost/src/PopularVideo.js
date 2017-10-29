import React from 'react';

const PopularVideo = (props) => {
    const post = props.post;
    return (
        <div className = "HomePage-container"> 
            <div key = {post.id} className = "HomePage-key"> 
                    <div className = "HomePage-div">
                        <img src = {post.image_source} className = "HomePage-videoImage" alt = ''/>
                        <p1 className  = "HomePage-videoName"> {post.video_name} </p1>
                    <div>
                        <p2 className = "HomePage-channelName"> {post.channel_name}</p2> <br/>
                        <p3 className = "HomePage-viewerCount"> {post.viewer_count} </p3>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PopularVideo;