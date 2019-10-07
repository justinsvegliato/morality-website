import { CLEAR_NORMS, TOGGLE_NORM } from '../actions';

const INITIAL_NORM_BASED_ETHICS = {
  'norms': ['Do Not Yell', 'Do Not Lie'],
  'violationFunction': {
    0: ['Do Not Yell', 'Do Not Lie'],
    1: ['Do Not Lie']
  },
  'penaltyFunction': {
    'Do Not Yell': 1,
    'Do Not Lie': 5
  },
  'toleranceFunction': 5
};

function getEmptyState(state) {
  return Object.assign({}, state, {
    violationFunction: {}
  });
}

function generateNewState(state, action, norms) {
  return Object.assign({}, state, {
    violationFunction: {
      ...state.violationFunction,
      [action.id]: norms
    }
  });
}

function getNewState(state, action) {
  if (action.id in state.violationFunction) {
    const index = state.violationFunction[action.id].indexOf(action.norm);
    if (index === -1) {
      return generateNewState(state, action, [...state.violationFunction[action.id], action.norm]);
    }
    return generateNewState(state, action, [...state.violationFunction[action.id].slice(0, index), ...state.violationFunction[action.id].slice(index + 1)]);
  }
  return generateNewState(state, action, [action.norm]);
}

export default function normBasedEthics(state = INITIAL_NORM_BASED_ETHICS, action) {
  switch (action.type) {
    case CLEAR_NORMS:
      return getEmptyState(state);
    case TOGGLE_NORM:
      return getNewState(state, action);
    default:
      return state;
  }
}
