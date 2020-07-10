import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: { width: '80%' },
  input: {
    width: '60%',
  },
}));

const InlineUpdateForm = ({
  onSubmit,
  inputToRender,
  onChange,
  iconButton,
  onBlur,
}) => {
  const classes = useStyles();
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <>
        <div display='inline'>
          <Typography variant='h6' display='inline'>
            <Input
              className={classes.input}
              variant='h6'
              required
              id={inputToRender.inputId}
              placeholder={inputToRender.inputPlaceholder}
              name={inputToRender.inputName}
              value={inputToRender.inputValue}
              autoFocus
              onChange={onChange}
              onBlur={onBlur}
            />
            <IconButton type='submit' size='small'>
              {iconButton}
            </IconButton>
          </Typography>
        </div>
      </>
    </form>
  );
};

InlineUpdateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputToRender: PropTypes.object.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  iconButton: PropTypes.node.isRequired,
};
export default InlineUpdateForm;
