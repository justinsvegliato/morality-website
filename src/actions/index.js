export const UPDATE_ETHICS = 'UPDATE_ETHICS';
export const UPDATE_VIEW = 'UPDATE_VIEW';
export const CLEAR_GRID_WORLD = 'CLEAR_GRID_WORLD';
export const UPDATE_GRID_WORLD = 'UPDATE_GRID_WORLD';
export const CLEAR_FORBIDDEN_STATES = 'CLEAR_FORBIDDEN_STATES';
export const TOGGLE_FORBIDDEN_STATE = 'TOGGLE_FORBIDDEN_STATE';
export const CLEAR_NORMS = 'CLEAR_NORMS';
export const TOGGLE_NORM = 'TOGGLE_NORM';
export const CLEAR_MORAL_EXEMPLAR_ACTIONS = 'CLEAR_MORAL_EXEMPLAR_ACTIONS';
export const TOGGLE_MORAL_EXEMPLAR_ACTION = 'TOGGLE_MORAL_EXEMPLAR_ACTION';
export const UPDATE_TOLERANCE = 'UPDATE_TOLERANCE';

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

export function clearGridWorld() {
  return {
    type: CLEAR_GRID_WORLD
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

export function clearForbiddenStates() {
  return {
    type: CLEAR_FORBIDDEN_STATES
  };
}

export function toggleForbiddenState(id) {
  return {
    type: TOGGLE_FORBIDDEN_STATE,
    id
  };
}

export function clearNorms() {
  return {
    type: CLEAR_NORMS
  };
}

export function toggleNorm(id, norm) {
  return {
    type: TOGGLE_NORM,
    id,
    norm
  };
}

export function clearMoralExemplarActions() {
  return {
    type: CLEAR_MORAL_EXEMPLAR_ACTIONS
  };
}

export function toggleMoralExemplarAction(id, action) {
  return {
    type: TOGGLE_MORAL_EXEMPLAR_ACTION,
    id,
    action
  };
}

export function updateTolerance(tolerance) {
  return {
    type: UPDATE_TOLERANCE,
    tolerance
  };
}
