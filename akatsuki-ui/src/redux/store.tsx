import { applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import RootReducer from './reducer';

const store = createStore(
  RootReducer,
  applyMiddleware(thunk)
);

export default store;