import { CLEAR, TOGGLE_DUTY, UPDATE_TOLERANCE } from '../actions';

const INITIAL_PRIMA_FACIE_DUTIES = {
  'duties': ['Quiet Operation', 'Personal Space'],
  'violationFunction': {
    54: ['Quiet Operation'],
    55: ['Quiet Operation', 'Personal Space'],
    56: ['Quiet Operation', 'Personal Space'],
    57: ['Personal Space']
  },
  'penaltyFunction': {
    'Quiet Operation': 1,
    'Personal Space': 5
  },
  'tolerance': 0.3
};

function getEmptyState(state) {
  return Object.assign({}, state, {
    violationFunction: {}
  });
}

function generateNewState(state, id, duties) {
  return Object.assign({}, state, {
    violationFunction: {
      ...state.violationFunction,
      [id]: duties
    }
  });
}

function getNewState(state, action) {
  if (action.id in state.violationFunction) {
    const index = state.violationFunction[action.id].indexOf(action.duty);
    if (index === -1) {
      return generateNewState(state, action.id, [...state.violationFunction[action.id], action.duty]);
    }
    return generateNewState(state, action.id, [...state.violationFunction[action.id].slice(0, index), ...state.violationFunction[action.id].slice(index + 1)]);
  }
  return generateNewState(state, action.id, [action.duty]);
}

export default function primaFacieDuties(state = INITIAL_PRIMA_FACIE_DUTIES, action) {
  switch (action.type) {
    case CLEAR:
      return getEmptyState(state);
    case TOGGLE_DUTY:
      return getNewState(state, action);
    case UPDATE_TOLERANCE:
      return Object.assign({}, state, {
        tolerance: action.tolerance
      });
    default:
      return state;
  }
}
