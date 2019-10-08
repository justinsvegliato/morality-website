import { UPDATE_ETHICS } from '../actions';

const INITIAL_SETTINGS = {
  'ethics': 'forbiddenStateEthics'
};

function getNewState(state, action) {
  return Object.assign({}, state, {
    'ethics': action.ethics
  });
}

export default function settings(state = INITIAL_SETTINGS, action) {
  switch (action.type) {
    case UPDATE_ETHICS:
      return getNewState(state, action);
    default:
      return state;
  }
}
