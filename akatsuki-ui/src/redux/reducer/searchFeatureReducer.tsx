import { SEARCH_FEATURE_ERROR, SEARCH_FEATURE_REQUEST, SEARCH_FEATURE_SUCCESS } from "../constant";

export interface SearchResults {
  loading: boolean;
  features: any[];
  error?: string
}

const intialFeatures: SearchResults = {
  loading: false,
  features: []
}

export default (state: SearchResults = intialFeatures, action): SearchResults => {
  switch(action.type) {
    case SEARCH_FEATURE_REQUEST: 
      return { ...state, loading: true }
    case SEARCH_FEATURE_SUCCESS: {
      return { ...state, features: action.payload, loading: false}
    }
    case SEARCH_FEATURE_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}