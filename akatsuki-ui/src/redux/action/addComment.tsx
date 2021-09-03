import axios from 'axios';
import { Dispatch } from 'redux';
import { CREATE_COMMENT_ERROR, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_REQUEST } from "../constant";
import { notify, NotificationType } from '../../components/Toaster/Toaster';
import getAllComments from '../reducer/getAllComments';
import { useDispatch } from 'react-redux';

export const createComment = (userId: number, featureId: number, text: string) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });
  const url = `/feature-requests/comments`;

  try {
    const data = await axios.post(url, {
      user: userId,
      feature_request: featureId,
      text: text
    });
    dispatch({ type: CREATE_COMMENT_SUCCESS })
    notify({
      message: 'commented successfully',
      type: NotificationType.SUCCESS,
      closeInTime: 5000,
      progress_bar: true
    })
  } catch (err) {console.log(err)
    dispatch({ type: CREATE_COMMENT_ERROR })
    notify({
      message: err.message,
      type: NotificationType.ERROR,
      closeInTime: 5000,
      progress_bar: true
    })
  }
};