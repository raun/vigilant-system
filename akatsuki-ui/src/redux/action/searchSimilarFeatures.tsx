import axios from 'axios';
import { Dispatch } from 'redux';
import {
  SEARCH_FEATURE_ERROR,
  SEARCH_FEATURE_REQUEST,
  SEARCH_FEATURE_SUCCESS
} from '../constant';
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const searchSimilarFeatures = (title: string) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: SEARCH_FEATURE_REQUEST });
  const url = `/feature-requests/search?title=${title}`;

  try {
    const data = await axios.get(url);
    
    if (data.status >= 200 && data.status < 300) {
      dispatch({type: SEARCH_FEATURE_SUCCESS, payload: data.data})
    }
    if (data.status >= 400) {
      dispatch({type: SEARCH_FEATURE_ERROR })
      notify({
        closeInTime: 5000,
        message: 'someting went wrong',
        progress_bar: true,
        type: NotificationType.ERROR
      })
    }
  } catch (err) {
    dispatch({type: SEARCH_FEATURE_ERROR })
    notify({
      closeInTime: 5000,
      message: err.message,
      progress_bar: true,
      type: NotificationType.ERROR
    })
  }
};