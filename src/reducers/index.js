import { combineReducers } from 'redux';
import gridWorld from './gridWorld';
import forbiddenStates from './forbiddenStates';

export default combineReducers({
  gridWorld,
  forbiddenStates
});
