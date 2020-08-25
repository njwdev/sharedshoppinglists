import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DialogBox from '../../../Layout/DialogBox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AutoComplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddListUsers from './AddListUsers';
import { getProfiles } from '../../../../store/actions/profileActions';
import {
  updateSharedWith,
  removeListUser,
  fetchList,
} from '../../../../store/actions/listActions';
import SubmitButton from '../../../Layout/SubmitButton';
import Spinner from '../../../Layout/Spinner';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
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

const EditSharedWith = ({
  list,
  dialogOpen,
  sharedWith,
  handleDialogClose,
}) => {
  //@TODO  - atm people can delete themselves from list - change list to listUsers
  const [loading, setLoading] = useState(true);
  const [listUsersData, setListUsersData] = useState([{}]);
  console.log(listUsersData);
  const classes = useStyles();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { profiles } = useSelector((state) => state.profiles);

  //Fixes bug where sharedWith labels were still displayed after submitting. https://stackoverflow.com/questions/59790956/material-ui-autocomplete-clear-value
  const [solveLabelIssue, setSolveLabelIssue] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUserProfiles = async () => {
      await dispatch(getProfiles());
    };
    getUserProfiles();
    fetchList(list._id, true);
    setLoading(false);
  }, [dispatch, solveLabelIssue, list._id, list.listUsers]);

  //This ensures that the list creator cannot share the list with themselves twice.
  const listUsersWithoutCreator = profiles.filter((u) => u._id !== user._id);
  //This function is so that you can only add people to the list you are not already sharing with
  const profileOptions = listUsersWithoutCreator.filter(
    ({ _id: id1 }) => !sharedWith.some(({ userId: id2 }) => id2 === id1)
  );

  const onACChangeHandler = (e, value) => {
    const newListUsers = value.map((u) => ({
      name: u.profile.name,
      userId: u._id,
    }));
    console.log(newListUsers);
    if (value === null) {
      setListUsersData([{}]);
    } else {
      setListUsersData(newListUsers);
    }
  };

  const removeUserFromSharedWithList = (id) => {
    const userId = id;
    dispatch(removeListUser(userId, list._id));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(listUsersData);
    dispatch(updateSharedWith(list._id, listUsersData));
    setListUsersData([{}]);
    setSolveLabelIssue(true);
  };
  return (
    <>
      <DialogBox
        dialogOpen={dialogOpen}
        dialogTitle='Shared with settings'
        handleDialogClose={handleDialogClose}
        dialogActions={<Button onClick={handleDialogClose}>Close</Button>}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <List>
              {sharedWith.length ? (
                sharedWith.map((user, index) => (
                  <ListItem key={user._id}>
                    <ListItemText>{user.name}</ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => removeUserFromSharedWithList(user._id)}
                        edge='end'
                        aria-label='delete'>
                        <DeleteOutlined />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <Typography variant='caption'>No one</Typography>
              )}
            </List>
            <form className={classes.form} onSubmit={(e) => onSubmitHandler(e)}>
              <AutoComplete
                key={solveLabelIssue}
                multiple
                id='search users'
                options={profileOptions}
                getOptionLabel={(profile) => profile.profile.name}
                forcePopupIcon={false}
                noOptionsText='No users found'
                onChange={(e, value) => onACChangeHandler(e, value)}
                clearOnBlur
                clearOnEscape
                renderOption={(profile) => (
                  <>
                    <span>{profile.profile.name}</span>
                    <span className={classes.profileLocation}>
                      {profile.profile.location}
                    </span>
                  </>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id='sharedWith'
                    name='sharedWith'
                    label='Add users to your list...'
                  />
                )}
              />
              <SubmitButton buttonMargin buttonText='Add' variant='text' />
            </form>
          </>
        )}
      </DialogBox>
    </>
  );
};

export default EditSharedWith;
