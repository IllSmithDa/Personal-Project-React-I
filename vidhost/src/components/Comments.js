import React from 'react';
import { connect } from 'react-redux';
import ReportComment from './ReportComment'

const Comments = (props) => {
    const comments = props.comments.map((comment, i) => 
    <ReportComment comment = {comment} key = {i} index = {i} />);
    return (
        <ul>
            { comments }
        </ul>   
    );
}
const mapStateToProps = (state) => {
    return {
        comments: state.comments
    };
};

export default connect(mapStateToProps)(Comments);