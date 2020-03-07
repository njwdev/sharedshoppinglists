import * as actionTypes from '../actions/actionTypes';

const initialState = {
  list: {
    lists: [],
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_LIST:
      return {
        ...state.lists,
        lists: action.payload,
      };
    case actionTypes.DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload),
      };
    case actionTypes.CREATE_LIST:
      return {
        ...state,
        lists: [action.payload, ...state.lists],
      };
    default:
      return state;
  }
}
