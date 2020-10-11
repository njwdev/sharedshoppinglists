import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
//MUI Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import SignInTab from './SignInTab';
import SignUpTab from './SignUpTab';
import logo from '../../assets/logos/SSL_LOGO.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  background: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    maxWidth: '329px',
    maxHeight: '360px',
  },
  paper: {
    marginTop: '5%',
    padding: theme.spacing(0, 1),
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Landing = () => {
  const classes = useStyles();
  const { isAuth } = useSelector((state) => state.user);
  const [tab, setTab] = useState('1');
  const theme = useTheme();
  const handleTabChange = (e, value) => {
    setTab(value);
  };

  if (isAuth) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <TabContext value={tab}>
      <Grid container className={classes.root}>
        {/* Landing image section */}
        <Grid item xs={12} sm={6} md={6} className={classes.background}>
          <img
            className={classes.image}
            src={logo}
            alt='Shared Shopping List Logo'
          />
        </Grid>
        {/* Landing Auth section */}
        <Grid
          className={classes.authContent}
          item
          xs={12}
          sm={6}
          md={6}
          component={Paper}
          elevation={0}>
          <Paper elevation={0} className={classes.paper}>
            <Grid className={classes.paper} container>
              <Grid item xs={12}>
                <TabList
                  variant='fullWidth'
                  onChange={handleTabChange}
                  aria-label='sign in and sign up tabs'
                  indicatorColor='primary'
                  textColor='primary'>
                  <Tab className={classes.tabText} label='Sign In' value='1' />
                  <Tab className={classes.tabText} label='Sign Up' value='2' />
                </TabList>
              </Grid>
            </Grid>
            <TabPanel value='1' index={0} dir={theme.direction}>
              <SignInTab />
            </TabPanel>
            <TabPanel value='2' index={1} dir={theme.direction}>
              <SignUpTab />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </TabContext>
  );
};

export default Landing;
