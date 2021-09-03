import {
  DELETE_FEATURE_REQUEST, 
  DELETE_FEATURE_ERROR,
  DELETE_FEATURE_SUCCESS
} from "../constant";

interface WatchData {
  loading: boolean;
  error?: string
}

const intialValues: WatchData = {
  loading: false
}

export default (state: WatchData = intialValues, action): WatchData => {
  switch(action.type) {
    case DELETE_FEATURE_REQUEST: 
      return { ...state, loading: true }
    case DELETE_FEATURE_SUCCESS: {
      return { ...state, loading: false}
    }
    case DELETE_FEATURE_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}
