import { combineReducers } from 'redux';
import authReducer from './authReducer';
import listReducer from './listReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  list: listReducer,
  auth: authReducer,
  alert: alertReducer,
});
