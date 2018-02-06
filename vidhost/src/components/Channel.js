import React, { Component } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import { read } from 'fs';
import './CSS/ModalBox.css'
import ListOfVideos from './ListOfVideos';

export default class Channel extends Component {
  constructor() {
    super();
    this.state = {  
      username: '',
      profilePictureUrl:'',
      uploadImageUrl: '',
      uploadVideoUrl: '',
      videoName:'',
      channeVideoList: []
    }
    this.handleFilePath = this.handleFilePath.bind(this);
    this.setTimer = this.setTimer.bind(this);
    // this.getProfilePicture = this.getProfilePicture.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleVideoName = this.handleVideoName.bind(this);
  }
  handleFilePath(e) {
    let file = e.target.defaultValue
  }; 
  setTimer() {
    window.setTimeout(() => {
      console.log('image loaded')
    }, 5000 )
  };
  handleUploadVideo() {

  }
  componentWillMount() {
    // grabs the current url
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();
    console.log(getId);
    // two urls which will later make requests to
    let profileUrl = `http://localhost:5000/upload_profile_pic/${getId}`;
    let videoUrl = `http://localhost:5000/upload_video/${getId}`;

    this.setState({ username: getId, uploadImageUrl: profileUrl, uploadVideoUrl: videoUrl});  
    // request to grab the profile picture id from the server database
    axios.get(`http://localhost:5000/show_profile_pic/${getId}`)
      .then((data) => { 
        // grab the encoded data, decode it and set it as the picture url 
        let newData = data.data;
 //       console.log('componentMountWillMount was called');
        let newString = `data:image/png;base64, ${newData}`;
        newString = newString.replace(/\s/g, "");
        this.setState({profilePictureUrl: newString});  
      })
      .catch(err => {
        console.log(err);
      })
  
  }
  handleVideoName(e) {
     // grabs the current url
     let getId = window.location.href;
     // grabs username inside current url 
     getId = getId.split("/").pop();

    this.setState({ videoName: e.target.value })
    // let videoName = e.target.value;
    console.log(this.state.videoName);
   // let videoUrl = `http://localhost:5000/upload_video/${getId}/${this.state.videoName}`;
  //  this.setState({ uploadVideoUrl:videoUrl });
  //  console.log(this.state.uploadVideoUrl);
  }
  openModal() {
   // console.log(this.state.profilePictureUrl)
 //  console.log(this.state.uploadVideoUrl)
    let modal = document.getElementById('myModal');
    modal.style.display = "block";
  }
  openModal2() {
    let modal = document.getElementById('myModal2');
    modal.style.display = "block";
  }
  closeModal() {
    let modal = document.getElementById('myModal');
    modal.style.display = "none";
  }
  closeModal2() {
    let modal = document.getElementById('myModal2');
    modal.style.display = "none";
  }
  // tru to render image from the server side
  render() {
    return(
      <div>
        <h1>{this.state.username}'s Channel</h1>
        <div>
          <div>
          <img src = {this.state.profilePictureUrl} alt="profile_picture" width = '128' height = '128'/>
            <button id="myBtn" onClick={this.openModal}>Update Profile Picture</button>
          </div>
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={this.closeModal}>&times;</span>
              <h1>Upload New Profile Picture Here</h1>
              <form ref='uploadForm' 
                id='uploadForm' 
                action= {this.state.uploadImageUrl}
                method='post' 
                encType="multipart/form-data">
                <input type="file" name="profPictureFile" onChange = {this.setTimer}/>
                <input type='submit' value='Upload'/>
              </form> 
            </div>
          </div>
        </div>
        <div>
          <h1> List of Videos </h1>
            <button id="myBtn2" onClick={this.openModal2}> Upload Video </button>
            <div id="myModal2" className="modal">
              <div className="modal-content">
                <span className="close" onClick={this.closeModal2}>&times;</span>
                <h1>Upload New Video Here</h1>
                <form ref='uploadForm' 
                  id='uploadForm' 
                  name = {this.state.videoName}
                  action= {this.state.uploadVideoUrl}
                  method='post' 
                  encType="multipart/form-data"
                  >
                  <h2> {'Enter Video Name: '}
                  <input tupe= 'text' name='videoName' onChange = {this.handleVideoName}/>
                  </h2>
                  <input type="file" name="video_file" onChange = {this.setTimer}/>
                  <input type='submit' value='Upload Video'/>
                </form> 
              </div>
            </div>
          </div>
          <ListOfVideos/>
      </div>
    )
  }
} 

/*
  <form ref='uploadForm' 
                  id='uploadForm' 
                  action= {this.state.uploadVideoUrl}
                  method='post' 
                  encType="multipart/form-data">
                  <input type="file" name="video_file" />
                  <input type='submit' value='Upload Video'/>
                </form> 
            */