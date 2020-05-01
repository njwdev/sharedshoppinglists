import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const auth = useSelector((state) => state.auth.isAuth);
  const loading = useSelector((state) => state.auth.loading);
  if (!auth && !loading) {
    return <Redirect to="/" />;
  } else {
    return <Route {...props} />;
  }
};

export default PrivateRoute;
