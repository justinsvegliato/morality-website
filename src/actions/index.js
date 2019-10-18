export const CLEAR = 'CLEAR';
export const UPDATE_ETHICS = 'UPDATE_ETHICS';
export const UPDATE_VIEW = 'UPDATE_VIEW';
export const UPDATE_GRID_WORLD = 'UPDATE_GRID_WORLD';
export const TOGGLE_FORBIDDEN_STATE = 'TOGGLE_FORBIDDEN_STATE';
export const TOGGLE_NORM = 'TOGGLE_NORM';
export const UPDATE_TOLERANCE = 'UPDATE_TOLERANCE';
export const TOGGLE_MORAL_EXEMPLAR_ACTION = 'TOGGLE_MORAL_EXEMPLAR_ACTION';

export function clear() {
  return {
    type: CLEAR
  };
}

export function updateEthics(ethics) {
  return {
    type: UPDATE_ETHICS,
    ethics
  };
}

export function updateView(view) {
  return {
    type: UPDATE_VIEW,
    view
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

export function updateTolerance(tolerance) {
  return {
    type: UPDATE_TOLERANCE,
    tolerance
  };
}

export function toggleMoralExemplarAction(id, action) {
  return {
    type: TOGGLE_MORAL_EXEMPLAR_ACTION,
    id,
    action
  };
}