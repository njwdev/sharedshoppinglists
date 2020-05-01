import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
import Lists from '../Lists/Lists';
import About from '../Pages/About';

import NotFound from '../Pages/NotFound';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Dashboard/Dashboard';
import EditProfile from '../Profile/EditProfile';

const Routes = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <PrivateRoute exact path="/about" component={About}></PrivateRoute>
        <PrivateRoute exact path="/lists" component={Lists}></PrivateRoute>
        <PrivateRoute exact path="/editprofile" component={EditProfile} />
        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
        ></PrivateRoute>
        <Route component={NotFound}></Route>
      </Switch>
    </>
  );
};

export default Routes;
