import {
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  FETCH_ALL_LISTS,
} from '../actions/actionTypes';

const initialState = {
  list: {
    title: '',
    listItems: [],
    listUsers: [],
  },
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_LIST_SUCCESS: {
      console.log(payload);
      return {
        ...state,
        list: payload,
        loading: false,
      };
    }
    case CREATE_LIST_FAIL: {
      return {
        ...state,
        list: null,
        loading: false,
      };
    }
    case FETCH_ALL_LISTS:
      return {
        ...state.lists,
        lists: action.payload,
      };
    // case actionTypes.DELETE_LIST:
    //   return {
    //     ...state,
    //     lists: state.lists.filter((list) => list.id !== action.payload),
    //   };
    // case actionTypes.CREATE_LIST:
    //   return {
    //     ...state,
    //     lists: [action.payload, ...state.lists],
    //   };
    default:
      return state;
  }
}
