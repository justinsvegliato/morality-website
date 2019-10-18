import { combineReducers } from 'redux';
import settings from './settings';
import gridWorld from './gridWorld';
import forbiddenStateEthics from './forbiddenStateEthics';
import normBasedEthics from './normBasedEthics';
import moralExemplarEthics from './moralExemplarEthics';

export default combineReducers({
  settings,
  gridWorld,
  forbiddenStateEthics,
  normBasedEthics,
  moralExemplarEthics
});
