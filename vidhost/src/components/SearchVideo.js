
import React, { Component } from 'react';

class SearchBar extends Component {

	constructor () {
		super();
		this.state = {
			searchItem : ''
		}
		this.findVideo = this.findVideo.bind(this);
	}

	componentDidMount() {
		
	}
	findVideo(event) {
		this.state.searchItem = this.event.value;
	}
	submitFilter = (event) => {
	  const criterion = this.input.value;
	  this.props.filterPosts(criterion);
	}

	render() {
		return (
			<div className="SearchBar">
				<input className="SearchBar-field" type="text" onChange={this.findVideo} ref={input => this.input = input} placeholder="Search"></input>
			</div>
		);
	}
};

export default SearchBar;