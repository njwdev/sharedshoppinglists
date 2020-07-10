import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submitWithMargin: {
    margin: theme.spacing(3, 0, 2),
  },
  submitWithoutMargin: {
    margin: theme.spacing(0),
  },
}));

const SubmitButton = ({ buttonText, variant, buttonMargin }) => {
  const classes = useStyles();
  return (
    <Button
      type='submit'
      fullWidth
      variant={variant}
      color='primary'
      className={
        buttonMargin ? classes.submitWithMargin : classes.submitWithoutMargin
      }>
      {buttonText}
    </Button>
  );
};

SubmitButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  buttonMargin: PropTypes.bool,
};

export default SubmitButton;
