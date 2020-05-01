import React, { useState } from 'react';
// import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import LogoAvatar from '../Layout/LogoAvatar';
import Add from '@material-ui/icons/Add';
import FormatListBulletedRounded from '@material-ui/icons/FormatListBulletedRounded';

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
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },

  title: { flexGrow: 1 },
}));

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const NavBar = (props) => {
  const classes = useStyles();
  const { loading, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const toggleDrawer = (openSideDrawer) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenSideDrawer(!openSideDrawer);
  };

  const drawerData = [
    {
      icon: <Add />,
      text: 'Add List',
    },
    {
      icon: <FormatListBulletedRounded />,
      text: 'Active Lists',
    },
    {
      icon: (
        <FormatListBulletedRounded
          style={{
            opacity: '0.2',
          }}
        />
      ),
      text: 'Past Lists',
    },
  ];

  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(false)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={'left'}
              open={openSideDrawer}
              onClose={toggleDrawer(true)}
            >
              <List>
                <div>
                  {drawerData.map((item, index) => (
                    <div key={item.text}>
                      <ListItem button>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </div>
              </List>
            </Drawer>
            <div className={classes.title}>
              <NavLink className={classes.navLink} to="/dashboard">
                <LogoAvatar className={classes.title} />
              </NavLink>
            </div>

            {!loading && isAuth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <NavLink className={classes.navLink} to="/about">
                      About
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {/* Ensures no text behing toolbar */}
      <Toolbar />
    </div>
  );
};

export default NavBar;
