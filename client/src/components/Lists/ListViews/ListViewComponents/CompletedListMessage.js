import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  completedList: {
    background: theme.palette.info.main,
    margin: theme.spacing(1, 0),
  },
}));

const CompletedListMessage = ({ completionDate }) => {
  const classes = useStyles();
  return (
    <div className={classes.completedList}>
      <Typography variant='caption'>
        This list was completed on {''}
        <Moment format='MMMM Do YYYY, [at] HH:mm'>{completionDate}</Moment>
      </Typography>
    </div>
  );
};

CompletedListMessage.propTypes = {
  completionDate: PropTypes.string.isRequired,
};

export default CompletedListMessage;
