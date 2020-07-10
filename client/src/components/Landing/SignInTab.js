import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';
import AuthForm from '../Forms/AuthForm';

const SignInTab = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { email, password } = formData;
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const signInInputs = [
    {
      inputId: 'email',
      inputLabel: 'Email Address',
      inputName: 'email',
      inputType: 'email',
      inputValue: email,
      autoFocus: true,
    },
    {
      inputId: 'password',
      inputLabel: 'Password',
      inputName: 'password',
      inputType: 'password',
      inputValue: password,
    },
  ];

  return (
    <>
      <AuthForm
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
        inputsToRender={signInInputs}
        onChange={onChangeHandler}
        submitButtonText='Sign in'
      />
    </>
  );
};

export default SignInTab;
