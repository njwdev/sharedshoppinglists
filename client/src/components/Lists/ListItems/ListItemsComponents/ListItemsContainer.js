import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  //background: initial applies distinct background depending on completed or past list
  paper: { background: 'initial' },
}));

const ListItemsContainer = ({ children }) => {
  const classes = useStyles();
  return <Paper className={classes.paper}>{children}</Paper>;
};

ListItemsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListItemsContainer;
