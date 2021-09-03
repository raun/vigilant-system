import axios from 'axios';
import { Dispatch } from 'redux';
import {
  FEATURE_DETAILS_ERROR,
  FEATURE_DETAILS_REQUEST,
  FEATURE_DETAILS_SUCCESS,
} from '../constant';
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const getFeaturesDetails = (id, userId) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: FEATURE_DETAILS_REQUEST });
  const url = `/feature-requests/${id}?user_id=${userId}`;
  try {
    const data = await axios.get(url);
    if (data && data.status >= 400) {
      dispatch({type: FEATURE_DETAILS_ERROR, payload: data.data})
      notify({
        closeInTime: 5000,
        message: 'something went wrong',
        progress_bar: true,
        type: NotificationType.ERROR
      })
    }
  
    if (data) {
      dispatch({type: FEATURE_DETAILS_SUCCESS, payload: data.data})
    }
  
  } catch (err) {
    dispatch({type: FEATURE_DETAILS_ERROR })
    notify({
      closeInTime: 5000,
      message: err.message,
      progress_bar: true,
      type: NotificationType.ERROR
    })
  }
  
};