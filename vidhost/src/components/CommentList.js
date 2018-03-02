import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class CommentLIst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      comments: []
    }
  }

  componentDidMount() {
   // grabs the current url
   let getId = window.location.href;
   // grabs username inside current url 
   getId = getId.split("/").pop();
    console.log(getId);
   axios.get(`http://localhost:5000/videoInfo/${getId}`)
     .then(data => {
       for (let i = 0; data.data.comments[i]; i++) {
         this.state.comments.push(data.data.comments[i].comment);
         console.log(data.data.comments[i].comment)
       }
        //window.location = window.location.href;
        
     })
     .catch(err => {
       console.log(err);
     })

     
  };

  // grab video data and pass it to the next component which is RealVideo Player 
  render() {
    return(
      <div>
        {this.state.comments.map((post)=> {
          return(
            <div>
                <p1>{post}</p1>
            </div>
          )
        })}
      </div>
    );
  }
}