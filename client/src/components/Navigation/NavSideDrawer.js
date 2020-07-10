import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//Material UI Components
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//Icons
import FormatListBulletedRounded from '@material-ui/icons/FormatListBulletedRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  pastListsIcon: {
    opacity: '0.2',
  },
}));

const NavSideDrawer = ({
  toggleDrawer,
  activeListsNumber,
  pastListsNumber,
  openSideDrawer,
  setOpenSideDrawer,
}) => {
  const classes = useStyles();
  const drawerData = [
    {
      badgeContent: activeListsNumber,
      icon: <FormatListBulletedRounded />,
      text: 'Active Lists',
      link: '/active-lists',
    },
    {
      badgeContent: pastListsNumber,
      icon: <FormatListBulletedRounded className={classes.pastListsIcon} />,
      text: 'Past Lists',
      link: '/past-lists',
    },
  ];
  return (
    <>
      <Drawer
        anchor={'left'}
        open={openSideDrawer}
        onClose={toggleDrawer(true)}>
        <List>
          <>
            {drawerData.map((item) => (
              <div key={item.text}>
                <Link className={classes.navLink} to={item.link}>
                  <ListItem button onClick={setOpenSideDrawer}>
                    <ListItemIcon>
                      <Badge badgeContent={item.badgeContent}>
                        {item.icon}
                      </Badge>
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Link>
                <Divider />
              </div>
            ))}
          </>
        </List>
      </Drawer>
    </>
  );
};

NavSideDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  activeListsNumber: PropTypes.number.isRequired,
  pastListsNumber: PropTypes.number.isRequired,
  openSideDrawer: PropTypes.bool.isRequired,
  setOpenSideDrawer: PropTypes.func.isRequired,
};

export default NavSideDrawer;
