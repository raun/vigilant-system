import { CREATE_FEATURE_ERROR, CREATE_FEATURE_REQUEST, CREATE_FEATURE_SUCCESS } from "../constant";

interface FeatureData {
  loading: boolean;
  success: boolean;
  error?: string
}

const intialFeatureData: FeatureData = {
  loading: false,
  success: false
}

export default (state: FeatureData = intialFeatureData, action): FeatureData => {
  switch(action.type) {
    case CREATE_FEATURE_REQUEST: 
      return { ...state, success: false, loading: true }
    case CREATE_FEATURE_SUCCESS: {
      return { ...state, success: true, loading: false}
    }
    case CREATE_FEATURE_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}