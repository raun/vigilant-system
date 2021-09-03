import { combineReducers } from 'redux';
import authReducer from './authReducer';
import featureRequests from './featureRequestsReducer';
import createFeatureReducer from './createFeatureReducer';
import featureDetailsReducer from './featureDetailsReducer';
import userFeatureRequestReducer from './userFeatureRequestReducer';
import watchFeatureReducer from './watchFeatureReducer';
import addCommentReducer from './addCommentReducer';
import getAllComments from './getAllComments';
import upvoteFeatureReducer from './upvoteFeatureReducer';

export default combineReducers({
  auth: authReducer,
  features: featureRequests,
  createFeature: createFeatureReducer,
  featureDetails: featureDetailsReducer,
  userFeatures: userFeatureRequestReducer,
  watch: watchFeatureReducer,
  comments: getAllComments,
  createComment: addCommentReducer,
  upvote: upvoteFeatureReducer
})