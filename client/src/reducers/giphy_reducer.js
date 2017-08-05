import { RECEIVE_GIFS } from '../actions/giphy_actions';
import merge from 'lodash/merge';

const initState = {
  giphys: []
};

const GiphysReducer = (state = initState, action) => {
  const nextState = merge({}, state);
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_GIFS:
      nextState.giphys = action.giphys;
      return nextState;
    default:
      return state;
  }
};

export default GiphysReducer;
