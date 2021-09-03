import { FEATURE_RESPONSE_ERROR, FEATURE_RESPONSE_REQUEST, FEATURE_RESPONSE_SUCCESS } from "../constant";

export interface ResponseDetails {
  loading: boolean;
  details: any;
  error?: string
}

const intialFeaturesDetails: ResponseDetails = {
  loading: false,
  details: {  }
}

export default (state: ResponseDetails = intialFeaturesDetails, action): ResponseDetails => {
  switch(action.type) {
    case FEATURE_RESPONSE_REQUEST: 
      return { ...state, loading: true }
    case FEATURE_RESPONSE_SUCCESS: {
      return { ...state, details: action.payload, loading: false}
    }
    case FEATURE_RESPONSE_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}