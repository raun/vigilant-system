import axios from 'axios';
import { Dispatch } from 'redux';
import {
  WATCH_REQUEST,
  WATCH_SUCCESS,
  WATCH_ERROR,
} from '../constant';
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const sendWatchRequest = () => async (
  dispatch: Dispatch
) => {
  dispatch({ type: WATCH_REQUEST });
  const url = `/feature-requests/`;

  try {
    const data = await axios.get(url);
    if (data.status >= 200 && data.status < 300) {
      dispatch({type: WATCH_SUCCESS, payload: data.data })
    }
    if (data.status >= 400) {
      dispatch({ type: WATCH_ERROR })
      notify({
        closeInTime: 5000,
        message: 'someting went wrong',
        progress_bar: true,
        type: NotificationType.ERROR
      })
    }
  } catch (err) {
    dispatch({type: WATCH_ERROR })
    notify({
      closeInTime: 5000,
      message: err.message,
      progress_bar: true,
      type: NotificationType.ERROR
    })
  }
};