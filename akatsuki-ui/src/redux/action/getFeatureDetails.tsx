import axios from 'axios';
import { Dispatch } from 'redux';
import {
  FEATURE_DETAILS_ERROR,
  FEATURE_DETAILS_REQUEST,
  FEATURE_DETAILS_SUCCESS,
} from '../constant';

export const getFeaturesDetails = (id) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: FEATURE_DETAILS_REQUEST });
  const url = `/feature-requests/${id}`;

  const data = await axios.get(url);
  if (data.status === 200) {
    dispatch({type: FEATURE_DETAILS_SUCCESS, payload: data.data})
  }
  return data
};