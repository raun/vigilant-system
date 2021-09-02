import { WATCH_ERROR, WATCH_SUCCESS, WATCH_REQUEST } from "../constant";

export interface Watch {
  loading: boolean;
  error?: string
}

const intialValues: Watch = {
  loading: false,
}

export default (state: Watch = intialValues, action): Watch => {
  switch(action.type) {
    case WATCH_REQUEST: 
      return { ...state, loading: true }
    case WATCH_SUCCESS: {
      return { ...state, loading: false}
    }
    case WATCH_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}