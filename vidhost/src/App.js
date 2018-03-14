import React, { Component } from 'react';
import './HomePage.css';
import VideoList from './VideoList';
import PopularVideo from './PopularVideo';
import SearchBar from './SearchBar';
import VideoLists from './components/VideoLists';
import RealVideoPlayer from './components/RealVideoPlayer';
import HomeTab from './components/HomeTab'
import { Link } from 'react-router-dom';

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
            <Link to = "/"><h1> <img src = {require("../src/Assets/play.png")} width = "25px" height= "25px"/>Vidhost</h1> </Link>  
          </div>
          <div className = "HomePage__header-search">
            <SearchBar posts = {this.state.displayedPosts} filterPosts = {this.filterPosts}/>
          </div>
          <Link to = "/new-user">
            <div className = "HomePage_header-un">
              <h1> Click here to create new account </h1>
            </div>
          </Link>
          <Link to = "/login">
            <div className = "HomePage_header-un">
              <h1> Click here to Login </h1>
            </div>
          </Link>
          <div className = "HomePage-login">
          </div>
        </div>
        <div className  = "HomePage__Tabs">
          <h2> Most Popular Videos </h2> 
        </div>
       
        <VideoLists/> 
        
      </div>
    );
  }
}

export default App;

//  <PopularVideo popularVid = {this.state.arrPopVideo} />