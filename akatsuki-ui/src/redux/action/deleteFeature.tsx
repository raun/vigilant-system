import axios from 'axios';
import { Dispatch } from 'redux';
import {
  DELETE_FEATURE_ERROR,
  DELETE_FEATURE_REQUEST,
  DELETE_FEATURE_SUCCESS
} from "../constant";
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const deleteFeature = (featureId: number) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: DELETE_FEATURE_REQUEST });
  const url = `/feature-requests/${featureId}/delete`;

  try {
    const data = await axios.delete(url);
    dispatch({ type: DELETE_FEATURE_SUCCESS, payload: data.data })
    notify({
      message: 'feature deleted successfully',
      type: NotificationType.SUCCESS,
      closeInTime: 5000,
      progress_bar: true
    })

  } catch (err) {console.log(err)
    dispatch({ type: DELETE_FEATURE_ERROR })
    notify({
      message: err.message,
      type: NotificationType.ERROR,
      closeInTime: 5000,
      progress_bar: true
    })
  }
};
