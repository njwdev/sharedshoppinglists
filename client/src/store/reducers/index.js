import { combineReducers } from 'redux';
import authReducer from './authReducer';
import listReducer from './listReducer';
import alertReducer from './alertReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  list: listReducer,
  auth: authReducer,
  alert: alertReducer,
  profile: profileReducer,
});
