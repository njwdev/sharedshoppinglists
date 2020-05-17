import {
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  FETCH_LIST,
  FETCH_ALL_LISTS,
  FETCH_ALL_LISTS_FAIL,
  FETCH_LIST_FAIL,
  ADD_ITEM_TO_LIST,
  ADD_ITEM_TO_LIST_FAIL,
  UPDATE_LIST,
  UPDATE_LIST_FAIL,
  DELETE_LIST,
  DELETE_LIST_FAIL,
  LIST_ITEM_SUCCESS,
  LIST_ITEM_PROBLEM,
} from './actionTypes';
import { showAlert } from './alertActions';
import axios from 'axios';

export const fetchLists = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/lists');
    dispatch({ type: FETCH_ALL_LISTS, payload: res.data });
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({ type: FETCH_ALL_LISTS_FAIL });
  }
};

// export const deleteList = (id) => {
//   return {
//     type: actionTypes.DELETE_LIST,
//     payload: id,
//   };
// };

export const createList = ({ title, sharedWith }, history) => async (
  dispatch,
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ title, sharedWith });

  try {
    const res = await axios.post('/api/lists', body, config);

    dispatch({
      type: CREATE_LIST_SUCCESS,
      payload: res.data,
    });
    dispatch(showAlert(true, 'List created!', 'success'));
    // history.push('/lists');
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }

    dispatch({
      type: CREATE_LIST_FAIL,
    });
  }
};

//individual list

export const fetchList = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/lists/${id}`);
    dispatch({ type: FETCH_LIST, payload: res.data });
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({ type: FETCH_LIST_FAIL });
  }
};

export const addListItem = (id, { itemName, quantity }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ itemName, quantity });

  try {
    const res = await axios.put(`/api/lists/${id}`, body, config);
    dispatch({ type: ADD_ITEM_TO_LIST, payload: res.data });
    dispatch(showAlert(true, 'Item added to your list!', 'success'));
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }

    dispatch({
      type: ADD_ITEM_TO_LIST_FAIL,
    });
  }
};

//update list title

export const updateList = (id, { title }, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ title });

  try {
    const res = await axios.put(`/api/lists/${id}/edit-title`, body, config);
    dispatch({
      type: UPDATE_LIST,
      payload: res.data,
    });
    dispatch(showAlert(true, 'List name updated!', 'success'));
    history.push(`/lists/${id}`);
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: UPDATE_LIST_FAIL,
    });
  }
};

export const listItemSuccess = (id, itemId, userName, undo) => async (
  dispatch,
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let body;

  if (undo) body = JSON.stringify({ success: false, name: userName });
  else body = JSON.stringify({ success: true, name: userName });

  try {
    console.log(undo);
    const res = await axios.put(
      `/api/lists/${id}/${itemId}/success`,
      body,
      config,
    );
    dispatch({ type: LIST_ITEM_SUCCESS, payload: res.data });
    dispatch(
      undo
        ? showAlert(true, 'Item restored to list', 'success')
        : showAlert(true, 'Item Got!', 'success'),
    );
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: UPDATE_LIST_FAIL,
    });
  }
};

export const listItemProblem = (
  id,
  itemId,
  userName,
  reason,
  optionalNote,
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    fail: true,
    name: userName,
    reason: reason,
    optionalNote: optionalNote,
  });

  console.log(body);
  try {
    const res = await axios.put(
      `/api/lists/${id}/${itemId}/list-item-problem`,
      body,
      config,
    );
    dispatch({ type: LIST_ITEM_PROBLEM, payload: res.data });
    dispatch(showAlert(true, 'Problem noted!', 'success'));
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: UPDATE_LIST_FAIL,
    });
  }
};

export const removeSuccess = () => async (dispatch) => {
  try {
  } catch (error) {}
};

export const deleteList = (id, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/lists/${id}`);
    dispatch({ type: DELETE_LIST, payload: id });
    dispatch(showAlert(true, 'List deleted!', 'success'));
    history.push('/');
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({ type: DELETE_LIST_FAIL });
  }
};
