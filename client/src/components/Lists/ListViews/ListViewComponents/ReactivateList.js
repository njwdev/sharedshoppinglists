import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogBox from '../../../Layout/DialogBox';

const ReactivateList = ({
  list,
  dialogOpen,
  handleDialogClose,
  handleReactivateList,
}) => {
  return (
    <DialogBox
      dialogOpen={dialogOpen}
      handleDialogClose={handleDialogClose}
      dialogTitle={`Reactivate: ${list.title}?`}
      dialogContentText={`Are you sure you want to reactivate this list?`}
      dialogActions={
        <>
          <Button onClick={handleDialogClose} color='primary'>
            No
          </Button>
          <Button onClick={handleReactivateList} color='primary' autoFocus>
            Yes
          </Button>
        </>
      }
    />
  );
};

ReactivateList.propTypes = {
  list: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  handleReactivateList: PropTypes.func.isRequired,
};

export default ReactivateList;
