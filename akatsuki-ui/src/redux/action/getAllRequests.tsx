import axios from 'axios';
import { Dispatch } from 'redux';
import {
  GET_FEATURES_ERROR,
  GET_FEATURES_REQUEST,
  GET_FEATURES_SUCCESS,
} from '../constant';

export const getAllRequests = () => async (
  dispatch: Dispatch
) => {
  dispatch({ type: GET_FEATURES_REQUEST });
  const url = ``;

  const data = await axios.get(url);
  console.log(data);
  return ['jkfjsdkjfajskfj' , 'fjldjfakdjf']
};