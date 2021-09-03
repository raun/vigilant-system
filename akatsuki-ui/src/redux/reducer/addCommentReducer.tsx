import { CREATE_COMMENT_ERROR, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_REQUEST } from "../constant";

interface CommentData {
  loading: boolean;
  comment: string;
  error?: string
}

const intialCommentData: CommentData = {
  loading: false,
  comment: ''
}

export default (state: CommentData = intialCommentData, action): CommentData => {
  switch(action.type) {
    case CREATE_COMMENT_REQUEST: 
      return { ...state, loading: true }
    case CREATE_COMMENT_SUCCESS: {
      return { ...state, loading: false}
    }
    case CREATE_COMMENT_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}