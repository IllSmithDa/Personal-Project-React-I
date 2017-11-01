export const ADD_COMMENT = 'ADD_COMMENT';
export const REPORT_COMMENT = 'REPORT_COMMENT';

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    };
}

export const reportComment = (index) => {
    return {
        type: REPORT_COMMENT,
        payload: index
    }
}