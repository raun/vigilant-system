import axios from 'axios';
import { Dispatch } from 'redux';
import {
  USER_FEATURES_ERROR,
  USER_FEATURES_REQUEST,
  USER_FEATURES_SUCCESS,
} from '../constant';
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const getUserRequests = (userId) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: USER_FEATURES_REQUEST });
  const url = `/feature-requests/user?user_id=${userId}`;

  try{
    const data = await axios.get(url);
    if (data.status >= 100 && data.status < 300) {
      dispatch({type: USER_FEATURES_SUCCESS, payload: data.data})
    }
  
    if (data.status >= 400) {
      dispatch({type: USER_FEATURES_ERROR})
      notify({
        closeInTime: 5000,
        message: 'someting went wrong',
        progress_bar: true,
        type: NotificationType.ERROR
      })
    }
  } catch (err) {
    dispatch({type: USER_FEATURES_ERROR })
    notify({
      closeInTime: 5000,
      message: err.message,
      progress_bar: true,
      type: NotificationType.ERROR
    })
  }
};