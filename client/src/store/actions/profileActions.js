import axios from 'axios';
import { showAlert } from './alertActions';
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  CLEAR_PROFILE,
  FETCH_ALL_PROFILES_SUCCESS,
  FETCH_ALL_PROFILES_FAIL,
} from './actionTypes';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/me');
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const updateProfile = ({ ...formData }, updateType, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ ...formData, initialProfileComplete: true });

  try {
    const res = await axios.post('/api/users/profile', body, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data.profile,
    });
    dispatch(showAlert(true, updateType || 'Profile updated!', 'success'));
    if (history) history.push('/');
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }

    dispatch({
      type: UPDATE_PROFILE_FAIL,
    });
  }
};

export const clearProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};

export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/profiles');

    dispatch({ type: FETCH_ALL_PROFILES_SUCCESS, payload: res.data });
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({ type: FETCH_ALL_PROFILES_FAIL });
  }
};
