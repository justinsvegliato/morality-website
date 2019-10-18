import { CLEAR_MORAL_EXEMPLAR_ACTIONS, TOGGLE_MORAL_EXEMPLAR_ACTION } from '../actions';

const INITIAL_MORAL_EXEMPLAR_ETHICS = {
  55: ['NORTH', 'WEST']
};

function getEmptyState(state) {
  return [];
}

function generateNewState(state, action, actions) {
  return Object.assign({}, state, {
    [action.id]: actions
  });
}

function getNewState(state, action) {
  if (action.id in state) {
    const index = state[action.id].indexOf(action.action);
    if (index === -1) {
      return generateNewState(state, action, [...state[action.id], action.action]);
    }
    return generateNewState(state, action, [...state[action.id].slice(0, index), ...state[action.id].slice(index + 1)]);
  }
  return generateNewState(state, action, [action.action]);
}

export default function forbiddenStateEthics(state = INITIAL_MORAL_EXEMPLAR_ETHICS, action) {
  switch (action.type) {
    case CLEAR_MORAL_EXEMPLAR_ACTIONS:
      return getEmptyState(state);
    case TOGGLE_MORAL_EXEMPLAR_ACTION:
      return getNewState(state, action);
    default:
      return state;
  }
}
