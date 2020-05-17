import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  FETCH_ALL_PROFILES_SUCCESS,
  FETCH_ALL_PROFILES_FAIL,
} from '../actions/actionTypes';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case CREATE_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    }
    case FETCH_ALL_PROFILES_SUCCESS: {
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    }
    case FETCH_ALL_PROFILES_FAIL: {
      return {
        ...state,
        profiles: null,
        loading: false,
      };
    }
    case PROFILE_ERROR: {
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    }

    case UPDATE_PROFILE_FAIL: {
      return {
        ...state,
        profile: null,
        profiles: [],
        loading: false,
        error: payload,
      };
    }
    case CLEAR_PROFILE: {
      return {
        ...state,
        profile: null,
        loading: false,
      };
    }
    default:
      return state;
  }
}
