import { combineReducers } from 'redux';
import settings from './settings';
import gridWorld from './gridWorld';
import divineCommandTheory from './divineCommandTheory';
import primaFacieDuties from './primaFacieDuties';
import virtueEthics from './virtueEthics';

export default combineReducers({
  settings,
  gridWorld,
  divineCommandTheory,
  primaFacieDuties,
  virtueEthics
});
