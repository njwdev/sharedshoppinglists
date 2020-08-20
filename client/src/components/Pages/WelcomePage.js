import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { Typography, Button, Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PageContainer from '../Layout/PageContainer';
import { loadUser } from '../../store/actions/authActions';
import logo from '../../assets/logos/SSL_LOGO.png';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    animation: `$imageFade 2s`,
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.common.white,
  },
  appDescription: {
    margin: theme.spacing(1, 0),
  },
  logo: {
    alignSelf: 'center',
    height: 'auto',
    width: '100%',
    maxWidth: '300px',
  },
  welcomeMessage: {
    margin: theme.spacing(2, 0),
  },
  button: {
    marginTop: theme.spacing(4),
  },
  '@keyframes imageFade': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  userName: {
    color: theme.palette.primary.light,
  },
}));

const WelcomePage = () => {
  const classes = useStyles();
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getProfile = async () => {
      await dispatch(loadUser());
    };
    getProfile();
    setDashboardLoading(false);
  }, [dispatch]);

  return (dashboardLoading && user.profile === null) ||
    dashboardLoading ||
    !user ? (
    <Spinner />
  ) : (
    <>
      <PageContainer pageTitle='Welcome'>
        <Grid container className={classes.imageContainer}>
          {/* <Grid xs={12} item> */}
          <img
            alt='Shared Shopping Lists logo'
            className={classes.logo}
            src={logo}
          />
        </Grid>
        {/* </Grid> */}
        <div style={{ justifyContent: 'center' }}>
          <Typography className={classes.welcomeMessage} variant='h6'>
            Welcome{' '}
            <span className={classes.userName}>
              {user && user.profile.name}
            </span>{' '}
            to Shared Shopping Lists
          </Typography>
          <Divider></Divider>
          <Typography className={classes.appDescription} variant='subtitle2'>
            Shared Shopping Lists provides a solution to better coordinate your
            shopping trips
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              component={Link}
              to={'/update-profile'}
              className={classes.button}
              variant='contained'
              color='primary'>
              Get Started
            </Button>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default WelcomePage;
