import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
import About from '../Pages/About';

import PrivateRoute from './PrivateRoute';
import Dashboard from '../Dashboard/Dashboard';
import Settings from '../Pages/Settings';

import UpdateProfile from '../Profile/UpdateProfile';
import DetailedListView from '../Lists/ListViews/DetailedListView';
import ActiveLists from '../Pages/ActiveLists';
import PastLists from '../Pages/PastLists';

import RedirectToNotFound from '../../utils/RedirectToNotFound';

const Routes = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <PrivateRoute exact path='/about' component={About}></PrivateRoute>
        <PrivateRoute
          exact
          path='/lists/:id'
          component={DetailedListView}></PrivateRoute>
        <PrivateRoute
          exact
          path='/dashboard'
          component={Dashboard}></PrivateRoute>
        <PrivateRoute
          exact
          path='/active-lists'
          component={ActiveLists}></PrivateRoute>
        <PrivateRoute
          exact
          path='/past-lists'
          component={PastLists}></PrivateRoute>
        <PrivateRoute
          exact
          path='/settings'
          component={Settings}></PrivateRoute>
        <PrivateRoute
          exact
          path='/update-profile'
          component={UpdateProfile}></PrivateRoute>
        <Route component={RedirectToNotFound}></Route>
      </Switch>
    </>
  );
};

export default Routes;
