import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../store/actions/profileActions';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { Typography, Button } from '@material-ui/core';
import PageContainer from '../Layout/PageContainer';
import PageHeader from '../Layout/PageHeader';
import CreateProfile from '../Profile/CreateProfile';
import Lists from '../Lists/Lists';

const Dashboard = () => {
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProfile = async () => {
      await dispatch(getCurrentProfile());
    };
    getProfile();
    setDashboardLoading(false);
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  const [showLists, setShowLists] = useState(false);

  const { profile, loading } = useSelector((state) => state.profile);

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
      <CreateProfile />
    </>
  );

  return (loading && profile === null) || dashboardLoading || !user ? (
    <Spinner />
  ) : (
    <>
      <PageHeader title="Dashboard"></PageHeader>
      <PageContainer>
        <Typography variant="h5">
          Welcome {user && user.name} to Shared Shopping Lists
        </Typography>
        {profile !== null ? hasProfile : noProfile}

        <Button onClick={() => setShowLists(!showLists)}>Show Lists</Button>
        {showLists ? <Lists /> : null}
      </PageContainer>
    </>
  );
};

export default Dashboard;
