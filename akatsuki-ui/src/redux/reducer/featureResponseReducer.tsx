import { FEATURE_DETAILS_REQUEST, FEATURE_DETAILS_SUCCESS, FEATURE_DETAILS_ERROR } from "../constant";

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
    case FEATURE_DETAILS_REQUEST: 
      return { ...state, loading: true }
    case FEATURE_DETAILS_SUCCESS: {
      return { ...state, details: action.payload, loading: false}
    }
    case FEATURE_DETAILS_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}