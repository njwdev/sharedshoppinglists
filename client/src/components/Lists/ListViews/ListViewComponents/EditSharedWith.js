import React from 'react';
import PropTypes from 'prop-types';
import DialogBox from '../../../Layout/DialogBox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const EditSharedWith = ({
  dialogOpen,
  sharedWith,
  dialogContentText,

  handleDialogClose,
}) => {
  return (
    <>
      <DialogBox
        dialogOpen={dialogOpen}
        dialogTitle='Shared with settings'
        handleDialogClose={handleDialogClose}
        dialogContentText={'blaaa...'}
        dialogActions={<Button onClick={handleDialogClose}>Close</Button>}>
        {sharedWith.length ? (
          sharedWith.map((user, index) => (
            <Typography
              key={user._id}
              //   style={{ color: theme.palette.primary.light }}
              variant='caption'>
              {user.name}
              {index === sharedWith.length - 1 ? null : ','} {''}
            </Typography>
          ))
        ) : (
          <Typography variant='caption'>No one</Typography>
        )}
      </DialogBox>
    </>
  );
};

export default EditSharedWith;
