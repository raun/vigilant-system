import {
  UPVOTE_CLICK_ERROR, 
  UPVOTE_CLICK_REQUEST, 
  UPVOTE_CLICK_SUCCESS,
  DOWNVOTE_CLICK_ERROR,
  DOWNVOTE_CLICK_REQUEST,
  DOWNVOTE_CLICK_SUCCESS
} from "../constant";

interface WatchData {
  loading: boolean;
  feature: any;
  error?: string
}

const intialValues: WatchData = {
  loading: false,
  feature: {}
}

export default (state: WatchData = intialValues, action): WatchData => {
  switch(action.type) {
    case UPVOTE_CLICK_REQUEST: 
    case DOWNVOTE_CLICK_REQUEST:
      return { ...state, loading: true }
    case UPVOTE_CLICK_SUCCESS:
    case DOWNVOTE_CLICK_SUCCESS: {
      return { ...state, feature: action.payload, loading: false}
    }
    case UPVOTE_CLICK_ERROR:
    case DOWNVOTE_CLICK_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}
