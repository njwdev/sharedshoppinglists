import React from 'react';
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import listReducer from './listReducer';

export default combineReducers({
  list: listReducer,
  auth: authReducer,
});
