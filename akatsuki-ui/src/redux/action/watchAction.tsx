import axios from 'axios';
import { Dispatch } from 'redux';
import {
  WATCH_CLICK_ERROR,
  WATCH_CLICK_REQUEST,
  WATCH_CLICK_SUCCESS,
  UNWATCH_CLICK_ERROR,
  UNWATCH_CLICK_REQUEST,
  UNWATCH_CLICK_SUCCESS
} from "../constant";
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const watchClick = (userId: number, featureId: number, actionType: number) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: WATCH_CLICK_REQUEST });
  const url = `/feature-requests/watch`;

  try {
    const data = await axios.post(url, {
      user: userId,
      feature_request: featureId,
      action_type: actionType
    });
    dispatch({ type: WATCH_CLICK_SUCCESS, payload: data.data })

  } catch (err) {console.log(err)
    dispatch({ type: WATCH_CLICK_ERROR })
    notify({
      message: err.message,
      type: NotificationType.ERROR,
      closeInTime: 5000,
      progress_bar: true
    })
  }
};

export const unwatchClick = (userId: number, featureId: number) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: UNWATCH_CLICK_REQUEST });
  const url = `/feature-requests/${featureId}/${userId}/unwatch`;

  try {
    const data = await axios.delete(url);
    dispatch({ type: UNWATCH_CLICK_SUCCESS, payload: data.data })

  } catch (err) {console.log(err)
    dispatch({ type: UNWATCH_CLICK_ERROR })
    notify({
      message: err.message,
      type: NotificationType.ERROR,
      closeInTime: 5000,
      progress_bar: true
    })
  }
};