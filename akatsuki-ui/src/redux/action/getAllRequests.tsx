import axios from 'axios';
import { Dispatch } from 'redux';
import {
  GET_FEATURES_ERROR,
  GET_FEATURES_REQUEST,
  GET_FEATURES_SUCCESS,
} from '../constant';
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const getAllRequests = (id: any) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: GET_FEATURES_REQUEST });
  const url = `/feature-requests/user/all?user_id=${id}`;

  try {
    const data = await axios.get(url);
    
    if (data.status >= 200 && data.status < 300) {
      dispatch({type: GET_FEATURES_SUCCESS, payload: data.data})
    }
    if (data.status >= 400) {
      dispatch({type: GET_FEATURES_ERROR })
      notify({
        closeInTime: 5000,
        message: 'someting went wrong',
        progress_bar: true,
        type: NotificationType.ERROR
      })
    }
  } catch (err) {
    dispatch({type: GET_FEATURES_ERROR })
    notify({
      closeInTime: 5000,
      message: err.message,
      progress_bar: true,
      type: NotificationType.ERROR
    })
  }
};