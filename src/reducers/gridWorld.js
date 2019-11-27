import { CLEAR, UPDATE_GRID_WORLD } from '../actions';

const INITIAL_GRID_WORLD = [
  ['O', 'O', 'W', 'W', 'O', 'O', 'O', 'W', 'O', 'O', 'O', 'O'],
  ['O', 'O', 'W', 'W', 'O', 'W', 'O', 'W', 'O', 'W', 'O', 'O'],
  ['O', 'O', 'W', 'W', 'O', 'W', 'O', 'O', 'O', 'W', 'O', 'O'],
  ['O', 'O', 'O', 'O', 'O', 'W', 'W', 'W', 'W', 'W', 'O', 'O'],
  ['O', 'O', 'W', 'W', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
  ['O', 'O', 'O', 'O', 'O', 'W', 'W', 'W', 'W', 'W', 'G', 'O']
];

function getEmptyState(state) {
  return state.map((row, rowId) => {
    return Array(state[rowId].length).fill('O');
  });
}

function getNewState(state, action) {
  return state.map((row, rowId) => {
    if (action.rowId === rowId) {
      return [...row.slice(0, action.columnId), action.value, ...row.slice(action.columnId + 1)];
    }
    return row;
  });
}

export default function gridWorld(state = INITIAL_GRID_WORLD, action) {
  switch (action.type) {
    case CLEAR:
      return getEmptyState(state);
    case UPDATE_GRID_WORLD:
      return getNewState(state, action);
    default:
      return state;
  }
}
