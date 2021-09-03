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
  const url = `/feature-requests/`;

  const dbReq = axios.post(url, {
    ...requestBody,
    creator: id
  })
  // const jiraBaseUrl = axios.create({baseURL: ''});

  // const jiraReq = jiraBaseUrl.post('https://akatsukithegreat.atlassian.net/rest/api/2/issue',{
  //     "project":
  //     {
  //        "id": "10000"
  //     },
  //     "summary": requestBody.title,
  //     "description": requestBody.description,
  //     "issuetype": {
  //        "id": "10001"
  //     }
  // })

  // const promiseArr = [dbReq];
  try {
    const data = await dbReq;
    
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