import React, { Component } from 'react';
import './App.css';
import './HomePage.css';
import VideoList from './VideoList';
import PopularVideo from './PopularVideo';
import SearchBar from './SearchBar';
import CommentsForm from './components/CommentsForm'
import Comments from './components/Comments'
import VideoLists from './components/VideoLists';

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
        <div className  = "HomePage__Tabs">
          <h2> Most Popular Videos </h2> 
        </div>
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