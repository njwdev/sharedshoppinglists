import { SHOW_ALERT, REMOVE_ALERT } from '../actions/actionTypes';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...state, alert: action.payload };
    case REMOVE_ALERT:
      return { ...state, alert: action.payload };
    default:
      return state;
  }
}
