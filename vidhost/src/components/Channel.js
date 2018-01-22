import React, { Component } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import { read } from 'fs';
import './CSS/ModalBox.css'
export default class Channel extends Component {
  constructor() {
    super();
    this.state = {  
      username: '',
      profilePictureUrl:'',
      uploadImageUrl: '',
      uploadVideoUrl: '',
      channeVideoList: []
    }
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.handleFilePath = this.handleFilePath.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    //zthis.getProfilePicture = this.getProfilePicture.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  handleFilePath(e) {
    let file = e.target.defaultValue
  }; 
  uploadPhoto(e) {/*
    e.preventDefault();
    const newPhoto = { fileData: this.state.fileData };
    console.log(newPhoto)
    axios.post('http://localhost:5000/media_create', newPhoto)
    .then(() =>{
      let getId = window.location.href;
      getId = getId.split("/").pop();
      axios.get(`http://localhost:5000/show_profile_pic/${getId}`)
      .then((data) => {
        let newData = data.data;
        let newString = `data:image/png;base64, ${newData}`;
        newString = newString.replace(/\s/g, "");
        this.setState({profilePictureUrl: newString})
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    });
    */
  };

  componentDidMount() {
    // grabs the current url
    let getId = window.location.href;
    // grabs username inside current url 
    getId = getId.split("/").pop();
    // two urls which will later make requests to
    let profileUrl = `http://localhost:5000/upload_profile_pic/${getId}`;
    let videoUrl = `http://localhost:5000/upload_video/${getId}`;
    this.setState({ username: getId, uploadImageUrl: profileUrl, uploadVideoUrl: videoUrl });
  
    // request to grab the profile picture id from the server database
    axios.get(`http://localhost:5000/show_profile_pic/${getId}`)
      .then((data) => {
        // grab the encoded data, decode it and set it as the picture url 
        let newData = data.data;
        let newString = `data:image/png;base64, ${newData}`;
        newString = newString.replace(/\s/g, "");
        this.setState({profilePictureUrl: newString})
      })
      .catch(err => {
        console.log(err);
      })
  }
  openModal() {
    console.log(this.state.uploadUrl)
    console.log(this.state.uploadVideoUrl)
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
        <h1>{this.state.username} Channel</h1>
        <div>
          <div>
          <img src = {this.state.profilePictureUrl} alt="profile_picture" width = '128' height = '128'/>
            <button id="myBtn" onClick={this.openModal}>Update Profile Picture</button>
          </div>
          <div id="myModal" className="modal">
            <div class="modal-content">
              <span class="close" onClick={this.closeModal}>&times;</span>
              <h1>Upload New Profile Picture Here</h1>
              <form ref='uploadForm' 
                id='uploadForm' 
                action= {this.state.uploadImageUrl}
                method='post' 
                encType="multipart/form-data">
                <input type="file" name="sampleFile" />
                <input type='submit' value='Upload!'/>
              </form> 
            </div>
          </div>
        </div>
        <div>
          <h1> List of Videos </h1>
            <button id="myBtn2" onClick={this.openModal2}> Upload Video </button>
            <div id="myModal2" className="modal">
              <div class="modal-content">
                <span class="close" onClick={this.closeModal2}>&times;</span>
                <h1>Upload New Video Here</h1>
                <form ref='uploadForm' 
                  id='uploadForm' 
                  action= {this.state.uploadVideoUrl}
                  method='post' 
                  encType="multipart/form-data">
                  <input type="file" name="sampleFile2" />
                  <input type='submit' value='Upload Video'/>
                </form> 
              </div>
            </div>
          </div>
      </div>
    )
  }

} 