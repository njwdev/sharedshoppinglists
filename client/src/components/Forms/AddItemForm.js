import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import SubmitButton from '../Layout/SubmitButton';

const AddItemForm = ({
  onSubmit,
  onChange,
  inputsToRender,
  submitButtonText,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {inputsToRender.map((input) => (
        <TextField
          key={input.inputId}
          required={input.required}
          fullWidth
          onChange={onChange}
          value={input.inputValue}
          name={input.inputName}
          id={input.inputId}
          label={input.inputLabel}
          autoFocus={input.autoFocus}
        />
      ))}
      <SubmitButton
        buttonMargin={false}
        variant='text'
        buttonText={submitButtonText}></SubmitButton>
    </form>
  );
};

AddItemForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  inputsToRender: PropTypes.array.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};

export default AddItemForm;
