import React, { Component} from 'react';
import { Link } from 'react-router-dom';

class HomeTab extends Component {
    
    render(){
        return(
              <div className = "HomePage__header">
                <div className = "HomePage__header-title">
                  <Link to = "/">
                  <h1 > Vidhost</h1>
                  </Link>  
                </div>
                <div className = "HomePage__header-search">
                <input/>
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