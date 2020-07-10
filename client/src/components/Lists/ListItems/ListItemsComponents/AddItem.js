import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addListItem } from '../../../../store/actions/listActions';
import AddItemForm from '../../../Forms/AddItemForm';

const AddItem = ({ id, userName }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ itemName: '', quantity: '' });
  const { itemName, quantity } = formData;
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addListItem(id, userName, { itemName, quantity }));
    setFormData({ itemName: '', quantity: '' });
  };
  const addItemInputs = [
    {
      required: true,
      inputValue: itemName,
      inputName: 'itemName',
      inputId: 'itemName',
      inputLabel: 'Item',
    },
    {
      required: false,
      inputValue: quantity,
      inputName: 'quantity',
      inputId: 'quantity',
      inputLabel: 'Quantity',
      autoFocus: false,
    },
  ];
  return (
    <AddItemForm
      inputsToRender={addItemInputs}
      onSubmit={(e) => onSubmitHandler(e)}
      onChange={(e) => onChangeHandler(e)}
      submitButtonText='Add Item'
      disabled
    />
  );
};

AddItem.propTypes = {
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default AddItem;
