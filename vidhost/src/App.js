import React, { Component } from 'react';
import './App.css';
import './HomePage.css';
import VideoList from './VideoList';
import PopularVideo from './PopularVideo';
import SearchBar from './SearchBar';
import CommentsForm from './components/CommentsForm'
import Comments from './components/Comments'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      arrPopVideo: [],
      displayedPosts: []
    } 

    this.filterPosts = this.filterPosts.bind(this);
  }

  componentDidMount() {
    this.setState({arrPopVideo: VideoList, displayedPosts: VideoList});
  }

  filterPosts(criterion) {
    //if criterion is empty 
    if (criterion === '') {
      this.setState({displayedPosts: this.state.arrPopVideo});
    } else {
      const filteredPosts = this.state.arrPopVideo.filter(post => 
        post.videoname.includes(criterion));
      this.setState({displayedPosts: filteredPosts});
    }
  }
  render() {
    return (
      <div>
        <div className = "HomePage__header">
          <div className = "HomePage__header-title">
            <h1 > Vidhost</h1>  
          </div>
          <div className = "HomePage__header-search">
            <SearchBar posts = {this.state.displayedPosts} filterPosts = {this.filterPosts}/>
          </div>
          <div className = "HomePage_header-un">
            <h1> Login </h1>
          </div>
        </div>

        <label htmlFor = "username"> Username/Email </label>
        <input type = "text" id = "username"/>
        <label htmlFor = "password"> Password </label>
        <input type = "text" id = "password"/>
        <button> Submit </button>

        <h2 className  = "HomePage__header"> Most Popular Videos </h2> 

        <div className = "HomePage-container">
          {this.state.displayedPosts.map((post) => {
            return (
              <div >
                <PopularVideo post = {post}/>
                </div>
              );
            })}
        </div>
        <CommentsForm/>
        <Comments/>
      </div>
    );
  }
}

export default App;

//  <PopularVideo popularVid = {this.state.arrPopVideo} />