import { CLEAR, TOGGLE_MORAL_EXAMPLE } from '../actions';

const INITIAL_VIRTUE_ETHICS = {
  55: ['NORTH', 'WEST']
};

function getEmptyState(state) {
  return {};
}

function generateNewState(state, id, moralExamples) {
  return Object.assign({}, state, {
    [id]: moralExamples
  });
}

function getNewState(state, action) {
  if (action.id in state) {
    const index = state[action.id].indexOf(action.moralExample);
    if (index === -1) {
      return generateNewState(state, action.id, [...state[action.id], action.moralExample]);
    }
    return generateNewState(state, action.id, [...state[action.id].slice(0, index), ...state[action.id].slice(index + 1)]);
  }
  return generateNewState(state, action.id, [action.moralExample]);
}

export default function virtueEthics(state = INITIAL_VIRTUE_ETHICS, action) {
  switch (action.type) {
    case CLEAR:
      return getEmptyState(state);
    case TOGGLE_MORAL_EXAMPLE:
      return getNewState(state, action);
    default:
      return state;
  }
}
