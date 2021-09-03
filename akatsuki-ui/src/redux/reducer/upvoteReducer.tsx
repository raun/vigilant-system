import { UPVOTE_ERROR, UPVOTE_REQUEST, UPVOTE_SUCCESS } from "../constant";

export interface Upvote {
  loading: boolean;
  totalUpvote: number;
  error?: string
}

const intialValues: Upvote = {
  loading: false,
  totalUpvote: 0
}

export default (state: Upvote = intialValues, action: any): Upvote => {
  switch(action.type) {
    case UPVOTE_REQUEST: 
      return { ...state, loading: true }
    case UPVOTE_SUCCESS: {
      return { ...state, totalUpvote: action.payload, loading: false}
    }
    case UPVOTE_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}