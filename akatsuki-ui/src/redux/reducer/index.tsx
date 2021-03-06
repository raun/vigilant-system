import { combineReducers } from 'redux';
import authReducer from './authReducer';
import featureRequests from './featureRequestsReducer';
import createFeatureReducer from './createFeatureReducer';
import featureDetailsReducer from './featureDetailsReducer';
import userFeatureRequestReducer from './userFeatureRequestReducer';
import watchReducer from './watchReducer';

export default combineReducers({
  auth: authReducer,
  features: featureRequests,
  createFeature: createFeatureReducer,
  featureDetails: featureDetailsReducer,
  userFeatures: userFeatureRequestReducer,
  watch: watchReducer
})