import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    background: 'rgba(66,66,66,0.25)',
    border: '1px solid rgba(255,105,180,0.2)',
    boxShadow: '3px 3px 15px rgba(255,105,180,0.2)',
  },
  container: {
    padding: theme.spacing(1),
  },
}));

const PageContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item xs={12} sm={8} md={6}>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PageContainer;
