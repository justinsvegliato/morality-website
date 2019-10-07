import { CLEAR_FORBIDDEN_STATES, TOGGLE_FORBIDDEN_STATE } from '../actions';

const INITIAL_FORBIDDEN_STATE_ETHICS = [31];

function getEmptyState(state) {
  return [];
}

function getNewState(state, action) {
  const index = state.indexOf(action.id);
  if (index === -1) {
    return [...state, action.id];
  } else {
    return [...state.slice(0, index), ...state.slice(index + 1)];
  }
}

export default function forbiddenStateEthics(state = INITIAL_FORBIDDEN_STATE_ETHICS, action) {
  switch (action.type) {
    case CLEAR_FORBIDDEN_STATES:
      return getEmptyState(state);
    case TOGGLE_FORBIDDEN_STATE:
      return getNewState(state, action);
    default:
      return state;
  }
}
