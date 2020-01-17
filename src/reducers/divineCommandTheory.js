import { CLEAR, TOGGLE_FORBIDDEN_STATE } from '../actions';

const INITIAL_DIVINE_COMMAND_THEORY = [55];

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

export default function divineCommandTheory(state = INITIAL_DIVINE_COMMAND_THEORY, action) {
  switch (action.type) {
    case CLEAR:
      return getEmptyState(state);
    case TOGGLE_FORBIDDEN_STATE:
      return getNewState(state, action);
    default:
      return state;
  }
}
