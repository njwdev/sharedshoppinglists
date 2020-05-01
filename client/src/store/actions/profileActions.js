import axios from 'axios';
import { showAlert } from './alertActions';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  CLEAR_PROFILE,
  FETCH_ALL_PROFILES_SUCCESS,
  FETCH_ALL_PROFILES_FAIL,
} from './actionTypes';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createProfile = (
  { name, location },
  history,
  update = false,
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(update);
  const body = JSON.stringify({ name, location });
  try {
    const res = await axios.post('/api/profile', body, config);
    if (!update) {
      dispatch({
        type: CREATE_PROFILE_SUCCESS,
        payload: res.data,
      });
      dispatch(showAlert(true, 'Profile created!', 'success'));
    } else {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data,
      });
      dispatch(showAlert(true, 'Profile updated!', 'success'));
      history.push('/dashboard');
    }
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    console.log(error);
    dispatch({
      type: CREATE_PROFILE_FAIL,
    });
  }
};

export const clearProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  console.log('profile cleared');
};

export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/');
    console.log(res);
    dispatch({ type: FETCH_ALL_PROFILES_SUCCESS, payload: res.data });
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({ type: FETCH_ALL_PROFILES_FAIL });
  }
};
