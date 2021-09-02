import { CREATE_FEATURE_ERROR, CREATE_FEATURE_REQUEST, CREATE_FEATURE_SUCCESS } from "../constant";

interface FeatureData {
  loading: boolean;
  featureData: any;
  error?: string
}

const intialFeatureData: FeatureData = {
  loading: false,
  featureData: {}
}

export default (state: FeatureData = intialFeatureData, action): FeatureData => {
  switch(action.type) {
    case CREATE_FEATURE_REQUEST: 
      return { ...state, loading: true }
    case CREATE_FEATURE_SUCCESS: {
      return { ...state, loading: false}
    }
    case CREATE_FEATURE_ERROR: {
      return { ...state, error: action.payload, loading: false}
    }
    default:
      return state
  }
}