import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;
export default class CommentLIst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      comments: []
    }
  }

  componentDidMount() {
   // grabs the current url
   let getId = window.location.href;
   // grabs username inside current url 
   getId = getId.split("/").pop();
   axios.get(`http://localhost:5000/videoInfo/${getId}`)
     .then(data => {
       for (let i = 0; i <data.data.comments.length; i++) {
         console.log(data.data.comments[i]);
         this.state.comments.push(data.data.comments[i]);
        // console.log(data.data.comments[i].comment)
       }

        //window.location = window.location.href;
        axios.get('http://localhost:5000/get_username')
        .then(data => {
          this.setState({ username: data.data});
          console.log(this.state.username);;
        })
        .catch(err => {
          console.log(err);
        })
     })
     .catch(err => {
       console.log(err);
     })

     
  };

  // grab video data and pass it to the next component which is RealVideo Player 
  render() {
    return(
      <div>
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