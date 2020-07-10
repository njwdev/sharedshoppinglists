import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  itemActionType: {
    fontSize: '0.6rem',
    marginLeft: theme.spacing(1),
  },
  itemActionUser: {
    fontWeight: 'bold',
  },
}));

const ListItemActionInfo = ({
  itemActionType,
  itemActionUser,
  itemActionDate,
}) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.itemActionType} variant='caption'>
          {itemActionType}{' '}
          <span className={classes.itemActionUser}>{itemActionUser}</span>
        </Typography>{' '}
        -{' '}
        <Typography
          className={classes.itemActionDate}
          style={{ fontSize: '0.6rem' }}
          variant='caption'>
          <Moment format='MMMM Do YYYY, [at] HH:mm'>{itemActionDate}</Moment>
        </Typography>
      </Grid>
    </Grid>
  );
};

ListItemActionInfo.propTypes = {
  itemActionType: PropTypes.string.isRequired,
  itemActionUser: PropTypes.string.isRequired,
  itemActionDate: PropTypes.string.isRequired,
};

export default ListItemActionInfo;
