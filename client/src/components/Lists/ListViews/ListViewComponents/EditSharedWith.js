import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DialogBox from '../../../Layout/DialogBox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddListUsers from './AddListUsers';
import { createList } from '../../../../store/actions/listActions';
import { getProfiles } from '../../../../store/actions/profileActions';

const EditSharedWith = ({ dialogOpen, sharedWith, handleDialogClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sharedWith: [
      {
        name: '',
        userId: '',
      },
    ],
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { profiles } = useSelector((state) => state.profiles);

  //Fixes bug where sharedWith labels were still displayed after submitting. https://stackoverflow.com/questions/59790956/material-ui-autocomplete-clear-value
  const [solveLabelIssue, setSolveLabelIssue] = useState(false);

  useEffect(() => {
    const getUserProfiles = async () => {
      await dispatch(getProfiles());
    };
    getUserProfiles();
    setLoading(true);
  }, [dispatch, solveLabelIssue]);

  const profileOptions = profiles.filter((u) => u._id !== user._id);
  // filters out current user

  // const onChangeHandler = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const onACChangeHandler = (e, value) => {
    const listUsers = value.map((u) => ({
      name: u.profile.name,
      userId: u._id,
    }));
    if (value === null) {
      setFormData({ sharedWith: [{ name: '', id: '' }] });
    } else {
      setFormData({
        ...formData,
        sharedWith: listUsers,
      });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(createList({ sharedWith }));
    setFormData({
      title: '',
      sharedWith: [
        {
          name: '',
          userId: '',
        },
      ],
    });
    setSolveLabelIssue(true);
  };
  return (
    <>
      <DialogBox
        dialogOpen={dialogOpen}
        dialogTitle='Shared with settings'
        handleDialogClose={handleDialogClose}
        dialogActions={<Button onClick={handleDialogClose}>Close</Button>}>
        <List>
          {sharedWith.length ? (
            sharedWith.map((user, index) => (
              <ListItem key={user._id}>
                <ListItemText>{user.name}</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label='delete'>
                    <DeleteOutlined />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <Typography variant='caption'>No one</Typography>
          )}
        </List>
        <AddListUsers />
      </DialogBox>
    </>
  );
};

export default EditSharedWith;
