import React, { Component } from 'react';

class SearchBar extends Component {

    submitFilter = (event) => {
        const criterion = this.input.value;
        this.props.filterPosts(criterion);
    }
    render() {
        return(
            <div className="SearchBar">  
                <input/> <button onClick = {this.submitFilter} ref = {input => this.input = input}> search </button> 
            </div>
        );
    }
}
export default SearchBar;
// <input/> <button onClick = {this.submitFilter} ref = {input => this.input = input}> search </button> 
// <input className="SearchBar-field" type="text" onChange={this.submitFilter} ref={input => this.input = input} placeholder="Search"></input>