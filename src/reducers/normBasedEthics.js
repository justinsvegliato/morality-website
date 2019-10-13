import { CLEAR_NORMS, TOGGLE_NORM, UPDATE_TOLERANCE } from '../actions';

const INITIAL_NORM_BASED_ETHICS = {
  'norms': ['Do Not Yell', 'Do Not Lie'],
  'violationFunction': {
    55: ['Do Not Yell', 'Do Not Lie']
  },
  'penaltyFunction': {
    'Do Not Yell': 1,
    'Do Not Lie': 5
  },
  'tolerance': 0.3
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
    case UPDATE_TOLERANCE:
      return Object.assign({}, state, {
        tolerance: action.tolerance
      });
    default:
      return state;
  }
}
