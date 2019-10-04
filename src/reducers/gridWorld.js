import { UPDATE_GRID_WORLD } from '../actions';

const INITIAL_GRID_WORLD = {
  'width': 12,
  'height': 6,
  'position': {
    'row': 0,
    'column': 0
  },
  'slipProbability': 0.1,
  'grid': [
    ['O', 'O', 'W', 'W', 'O', 'O', 'O', 'W', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'W', 'W', 'O', 'W', 'O', 'W', 'O', 'W', 'O', 'O'],
    ['O', 'O', 'W', 'W', 'O', 'W', 'O', 'O', 'O', 'W', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'W', 'W', 'W', 'W', 'W', 'O', 'O'],
    ['O', 'O', 'W', 'W', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O', 'O', 'W', 'W', 'W', 'W', 'W', 'G', 'O']
  ]
};

export default function gridWorld(state = INITIAL_GRID_WORLD, action) {
  switch (action.type) {
    case UPDATE_GRID_WORLD:
      return Object.assign({}, state, {
        grid: state.grid.map((row, rowId) => {
          if (rowId === action.rowId) {
            const newRow = row.slice();
            newRow[action.columnId] = action.value;
            return newRow;
          }
          return row;
        })
      });
    default:
      return state;
  }
}
