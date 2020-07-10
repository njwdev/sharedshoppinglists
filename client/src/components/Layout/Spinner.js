import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    margin: '20% auto',
    width: theme.spacing(8),
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={80} thickness={7.2} />
    </div>
  );
}
