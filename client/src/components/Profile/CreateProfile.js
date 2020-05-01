import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile } from '../../store/actions/profileActions';
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
}));

const CreateProfile = () => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    setFormData({ name: user.name, location: '' });
    setLoading(false);
  }, [dispatch]);

  const { name, location } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(createProfile({ name, location }));
  };

  return loading ? (
    <Spinner></Spinner>
  ) : (
    <>
      <form className={classes.form} onSubmit={(e) => onSubmitHandler(e)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={name}
          onChange={(e) => onChangeHandler(e)}
          // autoComplete="name"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="location"
          label="Location"
          name="location"
          value={location}
          onChange={(e) => onChangeHandler(e)}
          autoComplete="location"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create Profile
        </Button>
      </form>
    </>
  );
};

export default CreateProfile;
