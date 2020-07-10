import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../Layout/Spinner';
import WelcomePage from '../Pages/WelcomePage';

const Dashboard = () => {
  const { user, loading } = useSelector((state) => state.user);
  return loading || (user && !user.profile) ? (
    <Spinner />
  ) : user && user.profile.initialProfileComplete ? (
    <Redirect to='/active-lists' />
  ) : (
    <>
      <WelcomePage />
    </>
  );
};

export default Dashboard;
