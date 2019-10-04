import { TOGGLE_FORBIDDEN_STATE } from '../actions';

const INITIAL_FORBIDDEN_STATES = [31];

export default function forbiddenStates(state = INITIAL_FORBIDDEN_STATES, action) {
  switch (action.type) {
    case TOGGLE_FORBIDDEN_STATE:
      const index = state.indexOf(action.id);
      if (index === -1) {
        return [...state, action.id];
      } else {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
    default:
      return state;
  }
}
