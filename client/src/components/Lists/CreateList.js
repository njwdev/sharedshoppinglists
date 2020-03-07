import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FiUserPlus, FiPhone, FiMail } from 'react-icons/fi';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { createList } from '../../store/actions/listActions';

const inputFormData = [
  {
    name: 'name',
    label: 'Name ',
    icon: <FiUserPlus />,
    type: 'text',
  },
  { name: 'phone', label: 'Phone Number', icon: <FiPhone />, type: 'text' },
  { name: 'email', label: 'Email', icon: <FiMail />, type: 'email' },
];

const useStyles = makeStyles({
  root: {
    margin: '1.66%',
    border: '1px solid rgba(128,0,128,0.1)',
    boxShadow: '3px 3px 10px rgba(0,0,0,0.4)',
  },
  button: {
    margin: 'inherit',
  },
});

const CreateList = () => {
  const [createListData, setCreateListData] = useState({
    name: '',
    phone: '',
    email: '',
    id: '',
  });

  const dispatch = useDispatch();

  const inputChangeHandler = e => {
    const { name, value } = e.target;
    setCreateListData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = e => {
    e.preventDefault();

    axios
      .post('https://jsonplaceholder.typicode.com/users', createListData)
      .then(res => dispatch(createList(res.data)));
    setCreateListData(prevState => ({
      ...prevState,
      name: '',
      phone: '',
      email: '',
      id: '',
    }));
  };

  const classes = useStyles();

  return (
    <form onSubmit={submitHandler} className={classes.root}>
      {inputFormData.map(data => (
        <FormControl key={data.label} style={{ margin: '10px' }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            {data.label}
          </InputLabel>
          <Input
            name={data.name}
            type={data.type}
            value={createListData[data.name]}
            onChange={inputChangeHandler}
            required
            startAdornment={
              <InputAdornment position="start">{data.icon}</InputAdornment>
            }
          />
        </FormControl>
      ))}
      <Button type="submit" className={classes.button} variant="outlined">
        Create List
      </Button>
    </form>
  );
};

export default CreateList;
