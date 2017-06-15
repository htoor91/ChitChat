import { createStore, applyMiddleware } from 'redux';
import thunk from 'react-thunk';
import rootReducer from '../reducers/rootReducer';

const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};
