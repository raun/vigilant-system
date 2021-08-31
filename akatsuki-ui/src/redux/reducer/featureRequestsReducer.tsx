import { GET_FEATURES_ERROR, GET_FEATURES_REQUEST, GET_FEATURES_SUCCESS } from "../constant";

interface Features {
  loading: boolean;
  featuresRequests: any[];
  error?: string
}

const intialFeatures: Features = {
  loading: false,
  featuresRequests: []
}

export default (state: Features = intialFeatures, action): Features => {
  switch(action.type) {
    case GET_FEATURES_REQUEST: 
      return { ...state, loading: true }
    case GET_FEATURES_SUCCESS: {
      return { ...state, featuresRequests: action.payload, loading: false}
    }
    case GET_FEATURES_ERROR: {
      return { ...state, error: action.payload, loading: false}
    }
    default:
      return state
  }
}