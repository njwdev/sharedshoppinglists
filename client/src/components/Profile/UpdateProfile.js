import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/actions/profileActions';
import AuthForm from '../Forms/AuthForm';
import PageContainer from '../Layout/PageContainer';
import Spinner from '../Layout/Spinner';

const UpdateProfile = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  let history = useHistory();
  useEffect(() => {
    setFormData({
      name: user.profile.name,
      location: user.profile.location || '',
      darkMode: user.profile.darkMode,
    });
    setLoading(false);
  }, [user.profile.name, user.profile.location, user.profile.darkMode]);

  const { name, location } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({ ...formData }, 'Profile Details updated', history)
    );
  };

  const updateProfileInputs = [
    {
      inputId: 'name',
      inputLabel: 'Name',
      inputName: 'name',
      inputType: 'text',
      inputValue: name,
      autoFocus: true,
    },
    {
      inputId: 'location',
      inputLabel: 'Location',
      inputName: 'location',
      inputType: 'text',
      inputValue: location,
      autoFocus: false,
    },
  ];

  return loading ? (
    <Spinner></Spinner>
  ) : (
    <>
      <PageContainer pageTitle='Update Profile'>
        <AuthForm
          inputsToRender={updateProfileInputs}
          submitButtonText='Update Profile'
          onSubmit={(e) => onSubmitHandler(e)}
          onChange={(e) => onChangeHandler(e)}
        />
      </PageContainer>
    </>
  );
};

export default UpdateProfile;
