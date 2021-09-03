import {
  WATCH_CLICK_ERROR, 
  WATCH_CLICK_REQUEST, 
  WATCH_CLICK_SUCCESS,
  UNWATCH_CLICK_ERROR,
  UNWATCH_CLICK_REQUEST,
  UNWATCH_CLICK_SUCCESS
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
    case WATCH_CLICK_REQUEST: 
    case UNWATCH_CLICK_REQUEST:
      return { ...state, loading: true }
    case WATCH_CLICK_SUCCESS:
    case UNWATCH_CLICK_SUCCESS: {
      return { ...state, feature: action.payload, loading: false}
    }
    case WATCH_CLICK_ERROR:
    case UNWATCH_CLICK_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}
