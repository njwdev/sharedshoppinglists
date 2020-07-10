import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  divider: {
    background: `linear-gradient(to right, ${theme.palette.primary.main}, rgba(0,0,0,0))`,
  },
}));

const CustomDivider = () => {
  const classes = useStyles();
  return <Divider className={classes.divider} />;
};

export default CustomDivider;
