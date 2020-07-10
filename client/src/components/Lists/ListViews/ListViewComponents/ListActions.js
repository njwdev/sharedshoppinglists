import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UndoOutlined from '@material-ui/icons/UndoOutlined';
import DoneOutlined from '@material-ui/icons/DoneOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/core/styles';
import ListActionIconButton from './ListActionIconButton';
import DeleteList from './DeleteList';
import CompleteList from './CompleteList';
import ReactivateList from './ReactivateList';
// import EditListTitle from './ListTitle';

const useStyles = makeStyles((theme) => ({
  actionIcons: {
    float: 'right',
  },
  icon: {
    margin: theme.spacing(0, 1),
    cursor: 'pointer',
    textDecoration: 'none',
  },
}));

const ListActions = ({
  list,
  editOpen,
  editTitleButton,
  deleteListButton,
  reactivateListButton,
  completeListButton,
  handleDeleteList,
  handleCompleteList,
  handleReactivateList,
}) => {
  const classes = useStyles();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [reactivateDialogOpen, setReactivateDialogOpen] = useState(false);
  //   const [editOpen, setEditOpen] = useState(false);
  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
    setCompleteDialogOpen(false);
    setReactivateDialogOpen(false);
    // setEditOpen(false);
  };
  return (
    <div className={classes.actionIcons}>
      {/* &TODO - add edit input here */}

      {editTitleButton && (
        <ListActionIconButton
          title='Edit list title'
          ariaLabel='edit list title'
          icon={
            <EditOutlined
              aria-label='edit list title'
              className={classes.icon}
              onClick={editOpen}></EditOutlined>
          }
        />
      )}
      {reactivateListButton && (
        <ListActionIconButton
          title='Reactivate List'
          ariaLabel='Reactivate List'
          icon={
            <UndoOutlined
              className={classes.icon}
              onClick={() => setReactivateDialogOpen(true)}
            />
          }
        />
      )}
      {completeListButton && (
        <ListActionIconButton
          title='Complete List'
          ariaLabel='Complete List'
          icon={
            <DoneOutlined
              className={classes.icon}
              onClick={() => setCompleteDialogOpen(true)}
            />
          }
        />
      )}
      {deleteListButton && (
        <ListActionIconButton
          title='Delete List'
          ariaLabel='Delete List'
          icon={
            <DeleteOutlined
              className={classes.icon}
              onClick={() => setDeleteDialogOpen(true)}
            />
          }
        />
      )}

      {/* {editOpen ? (
        <EditListTitle
          edit={editOpen}
          onChange
          onSubmit
          //   editFormData
          listTitle={list.title}
        />
      ) : null} */}

      {deleteDialogOpen ? (
        <DeleteList
          dialogOpen={deleteDialogOpen}
          handleDialogClose={() => handleDialogClose()}
          handleDeleteList={handleDeleteList}
          list={list}
        />
      ) : null}
      {completeDialogOpen ? (
        <CompleteList
          dialogOpen={completeDialogOpen}
          handleDialogClose={() => handleDialogClose()}
          handleCompleteList={handleCompleteList}
          list={list}
        />
      ) : null}
      {reactivateDialogOpen ? (
        <ReactivateList
          dialogOpen={reactivateDialogOpen}
          handleDialogClose={() => handleDialogClose()}
          handleReactivateList={handleReactivateList}
          list={list}
        />
      ) : null}
    </div>
  );
};

ListActions.propTypes = {
  list: PropTypes.object.isRequired,
  editTitleButton: PropTypes.bool,
  deleteListButton: PropTypes.bool.isRequired,
  reactivateListButton: PropTypes.bool.isRequired,
  completeListButton: PropTypes.bool.isRequired,
  handleDeleteList: PropTypes.func.isRequired,
  handleCompleteList: PropTypes.func.isRequired,
  handleReactivateList: PropTypes.func.isRequired,
};

export default ListActions;
