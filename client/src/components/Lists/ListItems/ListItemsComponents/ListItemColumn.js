import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(1),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  actionIcons: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));
const ListItemColumn = ({ children, actionIcons, completedList }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={completedList ? 6 : 4}
      className={`${classes.content} ${actionIcons && classes.actionIcons}`}>
      <Typography
        className={`${actionIcons && classes.actionIcons}`}
        variant='subtitle2'>
        {children}
      </Typography>
    </Grid>
  );
};

ListItemColumn.propTypes = {
  children: PropTypes.node.isRequired,
  completedList: PropTypes.bool,
  actionIcons: PropTypes.bool,
};

export default ListItemColumn;
