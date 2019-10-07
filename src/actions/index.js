export const UPDATE_ETHICS = 'UPDATE_ETHICS';
export const UPDATE_GRID_WORLD = 'UPDATE_GRID_WORLD';
export const TOGGLE_FORBIDDEN_STATE = 'TOGGLE_FORBIDDEN_STATE';
export const TOGGLE_NORM = 'TOGGLE_NORM';

export function updateEthics(ethics) {
  return {
    type: UPDATE_ETHICS,
    ethics
  };
}

export function updateGridWorld(rowId, columnId, value) {
  return {
    type: UPDATE_GRID_WORLD,
    rowId,
    columnId,
    value
  };
}

export function toggleForbiddenState(id) {
  return {
    type: TOGGLE_FORBIDDEN_STATE,
    id
  };
}

export function toggleNorm(id, norm) {
  return {
    type: TOGGLE_NORM,
    id,
    norm
  };
}
