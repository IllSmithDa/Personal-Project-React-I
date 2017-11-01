import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions';
class CommentsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newComment: ''
        };
        this.addComment = this.addComment.bind(this);
        this.updateComments = this.updateComments.bind(this);
    }
    addComment(event) {
        event.preventDefault();
        this.props.addComment({
            value: this.state.newComment
        });
        this.setState({
            newComment: ''
        });
    }
    updateComments(event) {
        this.setState({
            newComment: event.target.value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit = {this.addComment}>
                    <input
                        onChange = {this.updateComments}
                        placeholder = "Add comment here"
                        value = {this.state.newComment}
                    />
                </form>
            </div>
        );
    }
}

export default connect(null, {addComment})(CommentsForm);