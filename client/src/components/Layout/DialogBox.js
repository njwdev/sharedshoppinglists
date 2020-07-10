import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: 'center',
  },
}));

const DialogBox = ({
  children,
  dialogOpen,
  dialogTitle,
  dialogContentText,
  dialogActions,
  handleDialogClose,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {children}
          <DialogContentText>{dialogContentText}</DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          {dialogActions}
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogBox.propTypes = {
  children: PropTypes.node,
  dialogOpen: PropTypes.bool.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogContentText: PropTypes.string,
  dialogActions: PropTypes.node,
  handleDialogClose: PropTypes.func.isRequired,
};

export default DialogBox;
