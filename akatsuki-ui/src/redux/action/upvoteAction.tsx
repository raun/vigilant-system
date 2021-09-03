import axios from 'axios';
import { Dispatch } from 'redux';
import {
  UPVOTE_CLICK_ERROR,
  UPVOTE_CLICK_REQUEST,
  UPVOTE_CLICK_SUCCESS,
  DOWNVOTE_CLICK_ERROR,
  DOWNVOTE_CLICK_REQUEST,
  DOWNVOTE_CLICK_SUCCESS
} from "../constant";
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const upvoteClick = (userId: number, featureId: number, actionType: number) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: UPVOTE_CLICK_REQUEST });
  const url = `/feature-requests/upvote`;

  try {
    const data = await axios.post(url, {
      user: userId,
      feature_request: featureId,
      action_type: actionType
    });
    dispatch({ type: UPVOTE_CLICK_SUCCESS, payload: data.data })

  } catch (err) {console.log(err)
    dispatch({ type: UPVOTE_CLICK_ERROR })
    notify({
      message: err.message,
      type: NotificationType.ERROR,
      closeInTime: 5000,
      progress_bar: true
    })
  }
};

export const downvoteClick = (userId: number, featureId: number) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: DOWNVOTE_CLICK_REQUEST });
  const url = `/feature-requests/${featureId}/user/${userId}/downvote`;

  try {
    const data = await axios.delete(url);
    dispatch({ type: DOWNVOTE_CLICK_SUCCESS, payload: data.data })

  } catch (err) {console.log(err)
    dispatch({ type: DOWNVOTE_CLICK_ERROR })
    notify({
      message: err.message,
      type: NotificationType.ERROR,
      closeInTime: 5000,
      progress_bar: true
    })
  }
};

export const likeComment = (userId: number, commentId: number) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: UPVOTE_CLICK_REQUEST });
  const url = `/feature-requests/comments/like`;

  try {
    const data = await axios.post(url, {
      user: userId,
      comment: commentId,
    });
    dispatch({ type: UPVOTE_CLICK_SUCCESS, payload: data.data })

  } catch (err) {console.log(err)
    dispatch({ type: UPVOTE_CLICK_ERROR })
    notify({
      message: err.message,
      type: NotificationType.ERROR,
      closeInTime: 5000,
      progress_bar: true
    })
  }
};

export const unlikeComment = (userId: number, commentId: number) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: DOWNVOTE_CLICK_REQUEST });
  const url = `/feature-requests/comments/${commentId}/user/${userId}/unlike`;

  try {
    const data = await axios.delete(url);
    dispatch({ type: DOWNVOTE_CLICK_SUCCESS, payload: data.data })

  } catch (err) {console.log(err)
    dispatch({ type: DOWNVOTE_CLICK_ERROR })
    notify({
      message: err.message,
      type: NotificationType.ERROR,
      closeInTime: 5000,
      progress_bar: true
    })
  }
};
