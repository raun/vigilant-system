import axios from 'axios';
import { Dispatch } from 'redux';
import {
  CREATE_FEATURE_REQUEST,
  CREATE_FEATURE_ERROR,
  CREATE_FEATURE_SUCCESS,
} from '../constant';
import { notify, NotificationType } from '../../components/Toaster/Toaster';

export const createRequest = (requestBody: any) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: CREATE_FEATURE_REQUEST });
  const url = `/feature-requests/`;

  const data = await axios.post(url, {
    ...requestBody,
    creator: 1
  });
  console.log(data)
  notify({
    message: 'feature created successfully',
    type: NotificationType.SUCCESS,
    closeInTime: 5000,
    progress_bar: false
  })
};