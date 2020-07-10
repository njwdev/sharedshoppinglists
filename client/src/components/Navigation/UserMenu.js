import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
//Material UI components
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
//Icons
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded';

const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const UserMenu = ({ logoutHandler }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { link: '/about', text: 'About' },
    { link: '/settings', text: 'Settings' },
  ];

  return (
    <div>
      <IconButton
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'>
        <AccountCircleRounded />
      </IconButton>
      <Menu
        id='menu-appbar'
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
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {menuItems.map((item) => (
          <MenuItem key={item.text} onClick={handleClose}>
            <NavLink className={classes.navLink} to={item.link}>
              {item.text}
            </NavLink>
          </MenuItem>
        ))}
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

UserMenu.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
};

export default UserMenu;
