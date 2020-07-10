import { combineReducers } from 'redux';
import userReducer from './userReducer';
import listReducer from './listReducer';
import alertReducer from './alertReducer';
import profilesReducer from './profilesReducer';

export default combineReducers({
  list: listReducer,
  user: userReducer,
  alert: alertReducer,
  profiles: profilesReducer,
});
