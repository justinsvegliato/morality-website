import { CLEAR_GRID_WORLD, UPDATE_GRID_WORLD } from '../actions';

const INITIAL_GRID_WORLD = {
  'width': 12,
  'height': 6,
  'grid': [
    ['S', 'O', 'W', 'W', 'O', 'O', 'O', 'W', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'W', 'W', 'O', 'W', 'O', 'W', 'O', 'W', 'O', 'O'],
    ['O', 'O', 'W', 'W', 'O', 'W', 'O', 'O', 'O', 'W', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'W', 'W', 'W', 'W', 'W', 'O', 'O'],
    ['O', 'O', 'W', 'W', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'W', 'W', 'W', 'W', 'W', 'G', 'O']
  ]
};

function getEmptyState(state) {
  return Object.assign({}, state, {
    grid: state.grid.map((row) => {
      return Array(state.width).fill('O');
    })
  });
}

function getNewState(state, action) {
  return Object.assign({}, state, {
    grid: state.grid.map((row, rowId) => {
      if (action.rowId === rowId) {
        return [...row.slice(0, action.columnId), action.value, ...row.slice(action.columnId + 1)];
      }
      return row;
    })
  });
}

export default function gridWorld(state = INITIAL_GRID_WORLD, action) {
  switch (action.type) {
    case CLEAR_GRID_WORLD:
      return getEmptyState(state);
    case UPDATE_GRID_WORLD:
      return getNewState(state, action);
    default:
      return state;
  }
}
