import axios from 'axios';
import { Dispatch } from 'redux';
import { FEATURE_RESPONSE_ERROR, FEATURE_RESPONSE_REQUEST, FEATURE_RESPONSE_SUCCESS } from "../constant";
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const getFeaturesResponse = (id) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: FEATURE_RESPONSE_REQUEST });
  const url = `/feature-requests/${id}/response`;
  try {
    const data = await axios.get(url);
    if (data && data.status >= 400) {
      dispatch({type: FEATURE_RESPONSE_ERROR, payload: data.data})
      notify({
        closeInTime: 5000,
        message: 'something went wrong',
        progress_bar: true,
        type: NotificationType.ERROR
      })
    }
  
    if (data) {
      dispatch({type: FEATURE_RESPONSE_SUCCESS, payload: data.data})
    }
  
  } catch (err) {
    dispatch({type: FEATURE_RESPONSE_ERROR })
    notify({
      closeInTime: 5000,
      message: err.message,
      progress_bar: true,
      type: NotificationType.ERROR
    })
  }
  
};