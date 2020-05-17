import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { Typography, Button } from '@material-ui/core';
import PageContainer from '../Layout/PageContainer';
import PageHeader from '../Layout/PageHeader';
import UpdateProfile from '../Profile/UpdateProfile';
import Lists from '../Lists/Lists';
import { loadUser } from '../../store/actions/authActions';

const Dashboard = () => {
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [showLists, setShowLists] = useState(false);

  // const { profile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    const getProfile = async () => {
      await dispatch(loadUser());
    };
    getProfile();
    setDashboardLoading(false);
  }, [dispatch]);

  const hasProfile = (
    <>
      <p>Has profile</p>
      <p>
        Click<Link to="/editprofile">here</Link> to edit your profile.
      </p>
    </>
  );

  const noProfile = (
    <>
      <p>It seems you don't yet have a profile. Set one up here:</p>
      <UpdateProfile />
    </>
  );

  return (dashboardLoading && user.profile === null) ||
    dashboardLoading ||
    !user ? (
    <Spinner />
  ) : (
    <>
      <PageHeader title="Dashboard"></PageHeader>
      <PageContainer>
        <Typography variant="h5">
          Welcome {user && user.profile.name} to Shared Shopping Lists
        </Typography>
        {!user.profile.location ? noProfile : hasProfile}

        <Button onClick={() => setShowLists(!showLists)}>Show Lists</Button>
        {showLists ? <Lists /> : null}
      </PageContainer>
    </>
  );
};

export default Dashboard;
