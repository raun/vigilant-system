import { USER_FEATURES_ERROR, USER_FEATURES_REQUEST, USER_FEATURES_SUCCESS } from "../constant";

export interface UserFeatures {
  loading: boolean;
  userFeatures: any[];
  error?: string
}

const intialFeatures: UserFeatures = {
  loading: false,
  userFeatures: []
}

export default (state: UserFeatures = intialFeatures, action): UserFeatures => {
  switch(action.type) {
    case USER_FEATURES_REQUEST: 
      return { ...state, loading: true }
    case USER_FEATURES_SUCCESS: {
      return { ...state, userFeatures: action.payload, loading: false}
    }
    case USER_FEATURES_ERROR: {
      return { ...state, loading: false}
    }
    default:
      return state
  }
}