import { SIGN_OUT, SIGN_IN } from '../../constant';

const intialAuth = {
  isSignedIn: false
}

export default (state = intialAuth, action) => {
  switch(action.type) {
    case SIGN_IN: 
      return { ...state, isSignedIn: true }
    case SIGN_OUT: 
      return { ...state, isSignedIn: false }
    default:
      return state
  }
}