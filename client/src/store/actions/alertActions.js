import { SHOW_ALERT, REMOVE_ALERT } from './actionTypes';

export function showAlert(open, text, type) {
  return {
    type: SHOW_ALERT,
    payload: { open, text, type },
  };
}

export function removeAlert(open, text, type) {
  return {
    type: REMOVE_ALERT,
    payload: { open, text, type },
  };
}
