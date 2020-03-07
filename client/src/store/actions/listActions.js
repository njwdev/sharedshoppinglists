import * as actionTypes from './actionTypes';

export const fetchList = () => {
  return {
    type: actionTypes.FETCH_LIST,
  };
};

export const deleteList = id => {
  return {
    type: actionTypes.DELETE_LIST,
    payload: id,
  };
};

export const createList = list => {
  return {
    type: actionTypes.CREATE_LIST,
    payload: list,
  };
};
