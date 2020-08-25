import {
  ADD_ITEM_TO_LIST_SUCCESS,
  ADD_ITEM_TO_LIST_FAIL,
  LIST_ITEM_SUCCESS_SUCCESS,
  LIST_ITEM_SUCCESS_FAIL,
  LIST_ITEM_PROBLEM_SUCCESS,
  LIST_ITEM_PROBLEM_FAIL,
  LIST_ITEM_DELETE_SUCCESS,
  LIST_ITEM_DELETE_FAIL,
  LIST_USER_REMOVED_SUCCESS,
  LIST_USER_REMOVED_FAIL,
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
  UPDATE_SHARED_WITH_SUCCESS,
  UPDATE_SHARED_WITH_FAIL,
} from './actionTypes';
import { showAlert } from './alertActions';
import axios from 'axios';

//*********ALL LISTS****************

// Desc: Fetches all lists for list overviews. Used in active lists and past lists via useLists() hook.

export const fetchLists = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/lists');
    dispatch({ type: FETCH_ALL_LISTS_SUCCESS, payload: res.data });
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({ type: FETCH_ALL_LISTS_FAIL });
  }
};

//*********INDIVIDUAL LIST****************

//Desc: Fetches an individual list. Used for detailed list view via useList() hook.

export const fetchList = (id, isRefresh) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/lists/${id}`);
    dispatch({ type: FETCH_LIST_SUCCESS, payload: res.data });
    if (isRefresh) dispatch(showAlert(true, 'List refreshed', 'info'));
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({ type: FETCH_LIST_FAIL });
  }
};

// Desc: Creates a new list. Used in active lists.
export const createList = ({ title, sharedWith }) => async (dispatch) => {
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

//Desc: Updates the list title. Used in detailed list view.

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
      type: UPDATE_LIST_SUCCESS,
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

//Desc: Completes the list, which converts it from an active list to a past list.
//Used in both list overview and detailed list view.

export const completeList = (id, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ complete: true });

  try {
    const res = await axios.put(`/api/lists/${id}/complete-list`, body, config);
    dispatch({
      type: COMPLETE_LIST_SUCCESS,
      payload: res.data,
    });
    dispatch(showAlert(true, 'List archived!', 'info'));
    history.push('/');
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: COMPLETE_LIST_FAIL,
    });
  }
};

//Desc: Updates the sharedWith array.
//Used in sharedWithSettings.

export const updateSharedWith = (listId, sharedWith) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(sharedWith);
  const body = JSON.stringify({ listId, sharedWith });
  console.log(body);
  try {
    const res = await axios.put('/api/lists/update-list-users', body, config);
    dispatch({
      type: UPDATE_SHARED_WITH_SUCCESS,
      payload: res.data,
    });
    dispatch(showAlert(true, 'List updated!', 'success'));
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: UPDATE_SHARED_WITH_FAIL,
    });
  }
};

export const removeListUser = (userId, listId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/lists/${listId}/${userId}/remove`);
    dispatch({ type: LIST_USER_REMOVED_SUCCESS, payload: res.data });
    dispatch(showAlert(true, 'List user removed!', 'success'));
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: LIST_USER_REMOVED_FAIL,
    });
  }
};

//Desc: Reactivates list - moving it from past list to active list.
//Used in completed list overview and completed detailed list view

export const reactivateList = (id, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ complete: false });

  try {
    const res = await axios.put(
      `/api/lists/${id}/reactivate-list`,
      body,
      config
    );
    dispatch({
      type: REACTIVATE_LIST_SUCCESS,
      payload: res.data,
    });
    dispatch(showAlert(true, 'List Reactivated!', 'info'));
    history.push('/');
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: REACTIVATE_LIST_FAIL,
    });
  }
};

//Desc: Deletes list from database.
//Used in completed list overview and completed detailed list view

export const deleteList = (id, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/lists/${id}`);
    dispatch({ type: DELETE_LIST_SUCCESS, payload: id });
    dispatch(showAlert(true, 'List deleted!', 'success'));
    const { pathname } = history.location;

    history.go(pathname);
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({ type: DELETE_LIST_FAIL });
  }
};

//*********LIST ITEMS****************

//Desc: Adds an item to an individual list. Used in AddItem component.

export const addListItem = (id, userName, { itemName, quantity }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ userName, itemName, quantity });
  try {
    const res = await axios.put(`/api/lists/${id}`, body, config);
    dispatch({ type: ADD_ITEM_TO_LIST_SUCCESS, payload: res.data });
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

//Desc: Puts a list item into the success category, or with undo moves it back to the
// items to get category. Used in ListItems component.

export const listItemSuccess = (id, itemId, userName, undo) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let body;
  if (undo)
    body = JSON.stringify({ success: false, name: userName, undo: true });
  else body = JSON.stringify({ success: true, name: userName });
  try {
    const res = await axios.put(
      `/api/lists/${id}/${itemId}/success`,
      body,
      config
    );
    dispatch({ type: LIST_ITEM_SUCCESS_SUCCESS, payload: res.data });
    dispatch(
      undo
        ? showAlert(true, 'Item restored to list', 'success')
        : showAlert(true, 'Item Got!', 'success')
    );
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: LIST_ITEM_SUCCESS_FAIL,
    });
  }
};

//Desc: Puts a list item into the problem category and allows user to give a reason
//for problem. Used in ListItems component.

export const listItemProblem = (
  id,
  itemId,
  userName,
  reason,
  optionalNote
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

  try {
    const res = await axios.put(
      `/api/lists/${id}/${itemId}/list-item-problem`,
      body,
      config
    );
    dispatch({ type: LIST_ITEM_PROBLEM_SUCCESS, payload: res.data });
    dispatch(showAlert(true, 'Problem noted!', 'success'));
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: LIST_ITEM_PROBLEM_FAIL,
    });
  }
};

//Desc: Deletes list item from the list.

export const listItemDelete = (id, itemId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/lists/${id}/${itemId}/delete`);
    dispatch({ type: LIST_ITEM_DELETE_SUCCESS, payload: res.data });
    dispatch(showAlert(true, 'Item Deleted!', 'success'));
    console.log('listItemDelete');
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: LIST_ITEM_DELETE_FAIL,
    });
  }
};
