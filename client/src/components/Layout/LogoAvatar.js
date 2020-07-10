import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import logo from '../../assets/logos/SSL_IMAGE.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: theme.spacing(6),
    height: theme.spacing(5),
  },
}));

const LogoAvatar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar
        src={logo}
        imgProps={{ style: { objectFit: 'contain' } }}
        variant='rounded'
        className={classes.avatar}></Avatar>
    </div>
  );
};

export default LogoAvatar;
