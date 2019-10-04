import { TOGGLE_FORBIDDEN_STATE } from '../actions';

const INITIAL_FORBIDDEN_STATES = [31];

export default function forbiddenStates(state = INITIAL_FORBIDDEN_STATES, action) {
  switch (action.type) {
    case TOGGLE_FORBIDDEN_STATE:
      const newState = state.slice();

      const index = newState.indexOf(action.id);
      if (index === -1) {
        newState.push(action.id);
      } else {
        newState.splice(index, 1);
      }

      return newState;
    default:
      return state;
  }
}

