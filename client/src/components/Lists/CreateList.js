import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { createList } from '../../store/actions/listActions';
import { getProfiles } from '../../store/actions/profileActions';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const [formData, setFormData] = useState({
    title: '',
    sharedWith: {
      name: '',
      id: '',
    },
  });
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.profile);

  useEffect(() => {
    const getLists = async () => {
      await dispatch(getProfiles());
    };
    getLists();
    setLoading(true);
  }, [dispatch]);

  const { title, sharedWith } = formData;
  console.log(profiles);
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(sharedWith);
    console.log(formData);
  };

  const onACChangeHandler = (e, value) => {
    if (value === null) {
      setFormData({ ...formData, sharedWith: { name: '', id: '' } });
    } else {
      setFormData({
        ...formData,
        sharedWith: { name: value.name, id: value._id },
      });
    }
  };
  console.log(formData);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(createList({ title, sharedWith }));
  };

  return !loading ? (
    <Spinner></Spinner>
  ) : (
    <>
      <form className={classes.form} onSubmit={(e) => onSubmitHandler(e)}>
        <TextField
          required
          margin="normal"
          fullWidth
          id="title"
          label="List name"
          name="title"
          value={title}
          onChange={(e) => onChangeHandler(e)}
          // autoComplete="name"
          autoFocus
        />

        <AutoComplete
          id="combo-box-demo"
          options={profiles}
          getOptionLabel={(profile) => profile.user.name}
          forcePopupIcon={false}
          noOptionsText="No users found"
          // onChange={(e, value) => onChangeHandler(e, value)}
          onChange={(e, value) => onACChangeHandler(e, value)}
          // open
          // open={shareWith && shareWith.length >= 1 ? true : false}
          renderOption={(profile) => (
            <React.Fragment>
              <span>{profile.name}</span>
              <span className={classes.profileLocation}>
                {profile.location}
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
