import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateList } from '../../../../store/actions/listActions';
import Typography from '@material-ui/core/Typography';
import Done from '@material-ui/icons/Done';
import InlineUpdateForm from '../../../Forms/InlineUpdateForm';

const ListTitle = ({ editable, listTitle, editOpen, setEditOpen }) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: '' });
  const { title } = formData;
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(updateList(id, { title }, history));
    setFormData({ title: '' });
    setEditOpen(setEditOpen);
  };
  const editFormData = {
    inputId: 'title',
    inputPlaceholder: 'List name',
    inputName: 'title',
    inputValue: title,
  };
  return (
    <Typography display='inline' variant='h6'>
      {editable && editOpen ? (
        <InlineUpdateForm
          iconButton={<Done />}
          inputToRender={editFormData}
          onChange={(e) => onChangeHandler(e)}
          onSubmit={(e) => onSubmitHandler(e)}
        />
      ) : (
        listTitle
      )}
    </Typography>
  );
};
ListTitle.propTypes = {
  editable: PropTypes.bool.isRequired,
  listTitle: PropTypes.string.isRequired,
  editOpen: PropTypes.bool,
  setEditOpen: PropTypes.func,
};

export default ListTitle;
