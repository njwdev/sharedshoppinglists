import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: '1px 1px 2px rgba(255,105,180,0.2)',
    margin: theme.spacing(0.1, 0),
  },
}));

const ListItemContainer = ({ backgroundStyle, children }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.container}
      container
      style={{
        background: backgroundStyle,
      }}>
      {children}
    </Grid>
  );
};

ListItemContainer.propTypes = {
  backgroundStyle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ListItemContainer;
