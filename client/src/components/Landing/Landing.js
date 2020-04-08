import React from 'react';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SlPlaceholder from '../../assets/slplaceholder.jpg';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SignInTab from './SignInTab';
import SignUpTab from './SignUpTab';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

const TabPanel = ({ children, value, index, other }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      // @TODO check this
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles(
  (theme) => (
    console.log(theme),
    console.log(theme.palette.text.primary),
    {
      root: {
        height: '100vh',
      },
      image: {
        backgroundImage: `url(${SlPlaceholder})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light'
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      paper: {
        margin: theme.spacing(2, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      signIn: {
        width: '100%',
        textAlign: 'left',
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      title: {
        margin: theme.spacing(0, 0, 8),
        width: '100%',
        textAlign: 'left',
      },
      tabs: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none',
      },
      tabText: {
        color: theme.palette.text.primary,
      },
    }
  ),
);

const Landing = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const auth = useSelector((state) => state.auth.isAuth);
  const theme = useTheme();
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    console.log(event);
  };
  // @TODO - still glimpse page - remove this
  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography className={classes.title} component="h1" variant="h4">
            Shared Shopping Lists
          </Typography>

          <Grid container>
            <Grid item xs={12}>
              <AppBar
                className={classes.tabs}
                position="static"
                color="default"
              >
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="sign in and sign up tabs"
                >
                  <Tab
                    className={classes.tabText}
                    label="Sign In"
                    {...a11yProps(0)}
                  />
                  <Tab
                    className={classes.tabText}
                    label="Sign Up"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </AppBar>
            </Grid>
          </Grid>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <SignInTab />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <SignUpTab />
          </TabPanel>
        </div>
      </Grid>
    </Grid>
  );
};

export default Landing;
