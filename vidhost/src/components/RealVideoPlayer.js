import React, { Component } from 'react';
import HomeTab from './HomeTab';
import ListOfVideos from './ListOfVideos';
import CommentList from './CommentList';
import Login from './Login';
import axios from 'axios';
import { Player, BigPlayButton  } from 'video-react';
import './CSS/videoPlayer.css';
import '../../node_modules/video-react/dist/video-react.css' // import css
axios.defaults.withCredentials = true;

class RealVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoName: '',
      videoID:'',
      videoUploader:'',
      videoData: '',
      videoComments:'',
      comments: [],
      comment: '',
      username: '',
    }
  //  this.setState({username: this.props.username})
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addComment = this.addComment.bind(this);
  }
  componentDidMount() {
   // console.log('hello');
    // grabs the current url
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();
    // console.log(getId);
   // console.log(this.props.username)
     axios.get('http://localhost:5000/get_username')
     .then(data => {
        this.setState({ username: data.data})
       // console.log(data.data);
        // console.log(data.data) 
        //console.log(getId)
        axios.get(`http://localhost:5000/videoInfo/${getId}`)
          .then(data => {
          
           // console.log(data.data)  
          this.setState({videoID: getId, videoName: data.data.videoName, 
          videoUploader: data.data.videoUploader
        });
        for (let i = 0; i < data.data.comments.length; i++) {
          // console.log(data.data.comments[i].comment)
          let videoObject = {commentUsername: data.data.comments[i].username, comment: data.data.comments[i].comment};
          this.state.comments.push(videoObject);
        }
        this.state.comments.map((post, index)=> {
      //    console.log(post.comment);
        })
      })
      .catch(err => {
        console.log(err);
      })
     })
     .catch(err => {
       console.log(err);
     })
    

   // this.setState({ videoName: this.props.getVideoName, videoID: this.props.getVideoID });
   //  console.log(this.state.videoName, this.state.videoID);
  }
  setUserName(userName) {
    this.setState({username: userName});
  }
  handleTextChange(e) {
    let comment = e.target.value;
    this.setState({ comment: comment});
    console.log(this.state.comment)
  }
  addComment() {
    // to do 
    // make a request to post the comment to the database and then create 
    // a new class where it will read the comment from database onto the video itself.
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();

    const comment = { comment: this.state.comment, username:this.state.username, videoUploader: this.state.videoUploader }
    axios.post(`http://localhost:5000/addComment/${getId}`, comment)
      .then(data => {
        //console.log(data);
        let videoComments = [];
        for (let i = 0; i < data.data.comments.length; i++){
          // console.log(data.data.comments[i].comment)
          let videoObject = {commentUsername: data.data.comments[i].username, comment: data.data.comments[i].comment};
          videoComments.push(videoObject);
        }
        this.setState({ comments: videoComments });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
      return(
      <div >
          <HomeTab/>
          <h1>{this.state.videoName}</h1>
          <Player
           src={`http://localhost:5000/streamVideo/${this.state.videoID}/${this.state.videoUploader}`}
           className='video-player'
           fluid={false} width={896} height={504}>
            <BigPlayButton position="center" />
           </Player>
           <h2> {this.state.videoUploader} </h2>
           <div>
            <CommentList/>
          </div>
      </div>
      );
  }
}

export default RealVideoPlayer;