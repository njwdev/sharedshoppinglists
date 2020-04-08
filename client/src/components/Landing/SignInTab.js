import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { loginUser } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInTab = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const auth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
        className={classes.form}
        noValidate
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={(e) => onChangeHandler(e)}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => onChangeHandler(e)}
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default SignInTab;
