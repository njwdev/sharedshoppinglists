import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../store/actions/alertActions';
import { signUpUser } from '../../store/actions/authActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AuthForm from '../Forms/AuthForm';

const SignUpTab = () => {
  //sets initial darkmode prefererence
  let prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    darkMode: null,
  });
  const dispatch = useDispatch();

  const { name, email, password, passwordConfirmation, darkMode } = formData;

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      darkMode: prefersDarkMode,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      dispatch(showAlert(true, 'Passwords do not match', 'error'));
    } else {
      dispatch(signUpUser({ name, email, password, darkMode }));
    }
  };

  const signUpInputs = [
    {
      inputId: 'name',
      inputLabel: 'Name',
      inputName: 'name',
      inputType: 'name',
      inputValue: name,
      autoFocus: true,
    },
    {
      inputId: 'email',
      inputLabel: 'Email Address',
      inputName: 'email',
      inputType: 'email',
      inputValue: email,
    },
    {
      inputId: 'password',
      inputLabel: 'Password',
      inputName: 'password',
      inputType: 'password',
      inputValue: password,
    },
    {
      inputId: 'passwordConfirmation',
      inputLabel: 'Confirm Password',
      inputName: 'passwordConfirmation',
      inputType: 'password',
      inputValue: passwordConfirmation,
    },
  ];

  return (
    <>
      <AuthForm
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
        inputsToRender={signUpInputs}
        onChange={onChangeHandler}
        submitButtonText='Sign up'
      />
    </>
  );
};

export default SignUpTab;
