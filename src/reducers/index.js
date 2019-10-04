import { combineReducers } from 'redux';
import gridWorld from './gridWorld';
import forbiddenStates from './forbiddenStates';

// TODO Clean up how I deal with each reducer
export default combineReducers({
  gridWorld,
  forbiddenStates
});
