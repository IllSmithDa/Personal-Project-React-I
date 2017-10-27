import React from 'react';

const PopularVideo = (props) => {

    return (
        <div className = "HomePage-container"> 
            {props.popularVid.map((video) => {
                return(
                    <div key = {video.id} className = "HomePage-key"> 
                        <div className = "HomePage-div">
                            <img src = {video.image_source} className = "HomePage-videoImage" alt = ''/>
                            <p1 className  = "HomePage-videoName"> {video.video_name} </p1>
                            <div>
                                <p2 className = "HomePage-channelName"> {video.channel_name}</p2> <br/>
                                <p3 className = "HomePage-viewerCount"> {video.viewer_count} </p3>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
export default PopularVideo;