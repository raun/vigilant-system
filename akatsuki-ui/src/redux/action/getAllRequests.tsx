import axios from 'axios';
import { Dispatch } from 'redux';
import {
  GET_FEATURES_ERROR,
  GET_FEATURES_REQUEST,
  GET_FEATURES_SUCCESS,
} from '../constant';
import { Features } from '../reducer/featureRequestsReducer';

export const getAllRequests = () => async (
  dispatch: Dispatch
) => {
  dispatch({ type: GET_FEATURES_REQUEST });
  const url = `/feature-requests/`;

  const data = await axios.get(url);
  if (data.status === 200) {
    dispatch({type: GET_FEATURES_SUCCESS, payload: data.data})
  }
  return data
};