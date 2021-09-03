import { GET_ALL_COMMENT_ERROR, GET_ALL_COMMENT_REQUEST, GET_ALL_COMMENT_SUCCESS } from "../constant";

export interface Comments {
  loading: boolean;
  comments: any[];
  error?: string
}

const intialComments: Comments = {
  loading: false,
  comments: []
}

export default (state: Comments = intialComments, action): Comments => {
  switch(action.type) {
    case GET_ALL_COMMENT_REQUEST: 
      return { ...state, loading: true }
    case GET_ALL_COMMENT_SUCCESS: {
      return { ...state, comments: action.payload, loading: false}
    }
    case GET_ALL_COMMENT_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}