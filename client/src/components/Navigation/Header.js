import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  branding: {
    flexGrow: 1,
  },
  navLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  active: {
    textDecoration: 'underline',
    animationName: '$activeUnderline',
    animationDuration: '0.5s',
  },
  '@keyframes activeUnderline': {
    from: { textDecorationColor: 'rgba(255,255,255,0)' },
    to: { textDecorationColor: 'rgba(255,255,255,1)' },
  },
});

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

const Header = props => {
  const classes = useStyles();

  return (
    <Fragment>
      <HideOnScroll {...props}>
        <AppBar className={classes.root}>
          <Toolbar>
            <div className={classes.branding}>
              <NavLink
                exact
                activeClassName={classes.active}
                className={classes.navLink}
                to="/"
              >
                <Typography variant="h6">{props.branding}</Typography>
              </NavLink>
            </div>
            <NavLink
              exact
              className={classes.navLink}
              activeClassName={classes.active}
              to="/about"
            >
              <Typography variant="h6">About</Typography>
            </NavLink>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      {/* Ensures no content behind fixed appbar */}
    </Fragment>
  );
};

Header.propTypes = {
  branding: PropTypes.string,
};
export default Header;
