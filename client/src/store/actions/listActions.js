import {
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  FETCH_ALL_LISTS,
  FETCH_ALL_LISTS_FAIL,
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

export const createList = ({ title, sharedWith }) => async (dispatch) => {
  const { id } = sharedWith;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ title, id });
  console.log(body);
  try {
    const res = await axios.post('/api/lists', body, config);
    console.log(res.data);
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
    console.log(error);
    dispatch({
      type: CREATE_LIST_FAIL,
    });
  }
};

// export const createProfile = (
//   { name, location },
//   history,
//   update = false,
// ) => async (dispatch) => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   console.log(update);
//   const body = JSON.stringify({ name, location });
//   try {
//     const res = await axios.post('/api/profile', body, config);
//     if (!update) {
//       dispatch({
//         type: CREATE_PROFILE_SUCCESS,
//         payload: res.data,
//       });
//       dispatch(showAlert(true, 'Profile created!', 'success'));
//     } else {
//       dispatch({
//         type: UPDATE_PROFILE_SUCCESS,
//         payload: res.data,
//       });
//       dispatch(showAlert(true, 'Profile updated!', 'success'));
//       history.push('/dashboard');
//     }
//   } catch (error) {
//     const errors = await error.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
//     }
//     console.log(error);
//     dispatch({
//       type: CREATE_PROFILE_FAIL,
//     });
//   }
// };
