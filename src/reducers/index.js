import { combineReducers } from 'redux';
import settings from './settings';
import gridWorld from './gridWorld';
import forbiddenStateEthics from './forbiddenStateEthics';
import normBasedEthics from './normBasedEthics';

export default combineReducers({
  settings,
  gridWorld,
  forbiddenStateEthics,
  normBasedEthics,
});
