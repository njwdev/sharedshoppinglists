import React from 'react';
import PropTypes from 'prop-types';
import DialogBox from '../../../Layout/DialogBox';
import Button from '@material-ui/core/Button';

const DeleteList = ({
  list,
  dialogOpen,
  handleDialogClose,
  handleDeleteList,
}) => {
  return (
    <DialogBox
      dialogOpen={dialogOpen}
      handleDialogClose={handleDialogClose}
      dialogTitle={`Delete this list: ${list.title}?`}
      dialogContentText={`Are you sure you want to delete the list entitled ${list.title}?`}
      dialogActions={
        <>
          <Button onClick={handleDialogClose} color='primary'>
            No
          </Button>
          <Button onClick={handleDeleteList} color='primary' autoFocus>
            Yes
          </Button>
        </>
      }
    />
  );
};

DeleteList.propTypes = {
  list: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  handleDeleteList: PropTypes.func.isRequired,
};

export default DeleteList;
