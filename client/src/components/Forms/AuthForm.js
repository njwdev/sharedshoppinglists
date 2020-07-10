import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SubmitButton from '../Layout/SubmitButton';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const AuthForm = ({ inputsToRender, onSubmit, onChange, submitButtonText }) => {
  const classes = useStyles();
  return (
    <form onSubmit={onSubmit} className={classes.form}>
      {inputsToRender.map((input) => (
        <TextField
          key={input.inputId}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id={input.inputId}
          label={input.inputLabel}
          name={input.inputName}
          type={input.inputType}
          value={input.inputValue}
          onChange={onChange}
          autoFocus={input.autoFocus}
        />
      ))}
      <SubmitButton
        buttonMargin
        variant='contained'
        buttonText={submitButtonText}
      />
    </form>
  );
};

AuthForm.propTypes = {
  inputsToRender: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};

export default AuthForm;
