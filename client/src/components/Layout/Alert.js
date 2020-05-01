import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { removeAlert } from '../../store/actions/alertActions';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const AlertSnackBar = () => {
  const alert = useSelector((state) => state.alert.alert);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(removeAlert());
  };

  return (
    <div>
      {alert ? (
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={alert ? alert.open : false}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert severity={alert.type}>{alert.text}</Alert>
          </Snackbar>
        </div>
      ) : null}
    </div>
  );
};

//   red = error
//   warning = yellow
//   blue = information
//   green = success */}

export default AlertSnackBar;
