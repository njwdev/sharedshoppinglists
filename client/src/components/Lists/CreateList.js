import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { createList } from '../../store/actions/listActions';
import { getProfiles } from '../../store/actions/profileActions';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../Layout/Spinner';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
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
  let history = useHistory();
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
  const user = useSelector((state) => state.auth.user);

  const { profiles } = useSelector((state) => state.profile);

  useEffect(() => {
    const getUserProfiles = async () => {
      await dispatch(getProfiles());
    };
    getUserProfiles();
    setLoading(true);
  }, [dispatch]);

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

    dispatch(createList({ title, sharedWith }, history));
  };

  return !loading ? (
    <Spinner></Spinner>
  ) : (
    <>
      {/* //onKeyPress stops error when pressing enter without autocomplete value */}
      <form
        className={classes.form}
        onKeyPress={(e) => {
          e.key === 'Enter' && e.preventDefault();
        }}
        onSubmit={(e) => onSubmitHandler(e)}
      >
        <TextField
          required
          margin="normal"
          fullWidth
          id="title"
          label="List name"
          name="title"
          value={title}
          onChange={(e) => onChangeHandler(e)}
          autoFocus
        />
        {/* @TODO allow multiple */}
        <AutoComplete
          multiple
          id="search users"
          options={profileOptions}
          getOptionLabel={(profile) => profile.profile.name}
          forcePopupIcon={false}
          noOptionsText="No users found"
          onChange={(e, value) => onACChangeHandler(e, value)}
          // open
          // open={shareWith && shareWith.length >= 1 ? true : false}
          renderOption={(profile) => (
            <React.Fragment>
              <span>{profile.profile.name}</span>
              <span className={classes.profileLocation}>
                {profile.profile.location}
                {/* {profile.location} */}
              </span>
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              id="sharedWith"
              name="sharedWith"
              // value={sharedWith}
              label="Share your list with... (optional)"
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create List
        </Button>
      </form>
    </>
  );
};

export default CreateList;
