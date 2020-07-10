import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import DialogBox from '../Layout/DialogBox';
import Button from '@material-ui/core/Button';
import AuthForm from '../Forms/AuthForm';
import { changePassword } from '../../store/actions/authActions';

const ChangePassword = ({ userEmail, dialogOpen, handleDialogClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const { oldPassword, newPassword, confirmNewPassword } = formData;
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      changePassword({
        userEmail,
        oldPassword,
        newPassword,
        confirmNewPassword,
      })
    );
    handleDialogClose();
  };

  const changePasswordInputs = [
    {
      inputId: 'oldPassword',
      inputLabel: 'Confirm old password',
      inputName: 'oldPassword',
      inputType: 'password',
      inputValue: oldPassword,
      autoFocus: true,
    },
    {
      inputId: 'newPassword',
      inputLabel: 'New password',
      inputName: 'newPassword',
      inputType: 'password',
      inputValue: newPassword,
    },
    {
      inputId: 'confirmNewPassword',
      inputLabel: 'Confirm new password',
      inputName: 'confirmNewPassword',
      inputType: 'password',
      inputValue: confirmNewPassword,
    },
  ];

  return (
    <DialogBox
      dialogOpen={dialogOpen}
      handleDialogClose={handleDialogClose}
      dialogTitle={'Change your password'}
      dialogActions={
        <Button onClick={handleDialogClose} color='primary'>
          Cancel
        </Button>
      }>
      <AuthForm
        inputsToRender={changePasswordInputs}
        submitButtonText='Change Password'
        onSubmit={onSubmitHandler}
        onChange={onChangeHandler}
      />
    </DialogBox>
  );
};

ChangePassword.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
};

export default ChangePassword;
