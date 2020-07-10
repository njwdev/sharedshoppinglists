import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { isAuth } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  if (!isAuth && !loading) {
    return <Redirect to='/' />;
  } else {
    return <Route {...props} />;
  }
};

export default PrivateRoute;
