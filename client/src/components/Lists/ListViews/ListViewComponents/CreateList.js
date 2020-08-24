import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { createList } from '../../../../store/actions/listActions';
import { getProfiles } from '../../../../store/actions/profileActions';
import Spinner from '../../../Layout/Spinner';
import SubmitButton from '../../../Layout/SubmitButton';
import AddListUsers from './AddListUsers';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  profileLocation: {
    color: 'rgba(255,255,255,0.5)',
    margin: theme.spacing(0, 0, 0, 2),
  },
}));

const CreateList = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title: '',
    sharedWith: [
      {
        name: '',
        userId: '',
      },
    ],
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { profiles } = useSelector((state) => state.profiles);

  //Fixes bug where sharedWith labels were still displayed after submitting. https://stackoverflow.com/questions/59790956/material-ui-autocomplete-clear-value
  const [solveLabelIssue, setSolveLabelIssue] = useState(false);

  useEffect(() => {
    const getUserProfiles = async () => {
      await dispatch(getProfiles());
    };
    getUserProfiles();
    setLoading(true);
  }, [dispatch, solveLabelIssue]);

  const profileOptions = profiles.filter((u) => u._id !== user._id);
  // filters out current user

  const { title, sharedWith } = formData;
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onACChangeHandler = (e, value) => {
    const listUsers = value.map((u) => ({
      name: u.profile.name,
      userId: u._id,
    }));
    if (value === null) {
      setFormData({ ...formData, sharedWith: [{ name: '', id: '' }] });
    } else {
      setFormData({
        ...formData,
        sharedWith: listUsers,
      });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(createList({ title, sharedWith }));
    setFormData({
      title: '',
      sharedWith: [
        {
          name: '',
          userId: '',
        },
      ],
    });
    setSolveLabelIssue(true);
  };

  return !loading ? (
    <Spinner></Spinner>
  ) : (
    <>
      <form className={classes.form} onSubmit={(e) => onSubmitHandler(e)}>
        <TextField
          required
          margin='normal'
          fullWidth
          id='title'
          label='List name'
          name='title'
          value={title}
          onChange={(e) => onChangeHandler(e)}
          autoFocus
        />
        <AddListUsers
          options={profileOptions}
          getOptionLabel={(profile) => profile.profile.name}
          onChange={(e, value) => onACChangeHandler(e, value)}
          renderOption={(profile) => (
            <>
              <span>{profile.profile.name}</span>
              <span className={classes.profileLocation}>
                {profile.profile.location}
              </span>
            </>
          )}
        />
        <SubmitButton
          buttonMargin
          buttonText='Create List'
          variant='contained'
        />
      </form>
    </>
  );
};

export default CreateList;
