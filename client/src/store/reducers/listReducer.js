import {
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  FETCH_ALL_LISTS,
  FETCH_LIST,
  UPDATE_LIST,
  ADD_ITEM_TO_LIST,
  DELETE_LIST,
  LIST_ITEM_SUCCESS,
  LIST_ITEM_PROBLEM,
} from '../actions/actionTypes';

const initialState = {
  list: {
    title: '',
    listItems: [],
    listUsers: [],
  },
  lists: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_LIST_SUCCESS: {
      return {
        ...state,
        lists: [payload, ...state.lists],
        loading: false,
      };
    }
    case UPDATE_LIST: {
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
        lists: payload,
        loading: false,
      };
    case FETCH_LIST:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case ADD_ITEM_TO_LIST: {
      return {
        ...state,
        list: {
          ...state.list,
          listItems: payload,
        },
        loading: false,
      };
    }
    case LIST_ITEM_SUCCESS: {
      return {
        ...state,
        list: payload,
      };
    }
    case LIST_ITEM_PROBLEM: {
      return {
        ...state,
        list: payload,
      };
    }
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
      };
    // case actionTypes.CREATE_LIST:
    //   return {
    //     ...state,
    //     lists: [action.payload, ...state.lists],
    //   };
    default:
      return state;
  }
}
