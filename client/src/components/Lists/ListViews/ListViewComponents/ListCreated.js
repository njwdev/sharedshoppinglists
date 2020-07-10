import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Typography from '@material-ui/core/Typography';

const ListCreated = ({ list }) => {
  return (
    <>
      <Typography display='inline' variant='caption'>
        List created: {''}{' '}
        <Moment format='MMMM Do YYYY, [at] HH:mm'>{list.dateCreated}</Moment>
      </Typography>
    </>
  );
};

ListCreated.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListCreated;
