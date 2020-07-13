import {
  ADD_ITEM_TO_LIST_SUCCESS,
  ADD_ITEM_TO_LIST_FAIL,
  LIST_ITEM_DELETE_SUCCESS,
  LIST_ITEM_DELETE_FAIL,
  LIST_ITEM_SUCCESS_SUCCESS,
  LIST_ITEM_SUCCESS_FAIL,
  LIST_ITEM_PROBLEM_SUCCESS,
  LIST_ITEM_PROBLEM_FAIL,
  FETCH_ALL_LISTS_SUCCESS,
  FETCH_ALL_LISTS_FAIL,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAIL,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_FAIL,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAIL,
  COMPLETE_LIST_SUCCESS,
  COMPLETE_LIST_FAIL,
  REACTIVATE_LIST_SUCCESS,
  REACTIVATE_LIST_FAIL,
} from '../actions/actionTypes';

const initialState = {
  list: {
    title: '',
    listItems: [],
    listUsers: [],
  },
  lists: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    //**********ALL LISTS******/

    case FETCH_ALL_LISTS_SUCCESS:
      return {
        ...state.lists,
        lists: payload,
      };
    case FETCH_ALL_LISTS_FAIL:
      return {
        ...state,
        lists: null,
      };

    //*********INDIVIDUAL LIST*********/
    case CREATE_LIST_SUCCESS: {
      return {
        ...state,
        lists: [payload, ...state.lists],
      };
    }

    case DELETE_LIST_SUCCESS:
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
      };

    case CREATE_LIST_FAIL:
    case DELETE_LIST_FAIL: {
      return {
        ...state,
        lists: [...state.lists],
      };
    }

    case UPDATE_LIST_SUCCESS:
    case COMPLETE_LIST_SUCCESS:
    case REACTIVATE_LIST_SUCCESS:
    case FETCH_LIST_SUCCESS: {
      return {
        ...state,
        list: payload,
      };
    }
    case UPDATE_LIST_FAIL:
    case COMPLETE_LIST_FAIL:
    case REACTIVATE_LIST_FAIL:
    case FETCH_LIST_FAIL: {
      return {
        ...state,
        list: null,
      };
    }

    //**************LIST ITEMS**********/

    case ADD_ITEM_TO_LIST_SUCCESS: {
      return {
        ...state,
        list: {
          ...state.list,
          listItems: payload,
        },
      };
    }
    case LIST_ITEM_SUCCESS_SUCCESS: {
      return {
        ...state,
        list: payload,
      };
    }
    case LIST_ITEM_PROBLEM_SUCCESS: {
      return {
        ...state,
        list: payload,
      };
    }

    case LIST_ITEM_DELETE_SUCCESS: {
      return {
        ...state,
        list: payload,
      };
    }

    case ADD_ITEM_TO_LIST_FAIL:
    case LIST_ITEM_SUCCESS_FAIL:
    case LIST_ITEM_DELETE_FAIL:
    case LIST_ITEM_PROBLEM_FAIL: {
      return {
        ...state,
        list: { ...state.list },
      };
    }

    default:
      return state;
  }
}
