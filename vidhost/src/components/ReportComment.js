import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reportComment } from '../actions';
import './CSS/CommentSection.css'

class ReportComment extends Component {
    reportComment() {
        this.props.reportComment(this.props.index);
    }

    render() {
        return(
            <li class = "CommentSection-checkbox">
                <input type = "checkbox" onChange = {this.reportComment.bind(this)} />
                {this.props.comment.value}
            </li>
        );
    }
}

export default connect(null, { reportComment })(ReportComment);