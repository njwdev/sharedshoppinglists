import {
  FETCH_ALL_PROFILES_SUCCESS,
  FETCH_ALL_PROFILES_FAIL,
} from '../actions/actionTypes';

const initialState = {
  profiles: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_PROFILES_SUCCESS: {
      return {
        ...state,
        profiles: payload,
      };
    }
    case FETCH_ALL_PROFILES_FAIL: {
      return {
        ...state,
        profiles: null,
      };
    }
    default:
      return state;
  }
}
