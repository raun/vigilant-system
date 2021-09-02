import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_IN_REQUEST , SIGN_OUT } from '../constant';
import axios from 'axios';

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

const signIn = () => async (dispatch) => {
  dispatch({type: SIGN_IN_REQUEST});
  dispatch({ type: SIGN_IN_SUCCESS , isAuth: true})

  
}