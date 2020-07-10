import {
  FETCH_ALL_PROFILES_SUCCESS,
  FETCH_ALL_PROFILES_FAIL,
} from '../actions/actionTypes';

const initialState = {
  profiles: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
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
    default:
      return state;
  }
}
