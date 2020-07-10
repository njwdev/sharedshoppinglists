import axios from 'axios';
import { showAlert } from './alertActions';
import {
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CLEAR_PROFILE,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from './actionTypes';

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: USER_LOADED_FAIL });
  }
};

//Sign up user

export const signUpUser = ({ name, email, password, darkMode }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password, darkMode });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: SIGN_UP_USER_SUCCESS,
      payload: res.data,
    });
    dispatch(showAlert(true, 'Sign up successful!', 'success'));
    dispatch(loadUser());
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }

    dispatch({
      type: SIGN_UP_USER_FAIL,
    });
  }
};

//Login

export const loginUser = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(showAlert(true, 'Sign in successful!', 'success'));
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Change password

export const changePassword = ({
  userEmail,
  oldPassword,
  newPassword,
  confirmNewPassword,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    userEmail,
    oldPassword,
    newPassword,
    confirmNewPassword,
  });

  try {
    const res = await axios.post('/api/auth/change-password', body, config);
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: res.data,
    });
    // dispatch(loadUser());
    dispatch(showAlert(true, 'Password Changed!', 'success'));
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
    });
  }
};

//Logout
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch(showAlert(true, 'Logout successful', 'success'));
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};
