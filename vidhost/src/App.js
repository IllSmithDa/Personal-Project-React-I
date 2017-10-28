import React, { Component } from 'react';
import './App.css';
import './HomePage.css';
import VideoList from './VideoList';
import PopularVideo from './PopularVideo';
import SearchBar from './SearchBar';

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
      const filteredPosts = this.state.arrPopVideo.filter((post) => {
        post.video_name.includes(criterion);
        this.setState({displayedPosts:filteredPosts})
      });
      
    }
  }
  render() {
    return (
      <div>
        <div className = "HomePage__header">
        <h1 > Vidhost</h1>  
        <div className = "HomePage__header-search">
        <SearchBar post = {this.state.displayedPosts} filterPosts = {this.filterPosts}/>
        </div>
        <h1> Login </h1>
          </div>

        <br></br>
        <label htmlFor = "username"> Username/Email </label>
        <br></br>
        <input type = "text" id = "username"/>
        <br></br>
        <br></br>
        <label htmlFor = "password"> Password </label>
        <br></br>
        <input type = "text" id = "password"/>
        <br></br>
        <br></br>
        <button> Submit </button>
        <br/> <br/>
        <h2 className  = "HomePage__header"> Most Popular Videos </h2> 
        <br></br>
        <div>
            <PopularVideo popularVid = {this.state.arrPopVideo} />
        </div>
      </div>
    );
  }
}

export default App;
