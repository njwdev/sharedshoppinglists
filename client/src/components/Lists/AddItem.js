import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { addListItem } from '../../store/actions/listActions';

const AddItem = ({ id }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ itemName: '', quantity: '' });

  const { itemName, quantity } = formData;
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addListItem(id, { itemName, quantity }));
    setFormData({ itemName: '', quantity: '' });
  };
  return (
    <form onSubmit={(e) => onSubmitHandler(e)}>
      <TextField
        required
        fullWidth
        onChange={(e) => onChangeHandler(e)}
        value={itemName}
        name="itemName"
        id="itemName"
        label="Item"
        autoFocus
      ></TextField>
      <TextField
        fullWidth
        id="quantity"
        onChange={(e) => onChangeHandler(e)}
        name="quantity"
        value={quantity}
        label="Quantity"
      ></TextField>
      <Button fullWidth type="submit" variant="text" color="primary">
        Add Item
      </Button>
    </form>
  );
};

export default AddItem;
