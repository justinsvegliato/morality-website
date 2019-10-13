import { UPDATE_ETHICS, UPDATE_VIEW } from '../actions';

const INITIAL_SETTINGS = {
  'ethics': 'forbiddenStateEthics',
  'view': 'actions'
};

function getNewEthicsState(state, action) {
  return Object.assign({}, state, {
    'ethics': action.ethics
  });
}

function getNewViewState(state, action) {
  return Object.assign({}, state, {
    'view': action.view
  });
}

export default function settings(state = INITIAL_SETTINGS, action) {
  switch (action.type) {
    case UPDATE_ETHICS:
      return getNewEthicsState(state, action);
    case UPDATE_VIEW:
      return getNewViewState(state, action);
    default:
      return state;
  }
}
