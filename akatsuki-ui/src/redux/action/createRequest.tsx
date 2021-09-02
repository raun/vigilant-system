import axios from 'axios';
import { Dispatch } from 'redux';
import {
  CREATE_FEATURE_REQUEST,
  CREATE_FEATURE_ERROR,
  CREATE_FEATURE_SUCCESS,
} from '../constant';
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const createRequest = (id: number, requestBody: any) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: CREATE_FEATURE_REQUEST });
  const url = `/feature-requests/user/${id}`;

  try {
    const data = await axios.post(url, {
      ...requestBody,
      creator: 1
    });
    dispatch({ type: CREATE_FEATURE_SUCCESS })
    notify({
      message: 'feature created successfully',
      type: NotificationType.SUCCESS,
      closeInTime: 5000,
      progress_bar: true
    })
  } catch (err) {console.log(err)
    dispatch({ type: CREATE_FEATURE_ERROR })
    notify({
      message: err.message,
      type: NotificationType.ERROR,
      closeInTime: 5000,
      progress_bar: true
    })
  }
};