import { FEATURE_DETAILS_REQUEST, FEATURE_DETAILS_SUCCESS, FEATURE_DETAILS_ERROR } from "../constant";

export interface Details {
  title: string,
  description: string,
  upvote: number
}

export interface FeaturesDetails {
  loading: boolean;
  details: Details;
  error?: string
}

const intialFeaturesDetails: FeaturesDetails = {
  loading: false,
  details: {
    title: '',
    description: '',
    upvote: 0
  }
}

export default (state: FeaturesDetails = intialFeaturesDetails, action): FeaturesDetails => {
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