import React, { Component } from 'react';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {

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
  }

  render() {
    return (
      <div>
       <textarea onChange = {this.handleTextChange}></textarea>
       <button onClick={this.addComment}>submit</button>
      </div>
    )
  }
}

export default CommentBox;