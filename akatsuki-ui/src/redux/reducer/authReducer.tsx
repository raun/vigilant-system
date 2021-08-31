import {
  SIGN_OUT,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS
} from '../constant';


interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: any,
  error?: string
}

const intialAuth = {
  loading: false,
  isAuthenticated: false,
  user: ''
}

export default (state: AuthState = intialAuth, action): AuthState => {
  switch(action.type) {
    case SIGN_IN_REQUEST: 
      return { ...state, loading: true }
    case SIGN_IN_SUCCESS: {
      return { ...state, user: action.payload, isAuthenticated: true, loading: false}
    }
    case SIGN_IN_FAILURE: {
      return { ...state, error: action.payload, isAuthenticated: false, loading: false}
    }
    case SIGN_OUT: 
      return { ...state, loading: false, isAuthenticated: false, user: '' }
    default:
      return state
  }
}