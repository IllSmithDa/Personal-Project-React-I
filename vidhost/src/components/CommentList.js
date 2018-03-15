import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;
export default class CommentLIst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      comments: [],
      comment: '',
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addComment = this.addComment.bind(this);
  }
  componentDidMount() {
    // grabs the current url
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();
    // window.location = window.location.href;
    console.log('hello')
    axios.get('http://localhost:5000/get_username')
      .then(data => {
        this.setState({ username: data.data});
        // console.log(this.state.username);
      })
      .catch(err => {
        console.log(err);
      })
    axios.get(`http://localhost:5000/videoInfo/${getId}`)
      .then(data => {
        console.log(data.data)
         for (let i = 0; i <data.data.comments.length; i++) {
           // console.log(data.data.comments[i]);
           console.log(data.data.comments[i])
           this.state.comments.push(data.data.comments[i]);
           // console.log(data.data.comments[i].comment)
         }
      })
      .catch(err => {
        console.log(err);
      })
  };
  addComment() {
    // to do 
    // make a request to post the comment to the database and then create 
    // a new class where it will read the comment from database onto the video itself.
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();

    const comment = { comment: this.state.comment, username: this.state.username }
    console.log(comment);
    axios.post(`http://localhost:5000/addComment/${getId}`, comment)
      .then(data => {
        console.log(data)
        let videoComments = [];
        for (let i = 0; i < data.data.length; i++){
          console.log(data.data[i])
        //  let videoObject = {commentUsername: data.data.comments[i].username, comment: data.data.comments[i].comment};
          videoComments.push(data.data[i]);
        }
        this.setState({ comments: videoComments });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleTextChange(e) {
    let comment = e.target.value;
    this.setState({ comment: comment});
    console.log(this.state.comment)
  }
  // grab video data and pass it to the next component which is RealVideo Player 
  render() {
    return(
      <div>
        <textarea onChange = {this.handleTextChange} placeholder = "Add comment here"></textarea>
        <button onClick={this.addComment}>submit</button>
        {this.state.comments.map((post, index)=> {
          return(
            <div>
              <p1>{post.username}: {post.comment}</p1>
            </div>
          )
        })}
      </div>
    );
  }
}