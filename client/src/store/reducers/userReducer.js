import {
  //Auth
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  SIGN_UP_USER_FAIL,
  SIGN_UP_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTH_ERROR,
  //Profile
  UPDATE_PROFILE_SUCCESS,
  GET_PROFILE_SUCCESS,
  CREATE_PROFILE_SUCCESS,
  CLEAR_PROFILE,
  UPDATE_PROFILE_FAIL,
} from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
      };
    }

    case SIGN_UP_USER_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
    case LOGIN_SUCCESS: {
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false,
      };
    }
    case GET_PROFILE_SUCCESS:
    case CREATE_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        user: { ...state.user, profile: payload },
        loading: false,
      };
    }
    case SIGN_UP_USER_FAIL:
    case LOGOUT_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case USER_LOADED_FAIL:
    case UPDATE_PROFILE_FAIL:
    case CLEAR_PROFILE:
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        user: null,
        error: payload,
      };
    }
    case CHANGE_PASSWORD_FAIL: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
