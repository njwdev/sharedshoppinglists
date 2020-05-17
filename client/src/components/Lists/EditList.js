import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EditList = ({ list }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ title: '' });

  const { title } = formData;

  const onChangeHandler = () => {};

  const onSubmitHandler = () => {};

  return (
    <div>
      <form className={classes.form} onSubmit={(e) => onSubmitHandler(e)}>
        <TextField
          required
          margin="normal"
          id="title"
          label="List name"
          name="title"
          value={title}
          onChange={(e) => onChangeHandler(e)}
          // autoComplete="name"
          autoFocus
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {' '}
          Update Title{' '}
        </Button>
      </form>
    </div>
  );
};

export default EditList;
