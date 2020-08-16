import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Done from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import Spinner from '../Layout/Spinner';
import PageContainer from '../Layout/PageContainer';
import { updateProfile } from '../../store/actions/profileActions';
import ChangePassword from '../Settings/ChangePassword';
import { useProfileData } from '../../hooks/useProfileData';
import InlineUpdateForm from '../Forms/InlineUpdateForm';

const useStyles = makeStyles((theme) => ({
  settingBox: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    background: theme.palette.background.paper,
    boxShadow: '3px 3px 10px rgba(255,105,180,0.2)',
  },
  editSetting: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
  emailText: {
    color: theme.palette.text.disabled,
  },
}));

const Settings = () => {
  const [editName, setEditName] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(
    false
  );

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const classes = useStyles();
  const [loading, profileData] = useProfileData();
  const [formData, setFormData] = useState({
    ...profileData,
  });

  const { name, location } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...profileData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e, editOpenFunc) => {
    e.preventDefault();
    dispatch(updateProfile({ ...formData }, 'Profile Details updated'));
    editOpenFunc();
  };

  const handleDialogClose = () => {
    setOpenChangePasswordDialog(false);
  };

  const handleBlur = () => {
    //Fixes bug where onBlur was preventing onSubmit with inline form
    setTimeout(() => {
      setEditLocation(false);
      setEditName(false);
    }, 200);
  };

  const settingsData = [
    {
      settingName: 'Name:',
      settingData: profileData.name,
      inputToRender: {
        inputName: 'name',
        inputId: 'name',
        inputValue: name,
      },
      editOpen: editName,
      editOpenFunc: () => {
        if (editLocation) setEditLocation(false);
        setEditName(!editName);
      },
    },
    {
      settingName: 'Password:',
      settingData: '********',
      editOpen: null,
      editOpenFunc: () => setOpenChangePasswordDialog(true),
    },
    {
      settingData: profileData.location,
      settingName: 'Location:',
      inputToRender: {
        inputId: 'location',
        inputName: 'location',
        inputValue: location,
      },

      editOpen: editLocation,
      editOpenFunc: () => {
        if (editName) setEditName(false);
        setEditLocation(!editLocation);
      },
    },
  ];

  return loading || !user ? (
    <Spinner></Spinner>
  ) : (
    <>
      <PageContainer pageTitle='Settings'>
        <Grid className={classes.settingBox} container>
          <Grid className={classes.emailText} item xs={4}>
            <Typography variant='h6'>Email:</Typography>
          </Grid>
          <Grid className={classes.emailText} item xs={6}>
            <Typography variant='h6'>{profileData.email}</Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        {settingsData.map((data) => (
          <div key={data.settingName}>
            <Grid className={classes.settingBox} container>
              <Grid item xs={4}>
                <Typography variant='h6'>{data.settingName}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant='h6' display='inline'>
                  {data.editOpen ? (
                    <InlineUpdateForm
                      inputToRender={data.inputToRender}
                      iconButton={<Done />}
                      onSubmit={(e) => onSubmitHandler(e, data.editOpenFunc)}
                      onBlur={handleBlur}
                      onChange={(e) => onChangeHandler(e)}></InlineUpdateForm>
                  ) : (
                    data.settingData
                  )}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography
                  className={classes.editSetting}
                  variant='h6'
                  onClick={data.editOpenFunc}>
                  Edit
                </Typography>
              </Grid>
            </Grid>
            <Divider variant='middle' />
          </div>
        ))}
        {openChangePasswordDialog ? (
          <ChangePassword
            userEmail={user.email}
            handleDialogClose={() => handleDialogClose()}
            dialogOpen={openChangePasswordDialog}
          />
        ) : null}
      </PageContainer>
    </>
  );
};

export default Settings;
