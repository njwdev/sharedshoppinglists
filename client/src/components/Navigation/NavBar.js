import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { updateProfile } from '../../store/actions/profileActions';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness3 from '@material-ui/icons/Brightness3';
import WbSunny from '@material-ui/icons/WbSunny';
import LogoAvatar from '../Layout/LogoAvatar';
import { useNumberOfLists } from '../../hooks/useLists';
import HideOnScroll from './HideOnScroll';
import NavSideDrawer from './NavSideDrawer';
import UserMenu from './UserMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: { flexGrow: 1 },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const [activeListsNumber, pastListsNumber] = useNumberOfLists();
  const [profileData, setProfileData] = useState({});
  const [isDarkMode, setIsDarkMode] = useState();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData(user.profile);
      setIsDarkMode(profileData.darkMode);
    }
  }, [user, profileData.darkMode]);

  const toggleDrawer = (openSideDrawer) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpenSideDrawer(!openSideDrawer);
  };

  let darkModeMsg;

  isDarkMode
    ? (darkModeMsg = 'Light mode activated')
    : (darkModeMsg = 'Dark Mode activated');

  const toggleDarkMode = async () => {
    await dispatch(
      updateProfile({ ...profileData, darkMode: !isDarkMode }, darkModeMsg)
    );
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(false)}>
              <MenuIcon />
            </IconButton>
            <NavSideDrawer
              toggleDrawer={() => toggleDrawer(true)}
              activeListsNumber={activeListsNumber}
              pastListsNumber={pastListsNumber}
              openSideDrawer={openSideDrawer}
              setOpenSideDrawer={() => setOpenSideDrawer(false)}
            />

            <div className={classes.title}>
              <NavLink className={classes.navLink} to='/dashboard'>
                <LogoAvatar className={classes.title} />
              </NavLink>
            </div>

            <div style={{ display: 'flex' }}>
              {user && user.profile.initialProfileComplete ? (
                user && isDarkMode === false ? (
                  <IconButton onClick={toggleDarkMode} color='inherit'>
                    <Brightness3 />
                  </IconButton>
                ) : (
                  <IconButton onClick={toggleDarkMode} color='inherit'>
                    <WbSunny />
                  </IconButton>
                )
              ) : null}

              <UserMenu logoutHandler={logoutHandler} />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {/* Ensures no text behind toolbar */}
      <Toolbar />
    </div>
  );
};

NavBar.propTypes = {
  children: PropTypes.node,
};

export default NavBar;
