import axios from 'axios';
import { Dispatch } from 'redux';
import {
  GET_ALL_COMMENT_ERROR,
  GET_ALL_COMMENT_REQUEST,
  GET_ALL_COMMENT_SUCCESS,
} from '../constant';
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const getAllComments = (featureId: number, userId: number) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: GET_ALL_COMMENT_REQUEST });
  const url = `/feature-requests/${featureId}/comments?user_id=${userId}`;

  try {
    const data = await axios.get(url);
    
    if (data.status >= 200 && data.status < 300) {
      dispatch({type: GET_ALL_COMMENT_SUCCESS, payload: data.data})
    }
    if (data.status >= 400) {
      dispatch({type: GET_ALL_COMMENT_ERROR })
      notify({
        closeInTime: 5000,
        message: 'someting went wrong',
        progress_bar: true,
        type: NotificationType.ERROR
      })
    }
  } catch (err) {
    dispatch({type: GET_ALL_COMMENT_ERROR })
    notify({
      closeInTime: 5000,
      message: err.message,
      progress_bar: true,
      type: NotificationType.ERROR
    })
  }
};