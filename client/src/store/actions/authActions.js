import axios from 'axios';
import { showAlert } from './alertActions';
import * as actionTypes from './actionTypes';
import setAuthToken from '../../utils/setAuthToken';
import { getCurrentProfile } from './profileActions';
// import { clearProfile } from './profileActions';

export const loadUser = () => async (dispatch) => {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: actionTypes.USER_LOADED, payload: res.data });
    // get profile too
  } catch (error) {
    dispatch({ type: actionTypes.AUTH_ERROR });
  }
};

//Sign up user

export const signUpUser = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: actionTypes.SIGN_UP_USER_SUCCESS,
      payload: res.data,
    });
    dispatch(showAlert(true, 'Sign up successful!', 'success'));
    dispatch(loadUser());
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    console.log(error);
    dispatch({
      type: actionTypes.SIGN_UP_USER_FAIL,
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
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(showAlert(true, 'Sign in successful!', 'success'));
  } catch (error) {
    const errors = await error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(showAlert(true, error.msg, 'error')));
    }
    console.log(error);
    dispatch({
      type: actionTypes.LOGIN_FAIL,
    });
  }
};

//Logout
export const logout = () => (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_PROFILE });
  dispatch({ type: actionTypes.LOGOUT });
  dispatch(showAlert(true, 'Logout successful', 'success'));
};
