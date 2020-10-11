import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSharedWith } from '../../../../hooks/useList';
import Typography from '@material-ui/core/Typography';
import { useTheme, IconButton } from '@material-ui/core';
import SettingsRounded from '@material-ui/icons/SettingsRounded';
import EditSharedWith from './EditSharedWith';
import { useCreator } from '../../../../hooks/useCreator';

const SharedWith = ({ list, user }) => {
  
  const [sharedWith] = useSharedWith(list, user);
  const [dialogOpen, setDialogOpen] = useState(false);
  const creator = useCreator(list, user);

  const sharedWithDialogOpenHandler = () => {
    setDialogOpen(true);
  };
  const sharedWithDialogCloseHandler = () => {
    setDialogOpen(false);
  };
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
      {creator ? (
        <IconButton onClick={() => sharedWithDialogOpenHandler()} size='small'>
          <SettingsRounded fontSize='inherit' />
        </IconButton>
      ) : null}
      {dialogOpen ? (
        <EditSharedWith
          list={list}
          handleDialogClose={sharedWithDialogCloseHandler}
          dialogOpen={dialogOpen}
          sharedWith={sharedWith}
        />
      ) : null}
    </>
  );
};

SharedWith.propTypes = {
  list: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default SharedWith;
