import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchVideo';
import VideoList from '../VideoList';
class HomeTab extends Component {
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

    render(){
        return(
              <div className = "HomePage__header">
                <div className = "HomePage__header-title">
                  <Link to = "/">
                  <h1 > <img src = {require("./Assets/play.png")} width = "25px" height = "25px"/>Vidhost</h1>
                  </Link>  
                </div>
                <div className = "HomePage__header-search">
                <SearchBar posts = {this.state.displayedPosts} filterPosts = {this.filterPosts}/>
              </div>
              <div className = "HomePage_header-un">
                <h1> Login </h1>
              </div>
              <div className = "HomePage-login">
                <div>
                  <label htmlFor = "username"> Username/Email </label>
                  <input type = "text" id = "username"/>
                </div>
                <div  className = "HomePage-Password">
                  <label htmlFor = "password"> Password </label>
                  <input type = "text" id = "password"/>
                </div>
                <div className = "HomePage__Login-Submit">
                  <button className = "HomePage__Login-SubButton"> Submit </button>
                </div>
              </div>
            </div>
        );
    }
}

export default HomeTab;