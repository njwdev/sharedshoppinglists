import React from 'react';
import PropTypes from 'prop-types';
import { useSharedWith } from '../../../../hooks/useList';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core';

const SharedWith = ({ list, user }) => {
  const [sharedWith] = useSharedWith(list, user);
  const theme = useTheme();
  return (
    <>
      <Typography display='inline' variant='caption'>
        Shared with: {''}
      </Typography>
      {sharedWith.length ? (
        sharedWith.map((user, index) => (
          <Typography
            key={user._id}
            style={{ color: theme.palette.primary.light }}
            variant='caption'>
            {user.name}
            {index === sharedWith.length - 1 ? null : ','} {''}
          </Typography>
        ))
      ) : (
        <Typography variant='caption'>No one</Typography>
      )}
    </>
  );
};

SharedWith.propTypes = {
  list: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default SharedWith;
