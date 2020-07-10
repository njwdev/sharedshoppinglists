import React from 'react';
import PropTypes from 'prop-types';
import DialogBox from '../../../Layout/DialogBox';
import Button from '@material-ui/core/Button';

const CompleteList = ({
  list,
  dialogOpen,
  handleDialogClose,
  handleCompleteList,
}) => {
  return (
    <DialogBox
      dialogOpen={dialogOpen}
      handleDialogClose={handleDialogClose}
      dialogTitle={`Complete the list: ${list.title}?`}
      dialogContentText={`Are you sure you want to complete and archive this list?`}
      dialogActions={
        <>
          <Button onClick={handleDialogClose} color='primary'>
            No
          </Button>
          <Button onClick={handleCompleteList} color='primary' autoFocus>
            Yes
          </Button>
        </>
      }
    />
  );
};

CompleteList.propTypes = {
  list: PropTypes.object.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  handleCompleteList: PropTypes.func.isRequired,
};
export default CompleteList;
